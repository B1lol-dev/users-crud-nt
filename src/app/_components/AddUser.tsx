"use client";

import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Container from "@/components/helpers/Container";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

const AddUser = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section>
      <Container className="flex items-center justify-between">
        <h1 className="text-2xl">User Managment</h1>
        <Button onClick={() => setShowModal((prev) => !prev)}>
          Add User <Plus />
        </Button>
      </Container>

      {showModal && <AddUserModal setShowModal={setShowModal} />}
    </section>
  );
};

interface IAddUserModalProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

function AddUserModal({ setShowModal }: IAddUserModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [regId, setRegId] = useState(0);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleAddUser = (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords should be identical!");
      // const newUser = {};
    }
  };

  return (
    <form
      className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white p-5 border rounded-md flex flex-col gap-3"
      onSubmit={(e) => handleAddUser(e)}
    >
      <h2>Add User</h2>
      <button
        type="button"
        onClick={() => {
          setShowModal(false);
        }}
      >
        <X className="absolute top-5 right-5" />
      </button>
      <div className="flex gap-5">
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Full name"
            required
            value={fullName}
            minLength={2}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Input
            placeholder="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            required
            value={password}
            minLength={4}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Phone number"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Input
            placeholder="Registry Id"
            type="number"
            required
            value={regId}
            onChange={(e) => setRegId(Number(e.target.value))}
          />
          <Input
            placeholder="Confirm Password"
            type="password"
            required
            value={confirmPassword}
            minLength={4}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>

      <Button className="w-full" type="submit">
        Add User
      </Button>
    </form>
  );
}

export default React.memo(AddUser);
