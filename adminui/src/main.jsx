import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Loading from './components/loading/index.jsx'

createRoot(document.getElementById('root')).render(
  
    <Suspense fallback={<Loading/>}>
      <App />
    </Suspense>
  
)
