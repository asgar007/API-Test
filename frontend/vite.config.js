import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // server:{
  //   proxy:{
  //     '/api': 'https://rziseb1dqi.execute-api.us-east-1.amazonaws.com/Dev'
  //   }
  // },
  plugins: [react()],
})
