import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './context/StoreContext.jsx'

// it was <React.StrictMode> before then it was changed to <browse-router> to enable react router support in our app
// <StoreContextProvider> to use the store context provider from react // to support the store context provider

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>

  </BrowserRouter>

)
