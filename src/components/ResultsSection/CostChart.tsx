"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ResultsSchema } from "@/schemas/schema.results";
import { beautifyNumber, beautifyPrice } from "@/lib/utils";

const chartConfig = {
  totalCost: {
    label: "Total Cost",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export default function CostChart({ data }: { data: ResultsSchema[] }) {
  return (
    <Card className="flex flex-col flex-3 max-h-max">
      <CardHeader>
        <CardTitle>Malaysia Historical Loan Cost</CardTitle>
        <CardDescription>1975 - 2022</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="">
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
              right: 24,
              left: 24,
              bottom: 20,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />

            <YAxis
              dataKey="totalCost"
              tickMargin={8}
              label={{
                value: "Cost (RM)",
                angle: -90,
                position: "insideLeft",
                offset: -10,
                style: { textAnchor: "middle" },
              }}
            />

            <XAxis
              dataKey="year"
              label={{
                value: "Year",
                position: "insideBottom",
                offset: -10,
              }}
              tickMargin={8}
            />

            <ChartTooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={
                <ChartTooltipContent
                  labelKey="year"
                  formatter={(value, name, props) => {
                    const { payload } = props;
                    if (!payload) return null;

                    return (
                      <div className="flex flex-col gap-1">
                        <div className="text-sm font-medium">
                          {payload.year}
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-neutral-500">Total Cost</span>
                          {beautifyPrice(payload.totalCost)}
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Interest</span>
                          {beautifyPrice(payload.interest)}
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">
                            Adjusted Rate
                          </span>
                          {beautifyNumber(payload.adjustedRate.toFixed(2))}%
                        </div>
                      </div>
                    );
                  }}
                />
              }
            />

            <Line
              dataKey="totalCost"
              name="Total Cost"
              type="linear"
              stroke="var(--color-totalCost)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
