import React from 'react'
import { Client as Styletron } from "styletron-engine-monolithic";
import { Provider as StyletronProvider } from "styletron-react";
import { createTheme, BaseProvider } from "baseui";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const engine = new Styletron();

const theme = createTheme({
  colors:{
    primary:"rgb(0, 55, 129)",
    secondary:"#036cd5"
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <StyletronProvider value={engine}>
    <BaseProvider theme={theme}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BaseProvider>
  </StyletronProvider>,
)
