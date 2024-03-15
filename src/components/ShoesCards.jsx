/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { ShoesCard } from "./ShoesCard";
import '../assets/Styles.css';
import PropTypes from 'prop-types';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';


export const ShoesCards = ({ searchResults, section }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/products/all');
            if (response.ok) {
                const data = await response.json();
                const productsWithImages = data.map(product => ({
                    ...product,
                    img: `data:image/jpeg;base64,${product.img}`
                }));
                setProducts(productsWithImages);
            } else {
                console.error('Error fetching products:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const productsToDisplay = searchResults.length > 0 ? searchResults : products;
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
    return (

        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 1 }} columns={{ xs: 4, sm: 10, md: 20 }} ref={section}>
        {productsToDisplay.map((product, index) => (
          <Grid xs={1} sm={4} md={4} key={index}>
            <Item>
            <ShoesCard
                key={product.id}
                name={product.name}
                img={product.img}
                price={product.price}
                id={product.id}
                    />
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
    );
};

ShoesCards.propTypes = {
    searchResults: PropTypes.array.isRequired
};
