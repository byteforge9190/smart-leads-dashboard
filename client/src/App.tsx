import './App.css'
import QueryProvider from './lib/QueryProvider'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ProtectedRoutePath, PublicRoutePath } from './components/RoutePath'

function App() {

  return (
    <QueryProvider>
      <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500',
          },
          success: {
            style: {
              background: '#f0fdf4',
              color: '#166534',
              border: '1px solid #bbf7d0',
            },
            iconTheme: { primary: '#22c55e', secondary: '#f0fdf4' },
          },
          error: {
            style: {
              background: '#fef2f2',
              color: '#991b1b',
              border: '1px solid #fecaca',
            },
            iconTheme: { primary: '#ef4444', secondary: '#fef2f2' },
          },
        }}
      />
      <Routes>
        <Route element={<PublicRoutePath />}>

        </Route>
        <Route element={<ProtectedRoutePath />}>

        </Route>
      </Routes>
      </BrowserRouter>
    </QueryProvider>
  )
}

export default App
