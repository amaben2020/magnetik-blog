import localFont from "next/font/local";

export const gothic = localFont({
  src: [
    {
      path: "./../../../public/fonts/Raleway/static/Raleway-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-gothic",
});

export const raleway = localFont({
  src: [
    {
      path: "./../../../public/fonts/Raleway/static/Raleway-Regular.ttf",
      weight: "400",
    },
    {
      path: "./../../../public/fonts/Raleway/static/Raleway-Bold.ttf",
      weight: "700",
    },
  ],
  variable: "--font-raleway",
});
