import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
   allowedHosts: [
      '30bbd39d70e6.ngrok-free.app',  
      ],
    port: 5204
  }
})
