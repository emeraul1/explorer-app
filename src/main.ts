
import "./style.css";

import type { Country } from "./types/country";

import {
  fetchCountries,
  fetchCountryByCode,
} from "./api/countries";

import { renderCountryGrid } from "./render/countryGrid";
import { renderDetail } from "./render/detail";
import { filterCountries } from "./utils/filter";
import {
  renderLoading,
  renderEmpty,
  renderError,
} from "./render/states";

// Menú hamburguesa
const menuButton =
  document.querySelector<HTMLButtonElement>("#menu-button");
const mainMenu =
  document.querySelector<HTMLElement>("#mobile-menu");
const menuIcon =
  document.querySelector<HTMLImageElement>("#menu-icon");

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

menuButton?.addEventListener("click", () => {
  const isOpen =
    menuButton.getAttribute("aria-expanded") === "true";

  setMenuState(!isOpen);
});

// Elementos de la página
const homeView =
  document.querySelector<HTMLElement>("#home-view");
const detailView =
  document.querySelector<HTMLElement>("#detail-view");
const countriesContainer =
  document.querySelector<HTMLElement>("#countries-container");
const countrySearch =
  document.querySelector<HTMLInputElement>("#country-search");
const regionFilter =
  document.querySelector<HTMLSelectElement>("#region-filter");

let allCountries: Country[] = [];
let countriesLoaded = false;
let isLoading = false;
let currentRoute = "";

// Cargar el listado de países

async function loadCountries(): Promise<void> {
  if (!countriesContainer) {
    console.error("No se encontró #countries-container.");
    return;
  }

  if (countriesLoaded) {
    applyFilter();
    return;
  }

  isLoading = true;
  countriesContainer.innerHTML = renderLoading();

  try {
    allCountries = await fetchCountries();

    console.log("Países recibidos:", allCountries.length);

    countriesLoaded = true;
    isLoading = false;

    // Ahora applyFilter ya puede renderizar las tarjetas.
    applyFilter();

    console.log(
      "HTML generado:",
      countriesContainer.innerHTML.slice(0, 500)
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Ocurrió un error desconocido.";

    countriesLoaded = false;
    isLoading = false;

    countriesContainer.innerHTML = renderError(message);
    console.error("Error al cargar los países:", error);
  } finally {
    isLoading = false;
  }
}


// Buscar y filtrar países
function applyFilter(): void {
  if (
    isLoading ||
    !countrySearch ||
    !regionFilter ||
    !countriesContainer
  ) {
    return;
  }

  const filteredCountries = filterCountries(
    allCountries,
    countrySearch.value,
    regionFilter.value
  );

  countriesContainer.innerHTML =
    filteredCountries.length === 0
      ? renderEmpty(countrySearch.value)
      : renderCountryGrid(filteredCountries);
}

countrySearch?.addEventListener("input", applyFilter);
regionFilter?.addEventListener("change", applyFilter);

// Reintentar la carga del listado
countriesContainer?.addEventListener("click", (event: MouseEvent) => {
  const target = event.target;

  if (
    target instanceof Element &&
    target.closest("#retry-load")
  ) {
    countriesLoaded = false;
    void loadCountries();
  }
});

// Mostrar un país concreto
async function loadCountryDetail(code: string): Promise<void> {
  if (!detailView) {
    console.error("No se encontró #detail-view.");
    return;
  }

  detailView.hidden = false;
  detailView.innerHTML = `
    <div class="py-12" role="status" aria-live="polite">
      ${renderLoading()}
      <p class="mt-4 text-center">Cargando información del país...</p>
    </div>
  `;

  try {
    const country = await fetchCountryByCode(code);

    // Evita mostrar una respuesta antigua si cambió la ruta.
    if (window.location.hash !== `#/country/${code}`) {
      return;
    }

    detailView.innerHTML = renderDetail(country);
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "No fue posible cargar la información del país.";

    detailView.innerHTML = `
      <section class="mx-auto max-w-7xl py-8" role="alert">
        <a
          href="#/"
          class="inline-flex min-h-11 items-center rounded-full border px-5 py-2 hover:bg-Color-Neutral-100"
        >
          ← Volver a países
        </a>
        <div class="mt-8">
          ${renderError(message)}
        </div>
      </section>
    `;
    console.error(error);
  }
}

// Enrutador: interpreta la dirección después de #
async function router(): Promise<void> {
  const hash = window.location.hash || "#/";
  currentRoute = hash;

  const match = hash.match(/^#\/country\/([a-zA-Z]{2})\/?$/);

  if (match) {
    if (homeView) homeView.hidden = true;
    if (detailView) detailView.hidden = false;

    await loadCountryDetail(match[1].toUpperCase());
    return;
  }

  if (homeView) homeView.hidden = false;
  if (detailView) {
    detailView.hidden = true;
    detailView.innerHTML = "";
  }

  await loadCountries();
}

// Detectar navegación, incluidos Atrás y Adelante
window.addEventListener("hashchange", () => {
  void router();
});

// Iniciar la aplicación
void router();
