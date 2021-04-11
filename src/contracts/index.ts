export interface ResponseErrorInterface extends Error {
  status?: number;
}

export interface CountryInterface {
  fips: string
  state: string
  name: string
}
