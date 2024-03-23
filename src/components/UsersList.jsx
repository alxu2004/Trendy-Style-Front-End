import { useEffect, useState } from 'react'

export const UsersList = () => {
  const [user, setUser] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/auth/list')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      // .then(data => setUser(data)) ❌ Tienes que validar la data que venga del backend
      .then((data) => {
        if (Array.isArray(data)) {
          setUser(data)
        }
        // render some error
      })
      .catch((error) => console.error('Fetch error:', error))
  }, [])

  return (
    <div className='backTable'>
      <table className='table'>
        <thead>
          <tr className='titleTable'>
            <th>id</th>
            <th>name</th>
            <th>email</th>
          </tr>
        </thead>
        <tbody>
          {user.length === 0 ? (
            <tr className='contentTable'>
              <td>No hay Usuario</td>
              <td>No hay Usuario</td>
              <td>No hay Usuario</td>
            </tr>
          ) : (
            user.map((userData) => (
              <tr className='contentTable' key={userData.id}>
                <th>{userData.id}</th>
                <td>{userData.name}</td>
                <td>{userData.email}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
