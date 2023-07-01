export interface BusinessModelResponse {
  status: string;
  data: BusinessModelCollection;
}

export interface BusinessModelCollection {
  business_models: BusinessModelModel[];
}

export interface BusinessModelModel {
  id: number;
  name: string;
}