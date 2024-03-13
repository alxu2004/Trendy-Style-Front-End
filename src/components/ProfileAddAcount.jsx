import { useState } from 'react';
import { SideBarProfile } from './SideBarProfile';

export const ProfileAddAcount = () => {

  const [formData, setFormData] = useState({
    lastname: '',
    cc: '',
    num_cel: '',
    city_of_residence: '',
    address: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('lastname', formData.lastname); // Cambio en la forma de agregar el archivo
    formDataToSend.append('cc', formData.cc);
    formDataToSend.append('num_cel', formData.num_cel);
    formDataToSend.append('city_of_residence', formData.city_of_residence);
    formDataToSend.append('address', formData.address);

    try {
      const response = await fetch('http://localhost:8080/api/infoUsers/registrar', {
        method: 'POST',
        body: formDataToSend
      });
      if (response.ok) {
        alert('Producto agregado exitosamente');
        console.log('Producto agregado exitosamente');
      } else {
        alert('Error al agregar producto:');
        console.error('Error al agregar producto:', response.statusText);
      }
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };
  

  return (
    <div className="user-profile">
      <SideBarProfile/>
      <div className="profile-form">
        <h2>Edit Profile</h2>
          <form  onSubmit={handleSubmit}>
            <div>
              <label htmlFor="lastname"> segundo nombre:</label>
              <input
                type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleInputChange} required 
              />
            </div>
            <div>
              <label htmlFor="cc"> documento de identidad:</label>
              <input
                type="text" id="cc" name="cc" value={formData.cc} onChange={handleInputChange} required 
              />
            </div>
            <div>
              <label htmlFor="num_cel"> numero de celular:</label>
              <input
                type="tel" id="num_cel" name="num_cel" value={formData.num_cel} onChange={handleInputChange} required 
              />
            </div>
            <div>
              <label htmlFor="city_of_residence"> ciudad de recidencia:</label>
              <input
                type="text" id="city_of_residence" name="city_of_residence" value={formData.city_of_residence} onChange={handleInputChange} required 
              />
            </div>
            <div>
              <label htmlFor="address"> direccion:</label>
              <input
                type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} required 
              />
            </div>
            <button type="submit">enviar</button>
          </form>
      </div>
    </div>  
  )
}
