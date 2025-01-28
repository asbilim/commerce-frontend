import { cn } from "@/lib/utils";
import { LoaderCircleIcon, LoaderIcon, LoaderPinwheelIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Default = ({ className, ...props }) => (
  <LoaderIcon className={cn("animate-spin", className)} {...props} />
);

const Circle = ({ className, ...props }) => (
  <LoaderCircleIcon className={cn("animate-spin", className)} {...props} />
);

const Pinwheel = ({ className, ...props }) => (
  <LoaderPinwheelIcon className={cn("animate-spin", className)} {...props} />
);

const CircleFilled = ({ className, size = 24, ...props }) => (
  <div className="relative" style={{ width: size, height: size }}>
    <div className="absolute inset-0 rotate-180">
      <LoaderCircleIcon
        className={cn("animate-spin", className, "text-foreground opacity-20")}
        size={size}
        {...props}
      />
    </div>
    <LoaderCircleIcon
      className={cn("relative animate-spin", className)}
      size={size}
      {...props}
    />
  </div>
);

const Spinner = ({ variant = "circle", ...props }) => {
  switch (variant) {
    case "circle":
      return <Circle {...props} />;
    case "pinwheel":
      return <Pinwheel {...props} />;
    case "circle-filled":
      return <CircleFilled {...props} />;
    default:
      return <Default {...props} />;
  }
};

export const LoadingButton = ({
  loading,
  spinnerVariant = "circle",
  children,
  ...props
}) => {
  return (
    <Button disabled={loading} {...props}>
      {loading ? <Spinner className="mr-2" variant={spinnerVariant} /> : null}
      {children}
    </Button>
  );
};
