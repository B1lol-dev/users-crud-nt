"use client";

import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Container from "@/components/helpers/Container";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import axios from "axios";

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
  const [regId, setRegId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");

  const handleAddUser = (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords should be identical!");
    }

    if (!gender) {
      return null;
    }

    const newUser = {
      fullName,
      email,
      phoneNumber,
      regId,
      password,
      gender,
    };

    axios
      .post("/api/users", newUser)
      .then((res) => toast.success(res.data.message))
      .catch((e) => toast.error(e.message))
      .finally(() => {
        setShowModal(false);
        location.reload();
      });
  };

  return (
    <div
      className="fixed h-screen w-screen bg-black/80 top-0 left-0 flex items-center justify-center z-10"
      onClick={(e) =>
        e.target === e.currentTarget ? setShowModal(false) : null
      }
    >
      <form
        className="bg-white p-5 border rounded-md flex flex-col gap-3 relative"
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
            <Label className="flex flex-col items-start">
              <h2>Full Name</h2>
              <Input
                placeholder="Enter user's full name"
                required
                value={fullName}
                minLength={2}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Label>
            <Label className="flex flex-col items-start">
              <h1>Email</h1>
              <Input
                placeholder="Enter user's email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Label>
            <Label className="flex flex-col items-start">
              <h1>Password</h1>
              <Input
                placeholder="Enter user's password"
                type="password"
                required
                value={password}
                minLength={4}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Label>
          </div>
          <div className="flex flex-col gap-4">
            <Label className="flex flex-col items-start">
              <h1>Phone number</h1>
              <Input
                placeholder="Enter user's phone number"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Label>
            <Label className="flex flex-col items-start">
              <h1>Registry Id</h1>
              <Input
                placeholder="Enter user's id"
                type="number"
                required
                value={regId}
                onChange={(e) => setRegId(e.target.value)}
                min={0}
              />
            </Label>
            <Label className="flex flex-col items-start">
              <h1>Confirm password</h1>
              <Input
                placeholder="Confirm user's password"
                type="password"
                required
                value={confirmPassword}
                minLength={4}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Label>
          </div>
        </div>
        <Label className="flex flex-col items-start mt-2">
          <h1>Select gender</h1>
          <Select
            onValueChange={(value) => {
              setGender(value);
            }}
            value={gender}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select user's gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Label>
        <Button className="w-full" type="submit">
          Add User
        </Button>
      </form>
    </div>
  );
}

export default React.memo(AddUser);
