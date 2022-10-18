/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        './node_modules/tw-elements/dist/js/**/*.js'
    ],
    theme: {
        fontFamily: {
            sans: ['Poppins', 'sans-serif'],
        },
        extend: {
            screens: {
                'xs': {'min': '320px', 'max': '639px'}
            },
            spacing: {
                '40pct': '40%',
                '50pct': '50%',
                '60pct': '60%',
                '70pct': '70%',
                '80pct': '80%'
            },
            fontFamily: {
                'primary': ['Poppins', 'sans-serif'],
                'headings': ['Montserrat', 'sans-serif']
            },
            colors: {
                primary: {
                    50: '#EBE9FE',
                    100: '#DEDBFD',
                    200: '#BEB7FB',
                    300: '#9C92F8',
                    400: '#7B6EF6',
                    500: '#5A4AF4',
                    600: '#483BC3',
                    700: '#483BC3',
                    800: '#251E62',
                    900: '#120F31'
                },
                secondary: {
                    50: '#E4F4FF',
                    100: '#D2ECFE',
                    200: '#20283E',
                    300: '#78C8FD',
                    400: '#4BB7FD',
                    500: '#1EA5FC',
                    600: '#1884CA',
                    700: '#126297',
                    800: '#0C4265',
                    900: '#062032'
                },
                tertary: {
                    50: '#F6EDFF',
                    100: '#F0E2FF',
                    200: '#E2C5FF',
                    300: '#D3A7FF',
                    400: '#C58AFF',
                    500: '#B66DFF',
                    600: '#9257CC',
                    700: '#6D4199',
                    800: '#492C66',
                    900: '#241633'
                },
                grey: {
                    50: '#EBEEF5',
                    100: '#C3C8D4',
                    200: '#A8AEBF',
                    300: '#8E95A9',
                    400: '#767E94',
                    500: '#61697F',
                    600: '#475069',
                    700: '#323B54',
                    800: '#20283E',
                    900: '#121829'
                },
                success: {
                    50: '#E1F9F2',
                    100: '#CDF5E9',
                    200: '#9BEBD3',
                    300: '#69E2BD',
                    400: '#37D8A7',
                    500: '#05CE91',
                    600: '#04A574',
                    700: '#04A574',
                    800: '#02523A',
                    900: '#01291D'
                },
                error: {
                    50: '#FFECEC',
                    100: '#FFDFDF',
                    200: '#FFC0C0',
                    300: '#FFA0A0',
                    400: '#FF8181',
                    500: '#FF6161',
                    600: '#CC4E4E',
                    700: '#993A3A',
                    800: '#662727',
                    900: '#331313'
                },
                warning: {
                    50: '#FFF5E9',
                    100: '#FFEFDB',
                    200: '#FFDEB6',
                    300: '#FFCE92',
                    400: '#FFBD6D',
                    500: '#FFAD49',
                    600: '#CC8A3A',
                    700: '#99682C',
                    800: '#66451D',
                    900: '#33230F'
                }
            }
        }
    },
    plugins: [require('tw-elements/dist/plugin')],
}
