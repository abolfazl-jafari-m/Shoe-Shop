/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './views/**/*.{html,js}',
        './public/**/*.{html,js}',
        './src/**/*.{html,js}'
    ],
    theme: {
        extend: {
            backgroundImage : {
                "onboard-bg" :"url('/public/assets/Images/onboarding-wall.png')"
            }
        },
    },
    plugins: [],
}

