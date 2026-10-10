
import type { CountryDetail } from "../types/country-detail";
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

export function renderDetail(country: CountryDetail): string {
  const nativeNames = Object.values(country.names.native ?? {});
  const officialName =
    nativeNames[0]?.official ?? country.names.common;

  const currencies = country.currencies?.length
    ? country.currencies
        .map(
          (currency) =>
            `${currency.name} (${currency.code})${
              currency.symbol ? ` - ${currency.symbol}` : ""
            }`
        )
        .join(", ")
    : "No registradas";

  const languages = country.languages?.length
    ? country.languages
        .map((language) => language.name)
        .join(", ")
    : "No registrados";

  const borders = country.borders?.length
    ? country.borders
        .map((code) => `<span class="rounded-medium bg-Color-Neutral-100 px-4 py-2">${escapeHtml(code)}</span>`)
        .join(" ")
    : '<span class="text-Color-Neutral-600">Sin fronteras terrestres registradas</span>';

  const flagUrl = country.flag.url_svg || "/placeholder.png";

  return `
    <section class="mx-auto max-w-7xl py-8">
      <a
            href="#/"
            class="inline-flex min-h-11 items-center rounded-full bg-(--Secundary) px-5 py-2 font-semibold text-Color-Neutral-900 transition-colors hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
            ← Atrás
        </a>

      <div class="mt-10 grid grid-cols-1 items-center gap-10 md:grid-cols-2 lg:gap-16">
        <img
          src="${escapeHtml(flagUrl)}"
          alt="${escapeHtml(getFlagDescription(country))}"
          class="aspect-3/2 w-full rounded-medium object-cover shadow-sm"
          onerror="this.onerror=null; this.src='/placeholder.png';"
        />

        <div>
             <h1 class="text-3xl font-extrabold">
                ${escapeHtml(country.names.common)}
            </h1>

          <p class="mt-3 text-Color-Neutral-600">
            <strong>Nombre oficial:</strong> ${escapeHtml(officialName)}
          </p>

          <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <p><strong>Capital:</strong> ${escapeHtml(getCapital(country))}</p>
            <p><strong>Población:</strong> ${formatPopulation(country.population)}</p>
            <p><strong>Región:</strong> ${escapeHtml(country.region)}</p>
            <p><strong>Subregión:</strong> ${escapeHtml(country.subregion ?? "No registrada")}</p>
            <p><strong>Monedas:</strong> ${escapeHtml(currencies)}</p>
            <p><strong>Idiomas:</strong> ${escapeHtml(languages)}</p>
          </div>

          <div class="mt-8">
            <h2 class="text-lg font-bold">Países fronterizos</h2>
            <div class="mt-3 flex flex-wrap gap-2">
              ${borders}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
