import { Route, Routes } from 'react-router'
import { Provider } from 'react-redux'

import { store } from "./store"
import Login from './pages/login'
import Signup from './pages/signup'

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </Provider>
  )
}

export default App
