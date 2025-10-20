import { TextWithLineBreaks } from "./TextWithLineBreaks";

export const DetailsDescription = ({
  children,
}: {
  children: string | React.ReactNode;
}) => {
  if (typeof children === "string") {
    return TextWithLineBreaks({
      text: children,
      className: "text-muted-foreground text-base break-words",
    });
  } else {
    return (
      <div className="text-muted-foreground text-base break-words">
        {children}
      </div>
    );
  }
};
