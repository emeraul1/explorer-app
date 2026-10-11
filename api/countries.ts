
export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Método no permitido",
    });
  }

  const apiKey = process.env.REST_COUNTRIES_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "No se encontró la API key de REST Countries.",
    });
  }

  try {
    const url = new URL(
      "https://api.restcountries.com/countries/v5",
    );

    const query = new URL(req.url, "http://localhost");

    query.searchParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const data = await response.json();

    return res.status(response.status).json(data);
  } catch (error) {
    console.error("Error consultando REST Countries:", error);

    return res.status(500).json({
      error: "No fue posible consultar REST Countries.",
    });
  }
}
