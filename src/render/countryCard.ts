import type { Country } from "../types/country";

import {
  formatPopulation,
  getCapital,
  getFlagDescription,
} from "../utils/format";

function escapeHtml(value: string): string {
  const entities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  return value.replace(/[&<>"']/g, (char) => entities[char]);
}

export function renderCountryCard(country: Country): string {
  const capital = getCapital(country);
  const flagDescription = getFlagDescription(country);
  const formattedPopulation = formatPopulation(country.population);

  const code = country.codes.alpha_2.trim().toUpperCase();
  const name = escapeHtml(country.names.common);
  const detailUrl = `#/country/${encodeURIComponent(code)}`;

  // Comprueba si el listado incluye información adicional.

 const hasAdditionalInfo =
  country.names.common !== "Abkhazia" &&
  Boolean(
    (country.names.native &&
      Object.keys(country.names.native).length > 0) ||
    country.subregion ||
    country.tlds?.length ||
    country.currencies?.length ||
    country.languages?.length ||
    country.borders?.length
  );

const action = hasAdditionalInfo
  ? `
    <a
        href="${detailUrl}"
        class="mt-6 flex min-h-11 w-full items-center justify-center rounded-full bg-accent px-5 py-2 text-lg font-medium text-white transition-all duration-200 hover:opacity-80 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:w-32"
        aria-label="Ver más información de ${name}"
      >
      Ver más
    </a>
  `
  : `
    <p class="mt-6 text-sm text-Color-Neutral-600">
      Detalle no disponible para este país.
    </p>
  `;

return `
  <article
    class="@container overflow-hidden rounded-medium border border-Color-Neutral-300 bg-Surface shadow-sm"
  >
    <div class="flex flex-col @md:flex-row">

      <a
        href="${detailUrl}"
        class="block w-full shrink-0 overflow-hidden bg-Color-Neutral-100 @md:w-2/5"
        aria-label="Ver detalles de ${name}"
      >
        <img
          class="block aspect-3/2 w-full object-cover"
          src="${escapeHtml(country.flag.url_svg || "/placeholder.png")}"
          alt="${escapeHtml(flagDescription)}"
          loading="lazy"
          onerror="this.onerror=null; this.src='/placeholder.png';"
        />
      </a>

      <div class="flex min-w-0 flex-1 flex-col p-5">

        <h3 class="font-primary text-(length:--font-country-name) font-bold text-Color-Neutral-900">
          <a
            href="${detailUrl}"
            class="hover:underline focus-visible:underline"
          >
            ${name}
          </a>
        </h3>

        <div class="mt-4 space-y-4 font-primary text-base">
          <p>
            <strong>Población:</strong>
            ${formattedPopulation}
          </p>

          <p>
            <strong>Región:</strong>
            ${escapeHtml(country.region || "No disponible")}
          </p>

          <p>
            <strong>Capital:</strong>
            ${escapeHtml(capital || "No disponible")}
          </p>
        </div>

        ${action}

      </div>
    </div>
  </article>
`;
}
