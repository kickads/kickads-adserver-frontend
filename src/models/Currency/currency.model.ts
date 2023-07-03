export interface CurrencyResponse {
  status: string;
  data: CurrencyCollection;
}

export interface CurrencyCollection {
  currencies: CurrencyModel[];
}

export interface CurrencyModel {
  id: number;
  price: number;
  name: string;
  country: string;
  country_id: number | string;
}