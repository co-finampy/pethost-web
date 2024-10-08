/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Inclua todos os arquivos JS/TS no diretório src
  ],
  theme: {
    extend: {
      colors: {
        background: 'rgb(255, 255, 255)', // Substitua pela cor desejada
        foreground: 'rgb(0, 0, 0)', // Substitua pela cor desejada
        border: 'rgb(220, 220, 220)', // Substitua pela cor desejada
        // Adicione outras cores conforme necessário
      },
    },
  },
  plugins: [],
}
