import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
   allowedHosts: [
      'fad01e9c4358.ngrok-free.app',  
      ],
    port: 5204
  }
})
