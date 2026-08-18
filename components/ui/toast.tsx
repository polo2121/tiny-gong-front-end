import {
  CircleCheckIcon,
  InfoIcon,
  OctagonXIcon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react";
// import { DestructiveActionIllustration } from "../illustrations/DestructiveActionIllustration";
import { ErrorToastIllustration } from "../illustrations/ErrorToastIllustration";
import { SuccessToastIllustration } from "../illustrations/SuccessToastIllustration";
import { cn } from "@/lib/utils";

const icons = {
  success: SuccessToastIllustration,
  error: ErrorToastIllustration,
  warning: TriangleAlertIcon,
  info: InfoIcon,
};

const iconStyles = {
  success: "bg-green-50",
  error: "bg-red-50",
  warning: "bg-amber-100 text-amber-600",
  info: "bg-blue-100 text-blue-600",
};

const toastStyles: Record<ToastType, string> = {
  success: "border border-green-500",
  error: "border border-red-500",
  warning: "",
  info: "",
};

export type ToastType = "success" | "error" | "warning" | "info";

type ToastProps = {
  type: ToastType;
  title: string;
  description?: string;
  onClose: () => void;
};

export function Toast({ type, title, description, onClose }: ToastProps) {
  const Icon = icons[type];

  return (
    <div
      className={`flex w-95 min-h-20 p-2 gap-4 bg-white rounded-lg border shadow-lg ${toastStyles[type]}`}
    >
      <div
        className={`flex flex-1 rounded-lg justify-center items-center relative ${iconStyles[type]}`}
      >
        <Icon className="size-18" />
        {/* <DestructiveActionIllustration className="size-2 bg-amber-400" /> */}
      </div>

      <div className="flex-3 py-2">
        <p className="text-sm font-semibold text-foreground line-clamp-1">
          {title}
        </p>

        {description && (
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}
      </div>

      {/* <button
        type="button"
        onClick={onClose}
        className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Close notification"
      >
        <XIcon className="size-4" />
      </button> */}
    </div>
  );
}
