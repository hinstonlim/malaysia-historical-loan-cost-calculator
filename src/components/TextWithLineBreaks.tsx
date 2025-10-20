import React from "react";

export const TextWithLineBreaks = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const formattedText = text.replace(/(\r\n|\n|\r)/g, "<br/>");
  return (
    <div
      className={`${className}`}
      dangerouslySetInnerHTML={{ __html: formattedText }}
    />
  );
};
