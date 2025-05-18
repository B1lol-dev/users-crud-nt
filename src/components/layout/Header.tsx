import React, { FormEvent, useState } from "react";
import Container from "../helpers/Container";
import Link from "next/link";
import { Search, ShieldUser } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Toaster } from "react-hot-toast";

const Header = () => {
  const [search, setSearch] = useState("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <header className="w-full shadow-lg">
      <Container>
        <nav className="flex items-center justify-between py-4">
          <Link href="/">
            <ShieldUser size={32} />
          </Link>
          <form className="flex" onSubmit={(e) => handleSearch(e)}>
            <Input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button>
              <Search />
            </Button>
          </form>
        </nav>
      </Container>
      <Toaster position="bottom-right" />
    </header>
  );
};

export default React.memo(Header);
