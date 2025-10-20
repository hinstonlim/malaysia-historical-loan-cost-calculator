import axios from "axios";
import { MalaysiaOverviewSchema } from "@/schemas/schema.malaysiaOverview";

export async function fetchMalaysiaOverview(): Promise<MalaysiaOverviewSchema> {
  const indicators = {
    gdp: "NY.GDP.MKTP.CD",  
    population: "SP.POP.TOTL",
    inflation: "FP.CPI.TOTL.ZG",
    unemployment: "SL.UEM.TOTL.ZS",
    lendingRate: "FR.INR.LEND",
  };

  const fetchLatest = async (indicator: string) => {
    const url = `https://api.worldbank.org/v2/country/MY/indicator/${indicator}`;
    try {
      const { data } = await axios.get(url, {
        params: { format: "json", per_page: 1000 },
      });

      const values = data?.[1] ?? [];
      const latest = values.find((item: any) => item.value !== null);

      return Number(latest?.value ?? 0);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(`Axios error fetching ${indicator}:`, error.message);
      } else {
        console.error(`Unexpected error fetching ${indicator}:`, error);
      }
      throw new Error(`Failed to fetch data for ${indicator}`);
    }
  };

  const [gdp, population, inflation, unemployment, lendingRate] =
    await Promise.all(Object.values(indicators).map(fetchLatest));

  return {
    gdp,
    population,
    inflation,
    unemployment,
    lendingRate,
  };
}
