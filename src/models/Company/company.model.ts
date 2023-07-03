export interface CompanyResponse {
  status: string;
  data: CompanyCollection;
}

export interface CompanyCollection {
  companies: CompanyModel[];
}

export interface CompanyModel {
  id: number;
  name: string;
  entity: string;
  entity_id: number;
  country: string;
  country_id: number | string;
}