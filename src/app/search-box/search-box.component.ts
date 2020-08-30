import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  ITranscription,
  IAgent,
  ICall,
  ICallType,
} from '../../shared/interfaces';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  @ViewChild('slider') slider;
  @Output() callPickedEmmiter = new EventEmitter<any>();

  agents: IAgent[];
  calls: ICall[];
  callTypes: ICallType[];
  selectedAgent: IAgent;
  selectedCallType: ICallType;
  selectedCall: ICall;
  sensitivity: number = 38;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient
      .get('assets/mocks/agents-mock-data.json')
      .subscribe((data: IAgent[]) => {
        this.agents = data;
      });

    this.httpClient
      .get('assets/mocks/calltype-mock-data.json')
      .subscribe((data: ICallType[]) => {
        this.callTypes = data;
      });
  }

  selectAgent(event): void {
    this.selectedAgent = this.agents.find(
      (agent: IAgent) => agent.agent_id === event
    );
    this.selectedCallType = null;
    this.selectedCall = null;
    this.calls = [];

    this.httpClient
      .get('assets/mocks/calls-mock-data.json')
      .subscribe((data: ICall[]) => {
        this.calls = data
          .filter((call) => call.agent[0].agent_id === event)
          .sort((a, b) => {
            if (a.call_start_time < b.call_start_time) {
              return 1;
            }

            if (a.call_start_time > b.call_start_time) {
              return -1;
            }

            return 0;
          });

        this.callPickedEmmiter.emit({
          selectedAgent: this.selectedAgent,
          sensitivity: this.sensitivity,
        });
      });
  }

  selectCallType(event): void {
    this.selectedCallType = this.callTypes.find(
      (callType: ICallType) => callType.calltype_id === event
    );
    this.selectedCall = null;
  }

  selectCall(event): void {
    this.selectedCall = this.calls.find(
      (call: ICall) => call.call_id === event
    );
    this.callPickedEmmiter.emit({
      selectedCall: this.calls.find((call: ICall) => call.call_id === event),
      selectedAgent: this.selectedAgent,
      sensitivity: this.sensitivity,
    });
  }

  setSensitivity(event): void {
    this.sensitivity = event;

    this.callPickedEmmiter.emit({
      selectedCall: this.selectedCall,
      selectedAgent: this.selectedAgent,
      sensitivity: this.sensitivity,
    });
  }
}
