/** @type {import('tailwindcss').Config} */
// import plugin from "tailwindcss/line-clamp";
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primarygray: "#f8f8f8",
        qblack: "#222222",
        qyellow: "#ffc602",
        qred: "#EF262C",
        qgreen: "#26aa2C",
        qgray: "#797979",
        qblacktext: "#1D1D1D",
        qgraytwo: "#8E8E8E",
        "qgray-border": "#EFEFEF",
        "qblue-white": "#CBECFF",
        "main1-color": "#bbbbb8",
        "main-color": "#000000",
        "secondary-color": "#e8e8e8 ",
        "secondary1-color": "#e8e8e8 ",
        "qh4-pink": "#FDB2BB",
        "qh5-bwhite": "#95D7DE",
        "qh3-blue": "#1868D5",
        "nav-color": "#005283",
      },
      scale: {
        60: "0.6",
      },
      keyframes: {
        zoomOut: {
          "0%": { transform: "scale(1.1)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        zoomOut: "zoomOut 1.2s ease-out forwards",
      },
    },
  },
  variants: {
    extend: {
      textColor: ["focus-within"],
      borderStyle: ["last"],
    },
  },
};
