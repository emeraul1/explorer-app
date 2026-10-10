
function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char: string) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[char];
  });
}

export function renderLoading(): string {
  return Array.from({ length: 8 }, () => `
    <article
      class="overflow-hidden rounded-medium border border-Color-Neutral-300 bg-Surface shadow-sm animate-pulse"
      aria-hidden="true"
    >
      <div class="h-40 bg-Color-Neutral-300"></div>

      <div class="space-y-4 p-4">
        <div class="h-6 w-3/4 rounded bg-Color-Neutral-300"></div>

        <div class="space-y-3">
          <div class="h-4 w-full rounded bg-Color-Neutral-100"></div>
          <div class="h-4 w-5/6 rounded bg-Color-Neutral-100"></div>
          <div class="h-4 w-2/3 rounded bg-Color-Neutral-100"></div>
        </div>

        <div class="h-10 w-32 rounded-full bg-Color-Neutral-300"></div>
      </div>
    </article>
  `).join("");
}

export function renderEmpty(query: string): string {
  const search = escapeHtml(query.trim());

  return `
    <div class="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <div class="mb-4 rounded-full bg-Color-Neutral-100 p-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10 text-Color-Neutral-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.5"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7"></circle>
          <path stroke-linecap="round" d="m16 16 4 4"></path>
        </svg>
      </div>

      <h3 class="text-xl font-bold">
        No se encontraron países
      </h3>

      <p class="mt-2 max-w-md text-Color-Neutral-600">
        ${
          search
            ? `No encontramos países que coincidan con "${search}".`
            : "No hay países que coincidan con la región seleccionada."
        }
        Intenta con otro nombre o cambia el filtro de región.
      </p>
    </div>
  `;
}

export function renderError(message: string): string {
  const safeMessage = escapeHtml(message);

  return `
    <div class="col-span-full flex flex-col items-center justify-center py-16 text-center"
         role="alert">
      <h3 class="text-xl font-bold text-red-600">
        No se pudieron cargar los países
      </h3>

      <p class="mt-3 max-w-md text-Color-Neutral-600">
        ${safeMessage}
      </p>

      <button
        id="retry-load"
        type="button"
        class="mt-6 min-h-11 rounded-full bg-accent px-6 py-3 font-semibold text-white transition hover:opacity-80 focus-visible:outline-2 focus-visible:outline-accent"
      >
        Reintentar
      </button>
    </div>
  `;
}
