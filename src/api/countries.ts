
import type {
  Country,
  CountriesResponse,
} from "../types/country";

import type { CountryDetail } from "../types/country-detail";

const API_KEY = import.meta.env.VITE_REST_COUNTRIES_API_KEY;

const API_URL = "https://api.restcountries.com/countries/v5";

const RESPONSE_FIELDS =
  "names.common,names.native,codes.alpha_2,flag.url_svg," +
  "flag.description,population,region,subregion,capitals," +
  "tlds,currencies,languages,borders";

async function requestCountries(url: URL): Promise<Country[]> {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `No fue posible obtener los países. Código HTTP: ${response.status}`,
    );
  }

  const result = (await response.json()) as CountriesResponse;

  if (!result.data || !Array.isArray(result.data.objects)) {
    throw new Error("La respuesta de la API tiene un formato incorrecto.");
  }

  return result.data.objects;
}

export async function fetchCountries(): Promise<Country[]> {
  if (!API_KEY) {
    throw new Error(
      "No se encontró la API key de REST Countries.",
    );
  }

  const url = new URL(API_URL);

  url.searchParams.set("response_fields", RESPONSE_FIELDS);
  url.searchParams.set("limit", "100");

  return requestCountries(url);
}

export async function fetchCountryByCode(
  code: string,
): Promise<CountryDetail> {
  if (!API_KEY) {
    throw new Error(
      "No se encontró la API key de REST Countries.",
    );
  }

  const normalizedCode = code.trim().toUpperCase();

  if (!/^[A-Z]{2}$/.test(normalizedCode)) {
    throw new Error("El código del país debe tener dos letras.");
  }

  const url = new URL(API_URL);

  url.searchParams.set("response_fields", RESPONSE_FIELDS);
  url.searchParams.set("codes.alpha_2", normalizedCode);
  url.searchParams.set("limit", "1");

  const countries = await requestCountries(url);

  const country = countries.find(
    (item) => item.codes.alpha_2.trim().toUpperCase() === normalizedCode,
  );

  if (!country) {
    throw new Error(
      `No se encontró el país con el código ${normalizedCode}.`,
    );
  }

  return country as CountryDetail;
}
