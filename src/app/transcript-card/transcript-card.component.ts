import { Component, OnInit, Input } from '@angular/core';
import { ITranscription } from '../../shared/interfaces';
import formatTime from '../../services/formatTime';

@Component({
  selector: 'app-transcript-card',
  templateUrl: './transcript-card.component.html',
  styleUrls: ['./transcript-card.component.scss'],
})
export class TranscriptCardComponent implements OnInit {
  transcriptionDate: any;
  realColumns: string[] = ['time', 'speaker', 'sentence'];
  expectedColumns: string[] = ['order', 'rep', 'sentence'];
  realMatching: number;
  expectedMatching: number;
  highlight: number;
  sensitivity: number;
  realDataSource;
  expectedDataSource;

  @Input()
  set setTranscript(transcriptionDate) {
    if (transcriptionDate) {
      if (transcriptionDate.transcript) {
        this.sensitivity = transcriptionDate.data.sensitivity;
        this.transcriptionDate = transcriptionDate;

        this.expectedDataSource = this.transcriptionDate.transcript.script.map(
          (script) => ({
            order: script.order,
            sentence: script.sentence,
            similarity: script.similarity * 100,
            matched:
              script.similarity * 100 >= this.sensitivity &&
              !!script.matching_sentence,
          })
        );

        this.realDataSource = this.transcriptionDate.transcript.transcript.map(
          (value) => ({
            timeFrom: formatTime(value.timeFrom),
            name: value.channel
              ? value.channel === 1
                ? this.transcriptionDate.data.selectedAgent.full_name.split(
                    ' '
                  )[0]
                : this.transcriptionDate.transcript.customer[0].full_name.split(
                    ' '
                  )[0]
              : 'Unknown',
            tooltipMessage:
              value.similarity * 100 >= this.sensitivity &&
              value.matching_sentence
                ? `${value.similarity * 100}% matching with line #${
                    this.expectedDataSource.findIndex(
                      (data) => data.sentence === value.matching_sentence
                    ) + 1
                  } “${value.matching_sentence}”`
                : ``,
            matched:
              value.similarity * 100 >= this.sensitivity &&
              !!value.matching_sentence,
            expected: this.expectedDataSource.findIndex(
              (data) => data.sentence === value.matching_sentence
            ),
            sentence: value.sentence,
          })
        );

        this.matching();
      } else {
        this.realDataSource = [];
        this.expectedDataSource = [];
      }
    } else {
      this.transcriptionDate = transcriptionDate;
      this.realDataSource = [];
      this.expectedDataSource = [];
    }
  }

  constructor() {}

  ngOnInit(): void {}

  highlightExpected(value): void {
    if (value.matched) this.highlight = value.expected;
  }

  hideHighlightExpected(): void {
    this.highlight = -1;
  }

  matching(): void {
    const expectedTotal = this.expectedDataSource.length;
    let expectedMatched = 0;

    this.expectedDataSource.map((expected) => {
      if (expected.matched) expectedMatched++;
    });

    const realTotal = this.realDataSource.length;
    let realMatched = 0;

    this.realDataSource.map((expected) => {
      if (expected.matched) realMatched++;
    });

    this.realMatching = (realMatched / realTotal) * 100;
    this.expectedMatching = (expectedMatched / expectedTotal) * 100;
  }
}
