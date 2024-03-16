import { useEffect, useRef, useState } from "react";
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

export const AdminDropBranchAcount = () => {
    const [branches, setBranches] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedBranchId, setSelectedBranchId] = useState(null);

    useEffect(() => {
        ListBranches();
    }, []);

    const ListBranches = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/marcas/todas');
            if (response.ok) {
                const data = await response.json();
                setBranches(data);
            } else {
                console.error('Error fetching products:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleOpen = (id) => {
        setSelectedBranchId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deletedBranch = async (id) => {
        try {
            console.log(id);
            const response = await fetch(`http://localhost:8080/api/marcas/eliminar/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('error al eliminar');
            }
            alert('marca eliminada');
            ListBranches(); // Actualiza la lista después de eliminar
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSubmit = async () => {
        if (!selectedBranchId) return;
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('img', formData.img);

        try {
            const response = await fetch(`http://localhost:8080/api/marcas/actualizar/${selectedBranchId}`, {
                method: 'PUT',
                body: formDataToSend,
            });

            if (!response.ok) {
                throw new Error('Error al actualizar la marca');
            }

            alert('Marca actualizada correctamente');
            handleClose(); // Cierra el modal después de actualizar
            ListBranches(); // Actualiza la lista después de editar
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al actualizar la marca');
        }
    };

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

    const inputFileRef = useRef(null);
    const handleButtonClick = () => {
        inputFileRef.current.click();
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
                                <TableCell align="right">Imagen</TableCell>
                                <TableCell align="center">Funcion</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {branches.map((row) => (
                                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">{row.id}</TableCell>
                                    <TableCell align="right">{row.name}</TableCell>
                                    <TableCell align="right"><img width={40} src={`data: image/jpeg;base64,${row.img} `} /></TableCell>
                                    <TableCell align="center" >
                                        <Stack direction="row" spacing={2} alignItems="center" sx={{ marginLeft: '22%' }} >
                                            <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => deletedBranch(row.id)} >
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
                        <h2 style={{ textAlign: "center" }}>Actualizar Marca</h2>
                        <form style={{ maxWidth: '400px', margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
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
                                </Button>
                            </div>
                            <Button type="button" variant="contained" color="primary" onClick={handleSubmit}>Actualizar</Button>
                        </form>
                        <input
                            type="file"
                            name="img"
                            onChange={handleInputChange}
                            accept="image/*"
                            style={{ display: 'none' }}
                            ref={inputFileRef}
                        />
                    </Box>
                </Modal>
            </div>
        </>
    );
};
