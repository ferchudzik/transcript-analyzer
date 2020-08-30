import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TranscriptCardComponent } from './transcript-card/transcript-card.component';

import { ITranscription } from '../shared/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('child')
  private transcriptCard: TranscriptCardComponent;

  title = 'transcript-analyzer';
  transcriptionDate: any;

  constructor(private httpClient: HttpClient) {}

  setTranscription(event) {
    if (event.selectedCall) {
      this.httpClient
        .get(
          `assets/mocks/transcript-mock-data-${event.selectedCall.call_id}.json`
        )
        .subscribe((data: ITranscription) => {
          this.transcriptionDate = {
            data: event,
            transcript: data,
          };
        });
    } else {
      this.transcriptionDate = null;
    }
  }
}
