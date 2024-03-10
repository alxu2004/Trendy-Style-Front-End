
import { SideBarAdmin } from './SideBarAdmin';


export const AdminAddProductAcount = () => {
  return (
    <div className="user-profile">
        <SideBarAdmin/>
        <div className="profile-form">
      <h2>Agregar Producto</h2>
      <form >
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
          />
        </div>
        <div>
          <label htmlFor="email">precio:</label>
          <input
            type="text"
            id="email"
            name="file"
          />
        </div>
        <div>
          <label htmlFor="email">imagen:</label>
          <input
            type="file"
            id="email"
            name="file"
          />
        </div>
        <div>
          <label htmlFor="email">marca:</label>
          <input
            type="text"
            id="email"
            name="file"
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
    </div>  
  )
}
