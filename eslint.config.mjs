import nextCoreWebVitals from "eslint-config-next/core-web-vitals"

// eslint-config-next 16 ya exporta flat config, asi que FlatCompat sobra: con
// el paquete nuevo el puente lanza un error de validacion de esquema.
const config = [
  {
    ignores: [".next/**", "node_modules/**", "components/ui/**"],
  },
  ...nextCoreWebVitals,
  {
    rules: {
      "@next/next/no-img-element": "off",
      "react/no-unescaped-entities": "off",
    },
  },
]

export default config
