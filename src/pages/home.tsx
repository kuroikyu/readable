import { List } from "lucide-react";
import { FC, useEffect } from "react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchBooks } from "@/store/booksSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const Home: FC = () => {
  const { books, error, loading } = useAppSelector((state) => state.books);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="sr-only">Readable</h1>

      <div className="grid gap-6">
        <h2 className="text-xl font-semibold">Our Books</h2>
        {!books || books.length === 0 ? (
          <p>No books available.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {books.map((book) => (
              <Card key={book.id} className="overflow-hidden pt-0 lg:pt-6">
                <div className="flex h-full flex-col lg:flex-row">
                  <div className="lg:ml-6 lg:w-1/2">
                    <img
                      src={book.cover}
                      alt={`Cover for ${book.title}`}
                      className="object-cover pb-6 lg:h-full lg:w-full lg:rounded-xl lg:pb-0"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <CardHeader>
                      <CardTitle className="text-2xl">{book.title}</CardTitle>
                      <CardDescription>By {book.author}</CardDescription>
                    </CardHeader>
                    <CardContent className="mt-4 flex flex-1 flex-col justify-between gap-4">
                      <p className="flex grow gap-x-2 text-xs text-gray-500">
                        {book.description}
                      </p>
                      <p className="flex items-center gap-x-2 text-sm text-gray-500">
                        <List className="h-4 w-4" />
                        {book.noOfPages} pages
                      </p>
                      <Button asChild className="mt-auto w-full">
                        <Link to={`/read?b=${book.id}`}>Read Book</Link>
                      </Button>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
