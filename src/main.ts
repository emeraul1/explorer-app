import './style.css'

import "./style.css";

import type { Country } from "./types/country";

import { fetchCountries } from "./api/countries";

import { renderCountryGrid } from "./render/countryGrid";

//filtro
import { filterCountries } from "./utils/filter";


//menu hamburguesa
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


//buscador de paises
const countrySearch: HTMLInputElement | null =
  document.querySelector<HTMLInputElement>(
    "#country-search"
  );

// Selector utilizado para filtrar por región
const regionFilter: HTMLSelectElement | null =
  document.querySelector<HTMLSelectElement>(
    "#region-filter"
  );


let allCountries: Country[] = [];

//tarjetas de paises
const countriesContainer: HTMLElement | null =
  document.querySelector<HTMLElement>(
    "#countries-container"
  );

async function loadCountries(): Promise<void> {

  if (!countriesContainer) {
    console.error(
      "No se encontró #countries-container."
    );
    return;
  }

  try {
    // Obtiene todos los países desde la API
    allCountries = await fetchCountries();

    // Renderiza todos los países en el contenedor
    countriesContainer.innerHTML =
      renderCountryGrid(allCountries);

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

function applyFilter(): void {

  // Verificar que los controles y el contenedor existan
  if (
    !countrySearch ||
    !regionFilter ||
    !countriesContainer
  ) {
    return;
  }

  // Obtiene el texto escrito por el usuario
  const query: string =
    countrySearch.value;

  // Obtiene la región seleccionada
  const region: string =
    regionFilter.value;

  // Aplica simultáneamente la búsqueda y la región
  const filteredCountries: Country[] =
    filterCountries(
      allCountries,
      query,
      region
    );

  // Renderiza únicamente los países que coinciden
  countriesContainer.innerHTML =
    renderCountryGrid(filteredCountries);
}

countrySearch?.addEventListener(
  "input",
  applyFilter
);

regionFilter?.addEventListener(
  "change",
  applyFilter
);


void loadCountries();  

