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
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { TextField } from "@mui/material";

export const AdminDropCategoryAcount = () => {
    const [formData, setFormData] = useState({
        name: '',
    });
    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    useEffect(() => {
        ListCategories();
    }, []);

    const ListCategories = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/categories/all')
            if (response.ok) {
                const data = await response.json();
                setCategories(data)

            } else {
                console.error('Error fetching products:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    const handleOpen = (id) => {
        setSelectedCategoryId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deletedCategories = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/categories/delete/${id}`, {
                method: 'DELETE'
            })
            if (!response.ok) {
                throw new Error('error al eliminar')
            }
            alert('Categoria eliminada')
            ListCategories(); // Actualiza la lista después de eliminar
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch(`http://localhost:8080/api/categories/update/${selectedCategoryId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Error al actualizar la categoría');
            }

            alert('Categoría actualizada correctamente');

            setFormData({
                name: ''
            });

            setOpen(false); // Cerrar el modal después de actualizar
            ListCategories(); // Actualiza la lista después de actualizar

        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al actualizar la categoría');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <>
            <SideBarAdmin />
            <div style={{marginLeft: "5%" , marginRight: "5%"}}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="right">Nombre</TableCell>
                                <TableCell align="center">Funcion</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map((row) => (
                                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">{row.id}</TableCell>
                                    <TableCell align="right">{row.name}</TableCell>
                                    <TableCell align="center" >
                                        <Stack direction="row" spacing={2} alignItems="center" sx={{ marginLeft: '22%' }} >
                                            <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => deletedCategories(row.id)} >
                                                Eliminar
                                            </Button>
                                            <Button variant="contained" endIcon={<CreateIcon />} onClick={() => handleOpen(row.id)}>
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
                    open={open}
                    onClose={handleClose}
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
                        <h2 style={{ textAlign: "center" }}>Actualizar Categoría</h2>
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
                            <Button type="submit" variant="contained" color="primary">Actualizar</Button>
                        </form>
                    </Box>
                </Modal>
            </div>
        </>
    );
};
