import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

export const Santiago = () => {

    const location = useLocation();
    const [idToSearch, setIdToSearch] = useState('')
    const [productDetail, setProductDetail] = useState<any>({})
    
    useEffect(() => {
        if(location) {
            let idUrl = location.pathname.slice(location.pathname.lastIndexOf("/") , location.pathname.length) ;
            setIdToSearch(idUrl.replace("/", ""))
        }
    }, [])

    


    useEffect(() => {
        const totest = async () => {
              const test = await fetch(`http://localhost:8080/api/v1/producto/${idToSearch}`);
              const data = await test.json(); 
              console.log(data);
              return data;
          };

        if(idToSearch !== ''){
            totest().then(response => {
                setProductDetail(response)
                
            })
        }
    }, [idToSearch])
    

  return (
    <>
    <div>ID {productDetail?.id}</div>
    <div>Nombre {productDetail?.name}</div>
    <div>Precio {productDetail?.price}</div>
    <div>Marca {productDetail?.marca?.name}</div>
    </>
  )
}
