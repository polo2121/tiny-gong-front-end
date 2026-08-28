import { toast } from "sonner";

import { Toast, type ToastType } from "@/components/ui/toast";

type NotifyOptions = {
  title: string;
  description?: string;
  duration?: number;
};

function createNotification(type: ToastType, options: NotifyOptions) {
  return toast.custom(
    (id) => (
      <Toast
        type={type}
        title={options.title}
        description={options.description}
        onClose={() => toast.dismiss(id)}
      />
    ),
    {
      duration: options.duration,
    },
  );
}

export const notify = {
  success(options: NotifyOptions) {
    return createNotification("success", options);
  },

  error(options: NotifyOptions) {
    return createNotification("error", options);
  },

  warning(options: NotifyOptions) {
    return createNotification("warning", options);
  },

  info(options: NotifyOptions) {
    return createNotification("info", options);
  },

  dismiss(id?: string | number) {
    toast.dismiss(id);
  },
};
