"use client";

import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { forwardRef, useEffect, useState } from "react";

const Switch = forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mount, setMount] = useState(false);

  // Note: 초기 상태 관리
  useEffect(() => {
    setMount(true);
  }, []);

  const currentTheme = mount
    ? theme === "system"
      ? systemTheme
      : theme
    : "light";

  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex h-6 w-12 shrink-0 cursor-pointer items-center rounded-full border-[1.5px] transition-colors border-foreground/10 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-muted data-[state=unchecked]:bg-input duration-300",
        className
      )}
      {...props}
      checked={currentTheme === "dark"}
      onCheckedChange={toggleTheme}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0 relative duration-300"
        )}
      >
        <Moon
          className={cn(
            "absolute h-2.5 w-2.5 m-auto inset-0 transition-all duration-0",
            `${
              mount
                ? theme === "dark"
                  ? "opacity-70"
                  : "opacity-0"
                : "opacity-0"
            }`
          )}
        />
        <Sun
          className={cn(
            "absolute h-2.5 w-2.5 m-auto inset-0 transition-all duration-0",
            `${
              mount
                ? theme === "light"
                  ? "opacity-70"
                  : "opacity-0"
                : "opacity-70"
            }`
          )}
        />
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  );
});
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
