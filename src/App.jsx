import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Access } from "./pages/Access"
import { Men } from "./pages/Men"
import { Women } from "./pages/Women"
import { Child } from "./pages/Child"
import { Profile } from "./pages/Profile"
import { ProfileEditAcount } from "./components/ProfileEditAcount"
import { ProfileMyAcount } from './components/ProfileMyAcount';
import { ProfileAddAcount } from './components/ProfileAddAcount';
import { UsersList } from "./components/UsersList"
import { Admin } from "./pages/Admin"
import { AdminAddBranchAcount } from "./components/AdminAddBranchAcount"
import { AdminAddProductAcount } from "./components/AdminAddProductAcount"
import { ProductDetailId } from './components/ProductDetailId';



function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/detail/:id" element={<ProductDetailId/>} />
        <Route path='/Access' element={<Access/>} />
        <Route path='/men' element={<Men/>} />
        <Route path='/women' element={<Women/>}/>
        <Route path='/child' element={<Child/>} />
        <Route path="/profile" element={<Profile/>}  />
        <Route path="/user-list" element={<UsersList/>}/>
        <Route path="/admin" element={<Admin/>} />
        <Route path="/admin/add-branch" element={<AdminAddBranchAcount/>} />
        <Route path="/admin/add-product" element={<AdminAddProductAcount/>} />
        <Route path="/profile/my-acount" element={<ProfileMyAcount/>}/>
        <Route path="/profile/add-acount" element={<ProfileAddAcount/>}/>
        <Route path="/profile/edit-acount" element={<ProfileEditAcount/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
