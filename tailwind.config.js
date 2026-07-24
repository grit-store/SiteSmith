/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#C9A96E",
        "primary-fixed": "#DFC08A",
        "primary-fixed-dim": "#C9A96E",
        "primary-container": "rgba(201, 169, 110, 0.15)",
        "on-primary": "#0c0c0e",
        "background": "#0D0C0A",
        "surface": "#0D0C0A",
        "surface-container": "#1D1B18",
        "surface-container-low": "#151411",
        "surface-container-lowest": "#070605",
        "surface-container-high": "#282521",
        "surface-container-highest": "#332F2A",
        "surface-deep": "#0D0C0A",
        "surface-glass": "rgba(29, 27, 24, 0.55)",
        "border-subtle": "#2A2A2C",
        "on-surface": "#F0ECE4",
        "on-surface-variant": "#9A9590",
        "text-muted": "#6B6560",
        "glow-teal": "rgba(201, 169, 110, 0.08)",
        "surface-bright": "#222225",
        "surface-dim": "#0D0C0A",
        "outline": "#48484A",
        "secondary": "#bec6e0",
        "on-secondary": "#283044",
        "secondary-container": "#3f465c",
        "on-secondary-container": "#adb4ce",
        "tertiary": "#ffd1aa",
        "on-tertiary": "#4b2800",
        "tertiary-container": "#ffac5a",
        "on-tertiary-container": "#744000",
        "error": "#ffb4ab",
        "on-error": "#690005",
        "error-container": "#93000a",
        "on-error-container": "#ffdad6"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "margin-mobile": "16px",
        "gutter": "24px",
        "margin-desktop": "48px",
        "unit": "8px",
        "container-max": "1280px"
      },
      fontFamily: {
        "body-md": ["Inter", "sans-serif"],
        "display-lg": ["Space Grotesk", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "headline-lg-mobile": ["Space Grotesk", "sans-serif"],
        "code-sm": ["JetBrains Mono", "monospace"],
        "headline-md": ["Space Grotesk", "sans-serif"],
        "headline-lg": ["Space Grotesk", "sans-serif"],
        "label-caps": ["Space Grotesk", "sans-serif"]
      },
      fontSize: {
        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
        "display-lg": ["64px", { "lineHeight": "72px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
        "headline-lg-mobile": ["32px", { "lineHeight": "40px", "fontWeight": "700" }],
        "code-sm": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
        "headline-md": ["30px", { "lineHeight": "38px", "fontWeight": "600" }],
        "headline-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.01em", "fontWeight": "700" }],
        "label-caps": ["12px", { "lineHeight": "16px", "letterSpacing": "0.1em", "fontWeight": "600" }]
      }
    }
  },
  plugins: [],
}
