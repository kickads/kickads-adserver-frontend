export interface PriorityResponse {
  status: string;
  data: PriorityCollection;
}

export interface PriorityCollection {
  priorities: PriorityModel[];
}

export interface PriorityModel {
  id: number;
  name: string;
}