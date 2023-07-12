export interface CreativeResponse {
  status: string;
  data: CreativeCollection;
}

export interface CreativeCollection {
  creatives: CreativeModel[];
}

export interface CreativeModel {
  id: number;
  name: string;
}