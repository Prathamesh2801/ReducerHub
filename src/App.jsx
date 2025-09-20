import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ManageCart_S from './components/Shop/ManageCart_S'
import ManageCart_R from './components/Shop/ManageCart_R'
import Counter_S from './components/Shop/Counter_S'
import Counter_R from './components/Shop/Counter_R'
import FormReducer_R from './components/Shop/FormState_R'
import FormState_S from './components/Shop/FormState_S'
import Prac1 from './components/Practice/Prac1'
import { Toaster } from 'react-hot-toast'
export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <Routes>

        <Route path='/scounter' element={<Counter_S />} />
        <Route path='/rcounter' element={<Counter_R />} />

        <Route path='/sform' element={<FormState_S />} />
        <Route path='/rform' element={<FormReducer_R />} />

        <Route path='/scart' element={<ManageCart_S />} />
        <Route path='/rcart' element={<ManageCart_R />} />

        <Route path='/p1' element={<Prac1 />} />



      </Routes>
    </BrowserRouter>
  )
}
