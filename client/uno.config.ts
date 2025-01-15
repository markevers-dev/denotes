import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetTypography,
    presetUno,
    presetWebFonts,
    transformerDirectives,
    transformerVariantGroup
  } from 'unocss'
  
  export default defineConfig({
    shortcuts: [
      // ...
    ],
    theme: {
      colors: {
        brand: {
          primary: "#70ffaf",
          secondary: "f472b6",
          black: "#0d0d0d",
          gray: "#262626",
          white: "#ffffff",
          offWhite: "#f2f2f2",
        }
      }
    },
    presets: [
      presetUno(),
      presetAttributify(),
      presetIcons(),
      presetTypography(),
      presetWebFonts({
        fonts: {
          // ...
        },
      }),
    ],
    transformers: [
      transformerDirectives(),
      transformerVariantGroup(),
    ],
  })