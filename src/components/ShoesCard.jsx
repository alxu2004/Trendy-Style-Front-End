/* eslint-disable react/prop-types */
import {  NavLink } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export const ShoesCard = (props) => {
    
    const img = props.img
    const name = props.name
    const price = props.price
    const detail = props.detail
    const id = props.id

  return (
    <>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={img}
        title={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {detail}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{price}</Button>
        <Button component={NavLink} to={`/detail/${id}`} size="small">Ver mas</Button>
      </CardActions>
    </Card>

    {/* <Link to={`/detail/${id}`}>
      <article >
        <section >
            <img  src={img} alt="" />
        </section>
        <section >
            <p>{name}</p>
            <p>{price}</p>
        </section>
      </article>
      </Link> */}
    </>
  )
}
