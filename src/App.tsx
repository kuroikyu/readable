import { Route, Routes } from 'react-router'
import { Provider } from 'react-redux'

import { store } from "./store"
import Login from './pages/login'

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/login' element={<Login />} />
      </Routes>
    </Provider>
  )
}

export default App
