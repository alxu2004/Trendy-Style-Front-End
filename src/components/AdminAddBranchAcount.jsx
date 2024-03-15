import React, { useState } from 'react';
import { SideBarAdmin } from './SideBarAdmin';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';

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
      const response = await fetch('http://localhost:8080/api/marcas/guardar', {
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
  const inputFileRef = React.useRef(null);
  const handleButtonClick = () => {
    inputFileRef.current.click();
  };
  return (
    <>
      
      <SideBarAdmin />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card >
      <CardContent>
        <Typography style={{fontSize: 25, textAlign: 'center'}} color="text.secondary" gutterBottom>
          Crear Marca
        </Typography>
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent:'center' , alignItems:'center'}}>
        <div style={{ marginBottom: '20px' }}>
        <TextField
          label="Marca"
          variant="outlined"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          sx={{ height: '60px' }}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <Button onClick={handleButtonClick} variant="contained" component="label">
          Subir imagen
          <input
            type="file"
            name="img"
            onChange={handleInputChange}
            accept="image/*"
            style={{ display: 'none' }}
            ref={inputFileRef}
          />
        </Button>
      </div>
      <Button type="submit" variant="contained" color="primary">Crear</Button>
    </form>
      </CardContent>
    </Card>
    </div>
    </>
  );
};
