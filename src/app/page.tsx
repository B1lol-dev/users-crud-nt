"use client";

import Header from "@/components/layout/Header";
import AddUser from "./_components/AddUser";
import Users from "./_components/Users";

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-gray-200 py-5">
        <AddUser />
        <Users />
      </main>
    </>
  );
}
