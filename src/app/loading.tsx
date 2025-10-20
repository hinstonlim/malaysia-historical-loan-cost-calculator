import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface ISVGProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export default function Loading({ size = 400 }: ISVGProps) {
  return <Spinner />;
}
