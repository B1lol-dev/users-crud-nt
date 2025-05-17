"use client";

import Header from "@/components/layout/Header";
import AddUser from "./_components/AddUser";

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-gray-300 py-5">
        <AddUser />
      </main>
    </>
  );
}
