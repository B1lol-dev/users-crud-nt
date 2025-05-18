"use client";

import Container from "@/components/helpers/Container";
import axios from "axios";
import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { IUserData } from "@/constants/interfaces";
import toast from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState<IUserData[]>([]);

  useEffect(() => {
    axios.get("/api/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  const handleDeleteUser = (userId: string) => {
    axios
      .delete(`api/users?userId=${userId}`)
      .then((res) => {
        toast.success(res.data.message);
        setUsers((prevUsers: IUserData[]) =>
          prevUsers.filter((user: IUserData) => user._id !== userId)
        );
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <section className="min-h-[85vh]">
      <Container>
        <div className="grid grid-cols-4 mt-4 gap-5">
          {users.map((user: IUserData) => (
            <UserCard
              user={user}
              key={user.regId}
              userId={user._id!}
              onDelete={handleDeleteUser}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default React.memo(Users);
