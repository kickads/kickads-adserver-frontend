export interface CountryResponse {
  status: string;
  data: CountryCollection;
}

export interface CountryCollection {
  countries: CountryModel[];
}

export interface CountryModel {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}