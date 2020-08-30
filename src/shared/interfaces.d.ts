export interface IAgent {
  agent_id: string;
  full_name: string;
  email: string;
  channel_no?: number;
}

export interface ICustomer {
  full_name: string;
  channel_no: number;
}

export interface ICall {
  call_id: string;
  calltype_id: string;
  agent: IAgent[];
  customer: ICustomer[];
  call_start_time: string;
  gs_file_url: string;
  duration: number;
}

export interface ICallType {
  calltype_id: string;
  name: string;
}

export interface IScript {
  order: number;
  similarity: number;
  sentence: string;
  matching_sentence: string;
}

export interface ITranscript {
  order: number;
  similarity: number;
  sentence: string;
  matching_sentence: string;
  channel: number;
  timeFrom: number;
  timeTo: number;
}

export interface ITranscription {
  call_id: string;
  file_url: string;
  calltype_id: string;
  call_datetime: string;
  duration: number;
  agent: IAgent[];
  customer: ICustomer[];
  script: IScript[];
  transcript: ITranscript[];
}
