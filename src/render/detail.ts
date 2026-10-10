
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

  return value.replace(/[&<>"']/g, (char) => entities[char] ?? char);
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
            }`,
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
        .map(
          (code) =>
            `<span class="rounded-medium bg-Color-Neutral-100 px-4 py-2 text-base font-primary">${escapeHtml(code)}</span>`,
        )
        .join(" ")
    : `<span class="text-base text-Color-Neutral-600">
        Sin fronteras terrestres registradas
      </span>`;

  const flagUrl = country.flag.url_svg || "/placeholder.png";

  return `
    <section class="mx-auto max-w-7xl py-8 font-primary">

      <a
        href="#/"
        class="inline-flex min-h-12 items-center rounded-full bg-(--Secundary) px-6 py-3 font-primary text-base font-semibold text-Color-Neutral-900 transition-colors hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        ← Atrás
      </a>

      <div class="mt-10 grid grid-cols-1 items-center gap-10 md:grid-cols-2 lg:gap-16">

        <img
          src="${escapeHtml(flagUrl)}"
          alt="${escapeHtml(getFlagDescription(country))}"
          class="aspect-3/2 w-full rounded-medium object-cover shadow-sm"
          loading="lazy"
          onerror="this.onerror=null; this.src='/placeholder.png';"
        />

        <div class="min-w-0 font-primary">

          <h1 class="font-primary text-4xl font-bold text-Color-Neutral-900 md:text-5xl">
            ${escapeHtml(country.names.common)}
          </h1>

          <p class="mt-4 text-lg leading-relaxed text-Color-Neutral-600">
            <strong>Nombre oficial:</strong>
            ${escapeHtml(officialName)}
          </p>

          <div class="mt-8 grid grid-cols-1 gap-5 font-primary text-lg leading-relaxed sm:grid-cols-2">

            <p>
              <strong>Capital:</strong>
              ${escapeHtml(getCapital(country))}
            </p>

            <p>
              <strong>Población:</strong>
              ${formatPopulation(country.population)}
            </p>

            <p>
              <strong>Región:</strong>
              ${escapeHtml(country.region)}
            </p>

            <p>
              <strong>Subregión:</strong>
              ${escapeHtml(country.subregion ?? "No registrada")}
            </p>

            <p>
              <strong>Monedas:</strong>
              ${escapeHtml(currencies)}
            </p>

            <p>
              <strong>Idiomas:</strong>
              ${escapeHtml(languages)}
            </p>

          </div>

          <div class="mt-10">

            <h2 class="font-primary text-xl font-bold text-Color-Neutral-900">
              Países fronterizos
            </h2>

            <div class="mt-4 flex flex-wrap gap-3 font-primary">
              ${borders}
            </div>

          </div>
        </div>
      </div>
    </section>
  `;
}
