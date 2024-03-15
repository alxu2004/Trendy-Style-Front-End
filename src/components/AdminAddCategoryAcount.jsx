import { useState } from "react";
import { SideBarAdmin } from './SideBarAdmin';
import { Card, CardContent, Button, Typography, TextField } from '@mui/material';

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
    <>
      <SideBarAdmin />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card style={{ maxWidth: '400px' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>Agregar categoría</Typography>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
              <TextField
                label="Nombre"
                variant="outlined"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                style={{ marginBottom: '20px' }}
              />
              <Button type="submit" variant="contained" color="primary">Guardar</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
