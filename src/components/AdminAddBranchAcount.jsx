import { useContext, useState } from 'react';
import { SideBarAdmin } from './SideBarAdmin';
import { UserContext } from '../context/UserContext';

export const AdminAddBranchAcount = () => {

  const {user} = useContext(UserContext)

  const [addDataBranch, setAddDataBranch] = useState({
    name: '',
    img: '',
  });

  const handleAddBranchChange = (e) => {
    const { name, value } = e.target;
    setAddDataBranch(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddBranchSubmit = (e) => {
    e.preventDefault();

    const token = user.token ; 

    fetch('http://localhost:8080/api/v1/marca/guardar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(addDataBranch)
    })
      .then(response => {
        if (!response.ok) {
          alert('Error al agregar la marca');
          throw new Error('Network response was not ok');
        } else {
          alert('Se ha registrado correctamente');
          setAddDataBranch({
            name: '',
            img: '',
          });
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
        alert('Error al agregar marca');
      });
  };

  return (
    <div className="user-profile">
      <SideBarAdmin />
      <div className="profile-form">
        <h2>Agregar marca</h2>
        <form onSubmit={handleAddBranchSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={addDataBranch.name}
              onChange={handleAddBranchChange}
            />
          </div>
          <div>
            <label htmlFor="email">imagen:</label>
            <input
              type="file"
              name="img"
              value={addDataBranch.img}
              onChange={handleAddBranchChange}
            />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  )
}
