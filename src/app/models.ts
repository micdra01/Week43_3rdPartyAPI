export interface AddressAPIJsonResponseModel {
  results: Address[]
}

export interface Address {
  name?: string
  country: string
  country_code: string
  state: string
  county?: string
  city?: string
  hamlet?: string
  lon: number
  lat: number
  suburb?: string
  formatted: string
  address_line1: string
  address_line2: string
  category: string
  plus_code: string
  result_type: string
  place_id: string
  region?: string
  plus_code_short?: string
  postcode?: string
  village?: string
  state_code?: string
  county_code?: string
}

export interface CountriesAPIJsonResponseModel {
  currencies: Record<string, any>;
}

export interface CurrencyConverterAPIJsonResponseModel {
  data: Record<string, number>;
}
