import './style.css'

import "./style.css";

import type { Country } from "./types/country";

import { fetchCountries } from "./api/countries";

import { renderCountryGrid } from "./render/countryGrid";

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

    const countries: Country[] =
      await fetchCountries();

    countriesContainer.innerHTML =
      renderCountryGrid(countries);

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

void loadCountries();  
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


