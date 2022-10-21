import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usersService from "../services/users";

const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    usersService.getUser(id).then((u) => setUser(u));
  }, []);

  if (!user) return;

  return (
    <div>
      <h2>{user.name || ""}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((b) => {
          return <li key={b.id}>{b.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default User;
