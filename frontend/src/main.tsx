import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import StoreRedux from './store/store.ts'

const store = new StoreRedux();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store.filestore}>
    <App />
    </Provider>
  </React.StrictMode>,
)
