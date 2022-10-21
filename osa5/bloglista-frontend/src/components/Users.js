import React, { useEffect, useState } from "react";
import userService from "../services/users";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getUsers().then((res) => {
      setUsers(res);
    });
  }, []);

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2 style={{ marginBottom: "10px" }}>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <a href={`/users/${user.id}`}>{user.name}</a>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
