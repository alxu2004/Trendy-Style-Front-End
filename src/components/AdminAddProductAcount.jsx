import { useState, useEffect } from 'react';
import { SideBarAdmin } from './SideBarAdmin';

export const AdminAddProductAcount = () => {
  const [brands, setBrands] = useState([]);
  const [categories , setCategories] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    img: '',
    detail: '',
    marca_id: '',
    category_id: ''
  });

  useEffect(() => {
    fetchBrands();
    fetchCategory()
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/marcas/todas');
      if (response.ok) {
        const data = await response.json();
        setBrands(data);
        console.log(data)
      } else {
        console.error('Error fetching brands:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };
  const fetchCategory = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/categories/all');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
        console.log(data)
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
    formDataToSend.append('img', formData.img); 
    formDataToSend.append('name', formData.name);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('marca_id', formData.marca_id);
    formDataToSend.append('category_id', formData.category_id);
    formDataToSend.append('detail', formData.detail);

    try {
      const response = await fetch('http://localhost:8080/api/products/create', {
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
            <label htmlFor="price">Precio:</label>
            <input type="number" id="price" name="price" min="0" step="0.01" value={formData.price} onChange={handleInputChange} required />
          </div>
          <div>
            <label htmlFor="img">Imagen:</label>
            <input type="file" id="img" name="img" accept="image/*" onChange={(event) => setFormData({...formData, img: event.target.files[0]})} required />
          </div>
          <div>
            <label htmlFor="detail">Detalle:</label>
            <input type="text" id="detail" name="detail" value={formData.detail} onChange={handleInputChange} required />
          </div>
          <div>
            <label htmlFor="marca_id">Marca:</label>
            <select id="marca_id" name="marca_id" value={formData.marca_id} onChange={handleInputChange} required>
              <option value="">Selecciona una marca</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>{brand.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="category_id">Categoria:</label>
            <select id="category_id" name="category_id" value={formData.category_id} onChange={handleInputChange} required>
              <option value="">Selecciona una categoria</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <button type="submit">Guardar</button>
        </form>
      </div>
    </div>
  );
};
