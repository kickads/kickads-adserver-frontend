export interface ClientResponse {
  status: string;
  data: ClientCollection;
}

export interface ClientCollection {
  clients: ClientModel[];
}

export interface ClientModel {
  id: number;
  name: string;
}