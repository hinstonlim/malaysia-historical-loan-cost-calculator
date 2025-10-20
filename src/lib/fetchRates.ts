import { RateDataSchema } from "@/schemas/schema.rateData";

export async function fetchRates(): Promise<RateDataSchema[]> {
  const url =
    "https://api.worldbank.org/v2/country/MY/indicator/FR.INR.LEND?format=json&per_page=1000";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const json = await response.json();
    const rawRates = json?.[1] ?? [];

    const rates: RateDataSchema[] = rawRates
      .filter((item: any) => item?.value !== null)
      .map((item: any) => ({
        year: Number(item.date),
        rate: Number(item.value),
      }))
      .filter((r: any) => r.year >= 1975 && r.year <= 2022)
      .reverse();

    return rates;
  } catch (error) {
    console.error("Error fetching rates:", error);
    return [];
  }
}
