/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./**/*.tsx"],
  daisyui: {
      themes: [
        "dark",
        "cupcake",
      ],
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
      require("daisyui")
    ],
}