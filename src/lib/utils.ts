import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatAmount = (e: React.FormEvent<HTMLInputElement>) => {
  let input = e.currentTarget;
  let value = input.value.replace(/\D/g, ""); // Remove non-digits
  let formattedValue = (parseInt(value, 10) / 100).toFixed(2);
  input.value = isNaN(Number(formattedValue)) ? "" : formattedValue;
};

export const beautifyNumber = (number: number | undefined) => {
  if (number === null || number === undefined) {
    return "N/A";
  }
  return number.toLocaleString("en-US");
};

export const beautifyPrice = (price: number | undefined) => {
  if (price === undefined || price === null) {
    return "RM 0";
  }

  return `RM ${price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};
