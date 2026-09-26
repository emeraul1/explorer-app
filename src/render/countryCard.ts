import type { Country } from "../types/country";

import {
  formatPopulation,
  getCapital,
  getFlagDescription
} from "../utils/format";

export function renderCountryCard(
  country: Country
): string {

  const capital: string =
    getCapital(country);

  const flagDescription: string =
    getFlagDescription(country);

  const formattedPopulation: string =
    formatPopulation(country.population);

  return `
    <article
      class="group flex flex-col overflow-hidden rounded-small border border-accent bg-Surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-within:ring-2 focus-within:ring-accent"
    >

      <div
        class="overflow-hidden bg-primary transition-colors duration-300 group-hover:bg-primary"
        >
        <img
            class="block w-full h-auto"
            src="${country.flag.url_svg}"
            alt="${flagDescription}"
            loading="lazy"
        />
        </div>
      </div>

      <div class="flex flex-1 flex-col p-4">

        <h3 class="font-primary text-xl font-bold">
          ${country.names.common}
        </h3>

        <div class="mt-3 space-y-3 font-primary text-base">

          <p>
            <span class="font-semibold">
              Población:
            </span>
            ${formattedPopulation}
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
}