export interface EntityResponse {
  status: string;
  data: EntityCollection;
}

export interface EntityCollection {
  entities: EntityModel[];
}

export interface EntityModel {
  id: number;
  name: string;
}