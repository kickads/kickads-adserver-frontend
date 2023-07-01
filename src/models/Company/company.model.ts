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
}