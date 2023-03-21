import '@/styles/reset.less'
import '@/styles/common.less'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store, persistor } from '@/redux'
import { PersistGate } from 'redux-persist/integration/react'
import App from '@/App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)
