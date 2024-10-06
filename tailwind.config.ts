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
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.3s ease-out",
        "accordion-up": "accordion-up 0.3s ease-out",
      },
      screens: {
        xs: "400px",
      },
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
          2: "hsl(var(--accent-2))",
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
            // Note: heading 스크롤 마진
            "h2, h3, h4, h5, h6": {
              scrollMarginTop: "80px",
            },
            // Note: 링크 스타일링
            ":not(h1, h2, h3, h4, h5, h6) > a": {
              textDecoration: "none",
              textUnderlineOffset: "5px",
              color: "hsl(var(--primary))",
            },
            ":not(h1, h2, h3, h4, h5, h6) > a:hover": {
              textDecoration: "underline dashed",
            },
            // Note: 문단 스타일링
            p: {
              marginTop: "30px",
              marginBottom: "30px",
            },
            // Note: 따옴표 제거
            "blockquote p::after": {
              display: "none",
            },
            "blockquote p::before": {
              display: "none",
            },

            // Note: heading link 스타일링
            ".anchor": {
              opacity: 0.15,
              position: "absolute",
              inset: "0",
              width: "100%",
              maxWidth: "700px",
              cursor: "pointer",
              transition: "opacity 0.3s ease-in-out",
            },

            ".anchor:hover": {
              opacity: 1,
            },

            // Note: 인라인 코드 스타일링
            // 백틱 제거
            ":not(pre) > code::before": {
              display: "none",
            },
            ":not(pre) > code::after": {
              display: "none",
            },
            // 라이트, 다크 테마 공통
            ":not(pre) > code": {
              fontWeight: "inherit",
              position: "relative",
              color: "hsla(var(--destructive) / 0.7)",
              backgroundColor: "hsl(var(--muted))",
              bottom: 1,
              margin: "0 2px",
              border: "1px solid hsla(var(--muted-foreground) / 0.2)",
              borderRadius: 4,
              padding: "2px 6px",
              overflowWrap: "break-word",
            },
            // 다크 테마 설정
            ".dark :not(pre) > code": {
              color: "var(--shiki-dark)",
            },

            code: {
              counterReset: "line",
            },

            "code::before": {
              content: "none",
            },
            "code::after": {
              content: "none",
            },

            // Note: 코드 블록 스타일링
            pre: {
              paddingRight: 0,
              paddingLeft: 0,
              color: "var(--shiki-light)",
              backgroundColor: "var(--shiki-light-bg)",
              border: "1px solid hsla(var(--muted-foreground) / 0.2)",
            },

            ".dark pre": {
              backgroundColor: "var(--shiki-dark-bg)",
              color: "var(--shiki-dark)",
            },

            // Note: 코드 블록 타이틀 스타일링
            "figcaption[data-rehype-pretty-code-title]": {
              border: "1px solid hsla(var(--muted-foreground) / 0.2)",
              borderBottom: "none",
              width: "fit-content",
              padding: "4px 10px",
              borderRadius: "4px 4px 0 0",
              color: "hsl(var(--primary))",
              backgroundColor: "hsl(var(--muted))",
              fontWeight: 600,
            },
            "figcaption[data-rehype-pretty-code-title] + pre": {
              borderTopLeftRadius: 0,
            },

            // Note: 코드 블록 내 텍스트 스타일링
            "pre > code > span": {
              paddingLeft: "1.1rem",
              paddingRight: "1rem",
            },
            "pre code span": {
              color: "var(--shiki-light)",
            },
            ".dark pre code span": {
              color: "var(--shiki-dark)",
            },

            // Note: 코드 블록 라인 넘버
            "code[data-line-numbers] > [data-line]::before": {
              counterIncrement: "line",
              content: "counter(line)",

              display: "inline-block",
              width: "8px",
              marginRight: "20px",
              textAlign: "right",
              color: "grey",
            },

            // Note: 코드 블록 라인 넘버의 자리수마다 차지하는 너비 설정
            'code[data-line-numbers-max-digits="2"] > [data-line]::before': {
              width: "1rem",
            },
            'code[data-line-numbers-max-digits="3"] > [data-line]::before': {
              width: "2rem",
            },
            'code[data-line-numbers-max-digits="4"] > [data-line]::before': {
              width: "3rem",
            },

            // Note: 코드 블록 라인 하이라이트
            "[data-highlighted-line]": {
              backgroundColor: "rgba(253, 224, 71, 0.5)",
            },
            ".dark [data-highlighted-line]": {
              backgroundColor: "rgba(253, 224, 71, 0.2)",
            },

            // Note: 캡션 타이틀 스타일링
            "figcaption[data-rehype-pretty-code-caption]": {
              textAlign: "center",
              marginTop: "8px",
              color: "hsl(var(--muted-foreground))",
              fontStyle: "italic",
            },

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
