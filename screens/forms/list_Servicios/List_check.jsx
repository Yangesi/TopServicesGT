import React, { useEffect, useState } from 'react';
import { getUser } from '../../../helpers/getUser'



export const List_check = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const obtenerUsers = async () => {
      const data = await getUser();
      setUsers(data);
    };
    obtenerUsers();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      {users.map((user) => (
        <div key={user.id}>
          <p>Id: {user.id}</p>
          <p>Name: {user.name}</p>
        </div>
      ))}
    </div>
  );
};





