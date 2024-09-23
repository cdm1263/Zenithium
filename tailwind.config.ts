import type { Config } from "tailwindcss";
type ThemeFunction = (path: string, defaultValue?: any) => any;

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      typography: (theme: ThemeFunction) => ({
        DEFAULT: {
          css: {
            // Note: message box 기본 스타일
            ".message-box": {
              padding: "8px 16px",
              borderWidth: "2px",
              borderRadius: "8px",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontWeight: 600,
            },
            // Note: message icon 기본 스타일
            ".message-icon": {
              width: "16px",
              height: "16px",
              flexShrink: 0,
            },
            // Note: note 스타일
            ".message-box-note": {
              borderColor: theme("colors.blue.500"),
            },
            ".message-icon-note": {
              color: theme("colors.blue.500"),
            },
            // Note: important 스타일
            ".message-box-important": {
              borderColor: theme("colors.purple.500"),
            },
            ".message-icon-important": {
              color: theme("colors.purple.500"),
            },
            // Note: warning 스타일
            ".message-box-warning": {
              borderColor: theme("colors.yellow.500"),
            },
            ".message-icon-warning": {
              color: theme("colors.yellow.500"),
            },
            // Note: tip 스타일
            ".message-box-tip": {
              borderColor: theme("colors.green.500"),
            },
            ".message-icon-tip": {
              color: theme("colors.green.500"),
            },
            // Note: caution 스타일
            ".message-box-caution": {
              borderColor: theme("colors.red.500"),
            },
            ".message-icon-caution": {
              color: theme("colors.red.500"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
export default config;
