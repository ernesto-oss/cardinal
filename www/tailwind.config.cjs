const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xsm: '480px'
      },
      zIndex: {
        background: '-5',
        behind: '-1'
      },
      fontFamily: {
        display: ['var(--font-neue-power)', ...fontFamily.sans],
        body: ['var(--font-neue-haas-grotesk)', ...fontFamily.sans],
        monospace: [...fontFamily.mono]
      },
      colors: {
        turquoise: '#35FFDB',
        sunglow: '#FFC635',
        'eletric-pink': '#F42A8B',
        'radical-red': '#FF3559',
        'chinese-black': '#00030a',
        'dark-gunmetal': '#171D26'
      }
    }
  },
  plugins: [
    function ({ addBase, theme }) {
      function extractColorVars(colorObj, colorGroup = '') {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey]
          const cssVariable =
            colorKey === 'DEFAULT'
              ? `--color${colorGroup}`
              : `--color${colorGroup}-${colorKey}`

          const newVars =
            typeof value === 'string'
              ? { [cssVariable]: value }
              : extractColorVars(value, `-${colorKey}`)

          return { ...vars, ...newVars }
        }, {})
      }

      addBase({
        ':root': extractColorVars(theme('colors'))
      })
    }
  ]
}
