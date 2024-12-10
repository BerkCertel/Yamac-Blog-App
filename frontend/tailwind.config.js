/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mycolor: "#1D2D50", // Koyu mavi (bilim kurgu temalı)
        mycolor2: "#800020", // Bordo (parapsikoloji ve gizem)
        mycolor3: "#FFD700", // Altın (detaylar için)
        mycolor4: "#0F6292", // Gümüş (soğuk detaylar)#C0C0C0
        mycolor5: "#A9C0D6", // Soluk mavi (soğuk vurgu rengi)
        mycolor6: "#333333", // Koyu gri (metin için)
        mycolor7: "#000000", // Koyu gri (metin için)
      },
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
      fontFamily: {
        cinzel: ["Cinzel Decorative", "serif"], // Cinzel Decorative fontunu ekliyoruz
        roboto: ["Roboto", "sans-serif"], // Roboto fontunu ekliyoruz
      },
    },
  },
  plugins: [],
};
