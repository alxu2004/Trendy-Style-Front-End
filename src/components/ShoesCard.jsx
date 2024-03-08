/* eslint-disable react/prop-types */
import '../assets/Styles.css'
export const ShoesCard = (props) => {
    
    const img = props.img
    const name = props.name
    const price = props.price


  return (
    <a className='product' href="">
      <article className='productCard'>
        <section className=''>
            <img className='productImg' src={img} alt="" />
        </section>
        <section className='productContent'>
            <p>{name}</p>
            <p>{price}</p>
        </section>
      </article>
    </a>
  )
}
