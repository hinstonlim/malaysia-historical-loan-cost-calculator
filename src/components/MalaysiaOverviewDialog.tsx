"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MalaysiaOverviewSchema } from "@/schemas/schema.malaysiaOverview";
import { useState } from "react";
import { DetailsView } from "./DetailsView";
import { beautifyNumber, beautifyPrice } from "@/lib/utils";
import { InfoIcon } from "lucide-react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Label } from "./ui/label";

export const MalaysiaOverviewDialog = ({
  malaysiaOverview,
  error,
}: {
  malaysiaOverview: MalaysiaOverviewSchema;
  error: boolean;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant={"default"} className="w-full mt-4">
          <InfoIcon className="mr-2" />
          Malaysia Economic Overview
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[48vw]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <InfoIcon className="mr-2" />
            Malaysia Economic Overview
          </DialogTitle>
          <DialogDescription>
            Hereby displayed the key economic indicators for Malaysia in 2024
          </DialogDescription>
        </DialogHeader>
        {error ? (
          <div className="flex h-full items-center justify-center gap-8">
            <ExclamationTriangleIcon className="size-8 text-red-600" />
            <Label className="text-red-600 ml-4 text-sm">
              Failed to fetch Malaysia overview data
            </Label>
          </div>
        ) : (
          <DetailsView
            className="grid-cols-2"
            content={[
              {
                title: "GDP",
                description: `${beautifyNumber(malaysiaOverview?.gdp)} USD`
              },
              {
                title: "Population",
                description: beautifyNumber(malaysiaOverview?.population),
              },
              {
                title: "Inflation Rate",
                description: `${beautifyNumber(
                  Number(malaysiaOverview?.inflation.toFixed(2))
                )}%`,
              },
              {
                title: "Unemployment Rate",
                description: `${beautifyNumber(
                  Number(malaysiaOverview?.unemployment.toFixed(2))
                )}%`,
              },
              {
                title: "Lending Rate",
                description: `${beautifyNumber(
                  Number(malaysiaOverview?.lendingRate.toFixed(2))
                )}%`,
              },
            ]}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
