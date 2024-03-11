import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


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
              const detailId = await fetch(`http://localhost:8080/api/v1/producto/${idToSearch}`);
              const data = await detailId.json(); 
              return data;
              
          };

        if(idToSearch !== ''){
            searchDetailId().then(response => {
                setProductDetail(response)
                
            })
        }
    }, [idToSearch])
  return (
    <>
    <div>ID {productDetail.id}</div>
    <div>Nombre {productDetail.name}</div>
    <div>Precio {productDetail.price}</div>
    
    </>
  )
}
