import type {
  Country,
  CountriesResponse
} from "../types/country";

const API_KEY =
  import.meta.env.VITE_REST_COUNTRIES_API_KEY;

if (!API_KEY) {
  throw new Error(
    "No se encontró la API key de REST Countries."
  );
}

const API_URL: string =
  "https://api.restcountries.com/countries/v5" +
  "?response_fields=names.common,codes.alpha_2,flag.url_svg," +
  "flag.description,population,region,subregion,capitals" +
  "&limit=25";

export async function fetchCountries(): Promise<Country[]> {
  const response: Response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `No fue posible obtener los países. Código HTTP: ${response.status}`
    );
  }

  const result: CountriesResponse =
    await response.json() as CountriesResponse;

  return result.data.objects;
}