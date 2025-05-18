"use client";

import Container from "@/components/helpers/Container";
import axios from "axios";
import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import UserCard from "./UserCard";
import { IUserData } from "@/constants/interfaces";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const Users = () => {
  const [users, setUsers] = useState<IUserData[]>([]);
  const [showUserEditModal, setShowUserEditModal] = useState<boolean>(false);
  const [currentEditingUser, setCurrentEditingUser] = useState<string>("");

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

  const handleOnEdit = (userId: string) => {
    setShowUserEditModal(true);
    setCurrentEditingUser(userId);
  };

  return (
    <section className="min-h-[85vh]">
      <Container>
        <div className="grid grid-cols-4 mt-4 gap-5">
          {users.map((user: IUserData) => (
            <UserCard
              user={user}
              key={user.regId}
              userId={user._id}
              onDelete={handleDeleteUser}
              onEdit={() => handleOnEdit(user._id)}
            />
          ))}
        </div>
      </Container>
      {showUserEditModal && (
        <EditUserModal
          userId={currentEditingUser}
          setUserId={setCurrentEditingUser}
          setShowModal={setShowUserEditModal}
        />
      )}
    </section>
  );
};

export default React.memo(Users);

interface IEditUserModal {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
}

function EditUserModal({ setShowModal, userId, setUserId }: IEditUserModal) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [regId, setRegId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    if (!userId) return;
    axios.get(`/api/users`).then((res) => {
      const user = res.data.filter((user: IUserData) => user._id === userId)[0];
      setFullName(user.fullName || "");
      setEmail(user.email || "");
      setPhoneNumber(user.phoneNumber || "");
      setRegId(user.regId || "");
      setGender(user.gender || "");
      setPassword(user.password || "");
      setConfirmPassword(user.password || "");
      console.log(user);
    });
  }, [userId]);

  const handleEditUser = (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords should be identical!");
      return;
    }

    const updatedUser = {
      fullName,
      email,
      phoneNumber,
      regId,
      password,
      gender,
    };

    axios
      .patch(`/api/users?userId=${userId}`, updatedUser)
      .then((res) => toast.success(res.data.message))
      .catch((e) => toast.error(e.message))
      .finally(() => {
        setShowModal(false);
        setUserId("");
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
        onSubmit={(e) => handleEditUser(e)}
      >
        <h2>Edit User</h2>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Label>
            <Label className="flex flex-col items-start">
              <h1>Password</h1>
              <Input
                placeholder="Enter user's password"
                type="password"
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
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Label>
            <Label className="flex flex-col items-start">
              <h1>Registry Id</h1>
              <Input
                placeholder="Enter user's id"
                type="number"
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
