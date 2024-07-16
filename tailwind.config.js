/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"]
      },
      colors: {
        primary: '#11175D',
        secoundry: '#EA6C00'
      },
      maxWidth: {
        'container': '1144px',
      },
      backgroundImage: {
        registrationImg: "url('https://i.ibb.co/hYXvTnG/registration-Img1.jpg')",
        loginImg: "url('https://i.ibb.co/WF6xqch/login-Img1.jpg')",
        ForgotImg: "url('https://i.ibb.co/Y0D8b9X/registration-Img2.jpg')"
      }
    },//https://i.ibb.co/WF6xqch/login-Img1.jpg https://i.ibb.co/Y0D8b9X/registration-Img2.jpg
  },
  plugins: [],
}