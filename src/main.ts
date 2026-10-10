import './style.css'

import "./style.css";

import type { Country } from "./types/country";

import { fetchCountries } from "./api/countries";

import { renderCountryGrid } from "./render/countryGrid";

//filtro
import { filterCountries } from "./utils/filter";

//estados 
import {renderLoading, renderEmpty, renderError, } from "./render/states";


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


let isLoading = false;

async function loadCountries(): Promise<void> {
  if (!countriesContainer) {
    console.error("No se encontró #countries-container.");
    return;
  }

  isLoading = true;
  countriesContainer.innerHTML = renderLoading();

  try {
    allCountries = await fetchCountries();
    isLoading = false;

    // Aplica la búsqueda y la región actuales.
    applyFilter();
  } catch (error: unknown) {
    isLoading = false;

    const message: string =
      error instanceof Error
        ? error.message
        : "Ocurrió un error desconocido.";

    countriesContainer.innerHTML = renderError(message);

    console.error(error);
  }
}

function applyFilter(): void {
  if (
    isLoading ||
    !countrySearch ||
    !regionFilter ||
    !countriesContainer
  ) {
    return;
  }

  const query = countrySearch.value;
  const region = regionFilter.value;

  const filteredCountries = filterCountries(
    allCountries,
    query,
    region
  );

  if (filteredCountries.length === 0) {
    countriesContainer.innerHTML = renderEmpty(query);
    return;
  }

  countriesContainer.innerHTML =
    renderCountryGrid(filteredCountries);
}

// Buscar mientras se escribe.
countrySearch?.addEventListener("input", applyFilter);

// Filtrar cuando cambia la región.
regionFilter?.addEventListener("change", applyFilter);

// Delegación del evento para que funcione aunque
// el botón Reintentar se cree dinámicamente.
countriesContainer?.addEventListener("click", (event: MouseEvent) => {
  const target = event.target;

  if (
    target instanceof Element &&
    target.closest("#retry-load")
  ) {
    void loadCountries();
  }
});

// Carga inicial.
void loadCountries();

countrySearch?.addEventListener(
  "input",
  applyFilter
);

regionFilter?.addEventListener(
  "change",
  applyFilter
);


void loadCountries();  

