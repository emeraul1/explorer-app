import './style.css'

import type {
  Country,
  CountriesResponse
} from "./types/country";

const API_KEY =
  import.meta.env.VITE_REST_COUNTRIES_API_KEY;

if (!API_KEY) {
  throw new Error(
    "API key no encontrada. REST Countries"
  );
}

const API_URL: string =
  "https://api.restcountries.com/countries/v5" +
  "?response_fields=names.common,codes.alpha_2,flag.url_svg," +
  "flag.description,population,region,capitals" +
  "&limit=25";

// Prueba de API
/*
const response = await fetch(
  "https://api.restcountries.com/countries/v5/names.common/Canada?pretty=1",
  {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  }
);

const data: CountriesResponse = await response.json();

console.log("Respuesta de la API:", data);  
*/

const menuButton = document.querySelector<HTMLButtonElement>("#menu-button");
const mainMenu = document.querySelector<HTMLElement>("#mobile-menu");
const menuIcon = document.querySelector<HTMLImageElement>("#menu-icon");

function setMenuState(isOpen: boolean): void {
  mainMenu?.classList.toggle("hidden", !isOpen);
  menuButton?.setAttribute("aria-expanded", String(isOpen));
  menuButton?.setAttribute(
    "aria-label",
    isOpen ? "Cerrar menú" : "Abrir menú"
  );

  if (menuIcon) {
    menuIcon.src = isOpen
      ? "./src/assets/icons/close.svg"
      : "./src/assets/icons/menu.svg";
  }

}
menuButton?.addEventListener("click", (): void => {
  const isOpen: boolean =
    menuButton.getAttribute("aria-expanded") === "true";
  setMenuState(!isOpen);
});



async function fetchCountries(): Promise<Country[]> {
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

// funcion para tarjetas de paises 
function getRequiredElement<T extends Element>(
  selector: string
): T {
  const element: T | null =
    document.querySelector<T>(selector);

  if (!element) {
    throw new Error(
      `No se encontró el elemento: ${selector}`
    );
  }

  return element;
};

const countriesContainer: HTMLElement =
  getRequiredElement<HTMLElement>("#countries-container");


//renderizar cada tarjeta de pais 
function renderCountries(countries: Country[]): void {
  const populationFormatter: Intl.NumberFormat =
    new Intl.NumberFormat("es-SV");

  const cardsHTML: string = countries
    .map((country: Country): string => {
      const capital: string =
        country.capitals[0]?.name ??
        "Sin capital registrada";

      const flagDescription: string =
        country.flag.description ||
        `Bandera de ${country.names.common}`;

      return `
        <article
          class="group flex flex-col overflow-hidden rounded-small border border-accent bg-Surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-within:ring-2 focus-within:ring-accent"
        >

          <!-- Bandera -->
          <div
            class="overflow-hidden bg-primary transition-colors duration-300 group-hover:bg-primary"
          >
            <div class="flex h-32 w-full items-center justify-center bg-primary">
              <img
                class="h-full w-full object-contain"
                src="${country.flag.url_svg}"
                alt="${flagDescription}"
                loading="lazy"
              />
            </div>
          </div>

          <!-- Información del país -->
          <div class="flex flex-1 flex-col p-4">

            <!-- Nombre -->
            <h3 class="font-primary text-xl font-bold">
              ${country.names.common}
            </h3>

            <!-- Datos -->
            <div class="mt-3 space-y-3 text-base">

              <p>
                <span class="font-semibold">
                  Población:
                </span>
                ${populationFormatter.format(country.population)}
              </p>

              <p>
                <span class="font-semibold">
                  Región:
                </span>
                ${country.region}
              </p>

              <p>
                <span class="font-semibold">
                  Capital:
                </span>
                ${capital}
              </p>

            </div>

            <!-- Botón -->
            <button
              type="button"
              class="mt-4 min-h-11 w-full rounded-full bg-accent px-4 py-2 text-white transition-all duration-200 hover:bg-accent/80 active:scale-95 focus-visible:outline-2 focus-visible:outline-accent sm:w-32"
              aria-label="Ver más información de ${country.names.common}"
            >
              Ver más
            </button>

          </div>

        </article>
      `;
    })
    .join("");

  countriesContainer.innerHTML = cardsHTML;
}

//iniciamos la app 
async function initializeApp(): Promise<void> {
  try {
    const countries: Country[] =
      await fetchCountries();

    renderCountries(countries);
  } catch (error: unknown) {
    const message: string =
      error instanceof Error
        ? error.message
        : "Ocurrió un error desconocido.";

    countriesContainer.innerHTML = `
      <p
        class="col-span-full text-center text-red-600"
        role="alert"
      >
        ${message}
      </p>
    `;

    console.error(error);
  }
}

void initializeApp();