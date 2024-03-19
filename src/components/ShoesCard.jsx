/* eslint-disable react/prop-types */
import {  NavLink } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';


export const ShoesCard = (props) => {
    
    const img = props.img
    const name = props.name
    const price = props.price
    const id = props.id
     
   
  return (
    <>
    <Card sx={{ maxWidth: 300}}>
      <CardMedia
        sx={{ height: 150 }}
        image={img}
        title={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h7" component="div" textAlign='center'>
          {name}
        </Typography>
      </CardContent>
      <Divider/>
      <CardActions>
        <Button style={{fontWeight:'1000', fontSize:'18px', color:'black'}} size="large" disabled >{price} COP</Button>
        <Button style={{marginLeft:'5px'}} variant='contained' component={NavLink} to={`/detail/${id}`} size="small">Ver mas</Button>
      </CardActions>
    </Card>
    </>
  )
}
