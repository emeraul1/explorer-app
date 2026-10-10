
export interface CountryNames {
  common: string;
  native?: Record<
    string,
    {
      common?: string;
      official?: string;
    }
  >;
}

export interface CountryCodes {
  alpha_2: string;
}

export interface CountryFlag {
  url_svg: string;
  description: string;
}

export interface CountryCapital {
  name: string;
}

export interface CountryCurrency {
  code: string;
  name: string;
  symbol?: string;
}

export interface CountryLanguage {
  name: string;
  native_name?: string;
}

export interface Country {
  names: CountryNames;
  codes: CountryCodes;
  flag: CountryFlag;
  population: number;
  region: string;
  capitals: CountryCapital[];
  subregion?: string;
  tlds?: string[];
  currencies?: CountryCurrency[];
  languages?: CountryLanguage[];
  borders?: string[];
}

export interface CountriesMeta {
  total: number;
  count: number;
  limit: number;
  offset: number;
  more: boolean;
}

export interface CountriesData {
  objects: Country[];
  meta: CountriesMeta;
}

export interface CountriesResponse {
  data: CountriesData;
}
