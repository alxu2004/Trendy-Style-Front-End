/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import '../assets/Styles.css'
export const ShoesCard = (props) => {
    
    const img = props.img
    const name = props.name
    const price = props.price
    const id = props.id

  return (
    <>
    <Link className='product' to={`/detail/${id}`}>
      <article className='productCard'>
        <section className=''>
            <img className='productImg' src={img} alt="" />
        </section>
        <section className='productContent'>
            <p>{name}</p>
            <p>{price}</p>
        </section>
      </article>
      </Link>
    </>
  )
}
