import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

const rootElement = document.getElementById('root')
if (!rootElement) {
  console.error('Failed to find the root element')
  throw new Error('Failed to find the root element')
}

const root = createRoot(rootElement)

try {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
} catch (error) {
  console.error('Error rendering the app:', error)
  rootElement.innerHTML = `
    <div style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      text-align: center;
      font-family: system-ui, -apple-system, sans-serif;
    ">
      <h1 style="color: #4F46E5; margin-bottom: 1rem;">Something went wrong</h1>
      <p style="color: #6B7280; margin-bottom: 1rem;">We're having trouble loading the application.</p>
      <button 
        onclick="window.location.reload()" 
        style="
          background: #4F46E5;
          color: white;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 0.375rem;
          cursor: pointer;
        "
      >
        Reload Page
      </button>
    </div>
  `
}
