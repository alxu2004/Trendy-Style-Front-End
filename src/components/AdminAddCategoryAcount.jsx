import { useState } from "react";
import { SideBarAdmin } from './SideBarAdmin';


export const AdminAddCategoryAcount = () => {

    const [formData, setFormData] = useState({
        name: '',
      });
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        
    
        try {
          const response = await fetch('http://localhost:8080/api/categories/create', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(formData)
    
          });
    
          if (!response.ok) {
            throw new Error('Error al agregar la categoria');
          }
          
          alert('Categoria agregada correctamente');
    
         
          setFormData({
            name: ''
          });
    
        } catch (error) {
          console.error('Error:', error);
          alert('Hubo un error al agregar la categoria');
        }
      };
  return (
    <div className="user-profile">
      <SideBarAdmin />
      <div className="profile-form">
        <h2>Agregar categoria</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Guardar</button>
        </form>
      </div>
    </div>
  )
}
