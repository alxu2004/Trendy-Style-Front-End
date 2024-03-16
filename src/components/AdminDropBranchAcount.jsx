import { useEffect, useState } from "react"
import { SideBarAdmin } from "./SideBarAdmin"
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


export const AdminDropBranchAcount = () => {
    const [branches, setBranches] = useState([])


    useEffect(() => {
        ListBranches();
    }, [branches]);

    const ListBranches = async () =>{
        try{
            const response = await fetch('http://localhost:8080/api/marcas/todas')
            if (response.ok) {
                const data = await response.json();
                setBranches(data)

            }else {
                console.error('Error fetching products:', response.statusText);
            }
        }catch (error) {
            console.error('Error fetching products:', error);
        }
    }
    const deletedBranch = async (id)=>{
        try{
            console.log(id)
            const response = await fetch(`http://localhost:8080/api/marcas/eliminar/${id}`,{
                method: 'DELETE'
            })
            if(!response.ok){
                throw new Error('error al eliminar')

            }
            alert('marca eliminada')
        }catch(error){
            console.error('Error:', error);
        }
    }
    

  return (
    <>
        
        <SideBarAdmin/>
        <div className="user-profile">
        <TableContainer component={Paper} >
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
                                    <Button variant="contained" color="error" startIcon={<DeleteIcon /> } onClick={() => deletedBranch(row.id)} >
                                        Eliminar
                                    </Button>
                                    <Button variant="contained" endIcon={<CreateIcon />}>
                                        Editar
                                    </Button>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    </>
  )
}
