import { DetailsTitle } from "./DetailsTitle";
import { DetailsDescription } from "./DetailsDescription";
import Image from "next/image";

export const DetailsView = ({
  content,
  maxItemPerRow = 3,
  className,
}: {
  content: any[];
  maxItemPerRow?: number;
  className?: string;
}) => {
  // Filter the content array (if content[x].description is null) to remove any falsy values
  // If content[x].showNotSubmitted is true, no need to filter
  // If content[x].showNotSubmitted is false, filter the content array to remove any falsy values
  content = content.filter((item) => {
    if (item.description || item.optional) {
      return item;
    }
  });

  return (
    <div
      className={`grid gap-4 grid-cols-${maxItemPerRow} ${className ? className : ""}`}
    >
      {content.map((item, index) => {
        return (
          <div key={index}>
            <DetailsTitle>{item.title}</DetailsTitle>
            <DetailsDescription>
              {item.image && item.description ? (
                <Image
                  src={item.description}
                  width={200}
                  height={200}
                  alt={item.title}
                />
              ) : item.description && !item.hasOwnProperty("image") ? (
                // If optional is true, display "Not Submitted" in the description when image not available
                item.description
              ) : (
                "Not Submitted"
              )}
            </DetailsDescription>
          </div>
        );
      })}
    </div>
  );
};
