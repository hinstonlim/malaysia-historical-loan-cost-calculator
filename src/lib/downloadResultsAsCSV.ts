export const downloadResultsAsCSV = async (body: any) => {
  if (!body || body.length === 0) return;

  const headerMap: Record<string, string> = {
    year: "Year",
    adjustedRate: "Adjusted Rate",
    principal: "Principal",
    interest: "Interest",
    totalCost: "Total Cost",
    monthlyPayment: "Monthly Payment",
  };

  const headers = Object.keys(body[0]);

  const csvHeaders = headers.map((key) => headerMap[key] || key);

  const csvRows: string[] = [csvHeaders.join(",")];

  for (const row of body) {
    const rowData = headers.map((key) => {
      const value = row[key];
      if (
        [
          "adjustedRate",
          "principal",
          "interest",
          "totalCost",
          "monthlyPayment",
        ].includes(key) &&
        typeof value === "number"
      ) {
        return value.toFixed(2);
      }
      return value;
    });
    csvRows.push(rowData.join(","));
  }

  const csv = csvRows.join("\n");

  const fileName = `Malaysia Historical Loan Cost`;

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();

  URL.revokeObjectURL(url);
};
