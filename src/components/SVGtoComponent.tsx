import { cn } from "@/lib/utils";
import { FunctionComponent, SVGProps } from "react";

type Props = {
  SVG: FunctionComponent<SVGProps<SVGSVGElement>>;
  className?: string;
};

// Note: SVG 컴포넌트에 tailwind를 사용하기 위해 적용
const SVGtoComponent = ({ SVG, className }: Props) => {
  return <SVG className={cn("w-fit h-fit", className)} />;
};

export default SVGtoComponent;
