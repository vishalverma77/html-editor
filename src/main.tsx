import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
 import App from './App.tsx'
import EmailBuilderDemo from './email/view/email.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <EmailBuilderDemo />
  </StrictMode>,
)
