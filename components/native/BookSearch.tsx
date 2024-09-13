"use client";

import { useState } from "react";
import { BookIcon, SearchIcon } from "lucide-react";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

import { Button, ButtonProps } from "ZC/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "ZC/ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "ZC/ui/drawer";
import { Input } from "ZC/ui/input";

// Simulated book search function
const searchBook = async (isbn: string) => {
  // In a real application, this would be an API call
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
  return {
    cover: "https://place-hold.it/150x200",
    name: "Sample Book Title",
    author: "John Doe",
    isbn,
  };
};

export function BookSearch({
  searchButtonLabel = "Add Book",
  buttonVariant = "outline",
}: {
  searchButtonLabel?: string;
  buttonVariant?: ButtonProps["variant"];
}) {
  const [isbn, setIsbn] = useState("");
  const [book, setBook] = useState<{ cover: string; name: string; author: string; isbn: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const result = await searchBook(isbn);
      setBook(result);
    } catch (error) {
      console.error("Error searching for book:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddBook = () => {
    // Here you would typically add the book to the user's collection
    // eslint-disable-next-line no-console
    console.log("Adding book to collection:", book);
    setIsOpen(false);
  };

  const BookSearchContent = (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input type="text" placeholder="Enter ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
        <Button onClick={() => void handleSearch()} disabled={isLoading}>
          {isLoading ? (
            "Searching..."
          ) : (
            <>
              <SearchIcon /> Search
            </>
          )}
        </Button>
      </div>
      {book && (
        <div className="flex flex-col items-center space-y-4">
          <Image src={book.cover} alt={book.name} className="w-32 h-48 object-cover" width={150} height={200} />
          <div className="text-center">
            <h3 className="font-bold">{book.name}</h3>
            <p className="text-sm text-muted-foreground">{book.author}</p>
            <p className="text-sm text-muted-foreground">{book.isbn}</p>
          </div>
          <Button onClick={handleAddBook}>Add to Collection</Button>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button variant={buttonVariant}>
            <BookIcon className="mr-2 h-4 w-4" />
            {searchButtonLabel}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Search for a Book</DrawerTitle>
            <DrawerDescription>Enter the ISBN to search for a book</DrawerDescription>
          </DrawerHeader>
          <div className="p-4">{BookSearchContent}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant}>
          <BookIcon className="mr-2 h-4 w-4" />
          {searchButtonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search for a Book</DialogTitle>
          <DialogDescription>Enter the ISBN to search for a book</DialogDescription>
        </DialogHeader>
        {BookSearchContent}
      </DialogContent>
    </Dialog>
  );
}
