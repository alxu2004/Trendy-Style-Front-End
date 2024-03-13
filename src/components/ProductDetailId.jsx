import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';



export const ProductDetailId = () => {
    const location = useLocation();
    const [idToSearch, setIdToSearch] = useState('')
    const [productDetail, setProductDetail] = useState({})

    useEffect(() => {
        if(location) {
            let idUrl = location.pathname.slice(location.pathname.lastIndexOf("/") , location.pathname.length) ;
            setIdToSearch(idUrl.replace("/", ""))
        }
    }, [location])

    useEffect(() => {
        const searchDetailId = async () => {
              const detailId = await fetch(`http://localhost:8080/api/products/${idToSearch}`);
              const data = await detailId.json(); 
              return data;
              
          };

        if(idToSearch !== ''){
            searchDetailId().then(response => {
                setProductDetail(response)
                
            })
        }
    }, [idToSearch])
    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={6} md={7}>
          <Item>{productDetail.img}</Item>
        </Grid>
        <Grid xs={6} md={5}>
          <Item>
          <Card variant="outlined" sx={{ maxWidth: 600 , maxHeight: 600 }}>
      <Box sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" marginBottom={2}>
          <Typography gutterBottom variant="h2" component="div">
            {productDetail.name}
          </Typography>
          
        </Stack>
        <Typography color="text.primary" variant="h5" textAlign={"justify"} marginBottom={2}>
         {productDetail.detail}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography gutterBottom variant="body2">
          <Stack direction="row" spacing={2} justifyContent={"space-around"} marginBottom={2} marginTop={2}>
            <Button variant="contained" color="success">
              Comprar
            </Button>
            <Typography gutterBottom variant="h4" component="div">
            ${productDetail.price}
          </Typography>
          </Stack>
        </Typography>
        
      </Box>
    </Card>
          </Item>
        </Grid>
      </Grid>
    </Box>
  )
}
