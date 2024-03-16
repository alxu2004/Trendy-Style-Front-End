import { useState, useEffect } from 'react';
import { SideBarAdmin } from './SideBarAdmin';
import { Card, CardContent, Button, Typography, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Swal from 'sweetalert2';

export const AdminAddProductAcount = () => {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
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
    fetchCategories();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/marcas/todas');
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

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/categories/all');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error('Error fetching categories:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const showAlert = () => {
    Swal.fire({
      icon: 'success',
      title: '¡Creado!',
      text: 'Su producto se creo satisfactoriamente',
    });
  };
  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      img: event.target.files[0]
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
        showAlert()

      } else {
        alert('Error al agregar producto:');
        console.error('Error al agregar producto:', response.statusText);
      }
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };

  return (
    <>
      <SideBarAdmin />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Card style={{ maxWidth: '400px', margin: 'auto' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>Agregar Producto</Typography>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
              <TextField
                label="Nombre"
                variant="outlined"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                style={{ marginBottom: '10px' }}
                required
              />
              <TextField
                label="Precio"
                variant="outlined"
                type="number"
                name="price"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleInputChange}
                style={{ marginBottom: '10px' }}
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ marginBottom: '10px' }}
                required
              />
              <TextField
                label="Detalle"
                variant="outlined"
                type="text"
                name="detail"
                value={formData.detail}
                onChange={handleInputChange}
                style={{ marginBottom: '10px' }}
                required
              />
              <FormControl style={{ marginBottom: '10px' }}>
                <InputLabel>Marca</InputLabel>
                <Select
                  value={formData.marca_id}
                  onChange={handleInputChange}
                  name="marca_id"
                  required
                >
                  <MenuItem value="">Selecciona una marca</MenuItem>
                  {brands.map((brand) => (
                    <MenuItem key={brand.id} value={brand.id}>{brand.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl style={{ marginBottom: '10px' }}>
                <InputLabel>Categoría</InputLabel>
                <Select
                  value={formData.category_id}
                  onChange={handleInputChange}
                  name="category_id"
                  required
                >
                  <MenuItem value="">Selecciona una categoría</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button type="submit" variant="contained" color="primary">Guardar</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
