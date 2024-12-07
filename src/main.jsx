import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ThemeProvider from "./Theme";
import { RouterProvider } from 'react-router-dom'
import router from './Routes/routes'
import AuthProvider from './AuthProvider'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
    <AuthProvider>
    <RouterProvider router={router}>
    </RouterProvider>
    </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
