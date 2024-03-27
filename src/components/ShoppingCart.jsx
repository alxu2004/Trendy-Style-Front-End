import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'

export const ShoppingCart = () => {
  const {cart} = useContext(CartContext)

  const quantity = cart.reduce((accumulated, curr) => {
    return accumulated + curr.quantity
  }, 0)

  const totalPrice = cart.reduce((accumulated, curr)=>{
    return accumulated + curr.quantity * curr.price
  },0)
  return (
      <>
        <p>cantidad de productos {quantity}</p>
        <p>total{totalPrice}</p>
        <button onClick={()=> console.log(cart)} >mirar</button>
      </>
  )
}
