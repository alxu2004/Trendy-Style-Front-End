import { useEffect, useState } from 'react';

export const UsersList = () => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/user/list')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            // .then(data => setUser(data)) ❌ Tienes que validar la data que venga del backend
            .then((data) =>{
                if(Array.isArray(data)){
                    setUser(data);
                    return;
                }
                // render some error
            })
            .catch(error => console.error('Fetch error:', error));
    }, []);

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                    </tr>
                </thead>
                <tbody>
                    {user.length === 0 ? (
                        <tr>
                            <td>No hay Usuario</td>
                        </tr>
                    ) : (
                        user.map(userData => (
                            <tr key={userData.id}>
                                <th>{userData.id}</th>
                                <td>{userData.name}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};
