import { useState } from 'react';
import { SideBarAdmin } from './SideBarAdmin';

export const AdminAddBranchAcount = () => {
  const [formData, setFormData] = useState({
    name: '',
    img: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('img', formData.img);

    try {
      const response = await fetch('http://localhost:8080/api/v1/marca/guardar', {
        method: 'POST',
        body: formDataToSend,

      });

      if (!response.ok) {
        throw new Error('Error al agregar la marca');
      }
      
      alert('Marca agregada correctamente');

     
      setFormData({
        name: '',
        img: null,
      });

    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al agregar la marca');
    }
  };

  return (
    <div className="user-profile">
      <SideBarAdmin />
      <div className="profile-form">
        <h2>Agregar marca</h2>
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
          <div>
            <label htmlFor="img">Imagen:</label>
            <input
              type="file"
              name="img"
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Guardar</button>
        </form>
      </div>
    </div>
  );
};
