import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-right"
      toastOptions={{
        duration: 5000,
        classNames: {
          toast: "group toast group-[.toaster]:bg-gray-100 dark:group-[.toaster]:bg-gray-800 group-[.toaster]:text-foreground group-[.toaster]:border-gray-200 dark:group-[.toaster]:border-gray-700 group-[.toaster]:shadow-lg group-[.toaster]:rounded-lg group-[.toaster]:px-6",
          description: "hidden",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:rounded-md group-[.toast]:text-sm group-[.toast]:font-medium",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:px-3 group-[.toast]:py-1.5",
          success: "group-[.toaster]:bg-green-100 dark:group-[.toaster]:bg-green-900/40 group-[.toaster]:text-green-800 dark:group-[.toaster]:text-green-200 group-[.toaster]:border-green-300 dark:group-[.toaster]:border-green-700",
          error: "group-[.toaster]:bg-red-100 dark:group-[.toaster]:bg-red-900/40 group-[.toaster]:text-red-800 dark:group-[.toaster]:text-red-200 group-[.toaster]:border-red-300 dark:group-[.toaster]:border-red-700",
          title: "group-[.toast]:font-semibold group-[.toast]:text-base group-[.toast]:px-4 group-[.toast]:py-3",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
