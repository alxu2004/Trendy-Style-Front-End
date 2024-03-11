import { useState, useEffect } from 'react';
import { SideBarAdmin } from './SideBarAdmin';

export const AdminAddProductAcount = () => {
  const [brands, setBrands] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    precio: '',
    img: '',
    marcaId: ''
  });

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/marca/todas');
      if (response.ok) {
        const data = await response.json();
        setBrands(data);
      } else {
        console.error('Error fetching brands:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('img', formData.img); // Cambio en la forma de agregar el archivo
    formDataToSend.append('name', formData.name);
    formDataToSend.append('precio', formData.precio);
    formDataToSend.append('marcaId', formData.marcaId);

    try {
      const response = await fetch('http://localhost:8080/api/v1/producto/registrar', {
        method: 'POST',
        body: formDataToSend
      });
      if (response.ok) {
        alert('Producto agregado exitosamente');
        console.log('Producto agregado exitosamente');
      } else {
        alert('Error al agregar producto:');
        console.error('Error al agregar producto:', response.statusText);
      }
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };

  return (
    <div className="user-profile">
      <SideBarAdmin />
      <div className="profile-form">
        <h2>Agregar Producto</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nombre:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div>
            <label htmlFor="precio">Precio:</label>
            <input type="number" id="precio" name="precio" min="0" step="0.01" value={formData.precio} onChange={handleInputChange} required />
          </div>
          <div>
            <label htmlFor="img">Imagen:</label>
            <input type="file" id="img" name="img" accept="image/*" onChange={(event) => setFormData({...formData, img: event.target.files[0]})} required />
          </div>
          <div>
            <label htmlFor="marcaId">Marca:</label>
            <select id="marcaId" name="marcaId" value={formData.marcaId} onChange={handleInputChange} required>
              <option value="">Selecciona una marca</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>{brand.name}</option>
              ))}
            </select>
          </div>
          <button type="submit">Guardar</button>
        </form>
      </div>
    </div>
  );
};
