import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Access } from "./pages/Access"
import { Men } from "./pages/Men"
import { Women } from "./pages/Women"
import { Child } from "./pages/Child"
import { Profile } from "./pages/Profile"
import { ProfileEditAcount } from "./pages/ProfileEditAcount"
import { ProfileMyAcount } from './pages/ProfileMyAcount';
import { ProfileAddAcount } from './pages/ProfileAddAcount';
import { UsersList } from "./components/UsersList"


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/Access' Component={Access} />
        <Route path='/men' Component={Men} />
        <Route path='/women' Component={Women}/>
        <Route path='/child' Component={Child} />
        <Route path="/profile" Component={Profile}  />
        <Route path="/user-list" Component={UsersList}/>
        <Route path="/profile/my-acount" Component={ProfileMyAcount}/>
        <Route path="/profile/add-acount" Component={ProfileAddAcount}/>
        <Route path="/profile/edit-acount" Component={ProfileEditAcount}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
