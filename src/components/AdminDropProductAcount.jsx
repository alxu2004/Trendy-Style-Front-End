import { useEffect, useState } from "react";
import { SideBarAdmin } from "./SideBarAdmin";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import CreateIcon from '@mui/icons-material/Create';
import { Modal, Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export const AdminDropProductAcount = () => {
    const [products, setProducts] = useState([]);
    const [openModal, setOpenModal] = useState(false);
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
    const [editingProductId, setEditingProductId] = useState(null);
  
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
  
    const handleFileChange = (event) => {
      setFormData({
        ...formData,
        img: event.target.files[0]
      });
    };


    useEffect(() => {
        ListProducts();
    }, [products]);

    const ListProducts = async () =>{
        try{
            const response = await fetch('http://localhost:8080/api/products/all');
            if (response.ok) {
                const data = await response.json();
                setProducts(data);

            }else {
                console.error('Error fetching products:', response.statusText);
            }
        }catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    const deletedProduct = async (id)=>{
        try{
            console.log(id);
            const response = await fetch(`http://localhost:8080/api/products/delete/${id}`,{
                method: 'DELETE'
            });
            if(!response.ok){
                throw new Error('error al eliminar');
            }
            alert('producto eliminada');
        }catch(error){
            console.error('Error:', error);
        }
    }

    const handleOpenModal = (row) => {
        setEditingProductId(row.id);
        setOpenModal(true);
        // Limpiar los datos anteriores del formulario
        setFormData({
            name: '',
            price: '',
            img: '',
            detail: '',
            marca_id: '',
            category_id: ''
        });
    };

    const handleCloseModal = () => {
        setOpenModal(false);
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
          const response = await fetch(`http://localhost:8080/api/products/update/${editingProductId}`, {
            method: 'PUT',
            body: formDataToSend
          });
          if (response.ok) {
            alert('Producto actualizado exitosamente');
            console.log('Producto actualizado exitosamente');
            handleCloseModal(); // Cerrar el modal después de enviar la actualización
          } else {
            alert('Error al actualizar producto:');
            console.error('Error al actualizar producto:', response.statusText);
          }
        } catch (error) {
          console.error('Error al actualizar producto:', error);
        }
      };

    return (
        <>
            <SideBarAdmin/>
            <div style={{marginLeft: "5%" , marginRight: "5%"}}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="right">Nombre</TableCell>
                                <TableCell align="right">Imagen</TableCell>
                                <TableCell align="center">Funcion</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((row) => (
                                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">{row.id}</TableCell>
                                    <TableCell align="right">{row.name}</TableCell>
                                    <TableCell align="right"><img width={40} src={`data: image/jpeg;base64,${row.img} `} /></TableCell>
                                    <TableCell align="center" >
                                        <Stack direction="row" spacing={2} alignItems="center" sx={{ marginLeft: '22%' }} >
                                            <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => deletedProduct(row.id)}>
                                                Eliminar
                                            </Button>
                                            <Button variant="contained" endIcon={<CreateIcon />} onClick={() => handleOpenModal(row)}>
                                                Editar
                                            </Button>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{
                        position: 'absolute',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '20px'
                    }}>
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
                    </Box>
                </Modal>
            </div>
        </>
    )
}
