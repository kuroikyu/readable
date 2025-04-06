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
import { fetchBooks } from "@/store/feature/books/booksSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const books = useAppSelector((state) => state.books.books);
  const error = useAppSelector((state) => state.books.error);
  const loading = useAppSelector((state) => state.books.loading);

  useEffect(() => {
    if (!books || books.length === 0) {
      dispatch(fetchBooks());
    }
  }, [dispatch]);

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
        <h2 className="text-brand-secondary-700/90 text-xl font-semibold">
          Our Books
        </h2>
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
                      <CardTitle className="text-brand-secondary-800 text-2xl">
                        {book.title}
                      </CardTitle>
                      <CardDescription className="text-brand-secondary-700/80">
                        By {book.author}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="mt-4 flex flex-1 flex-col justify-between gap-4">
                      <p className="text-brand-secondary-700/80 flex grow gap-x-2 text-xs">
                        {book.blurb}
                      </p>
                      <p className="text-brand-secondary-700/80 flex items-center gap-x-2 text-sm">
                        <List className="h-4 w-4" />
                        {book.noOfPages} pages
                      </p>
                      <Button
                        asChild
                        className="bg-brand-primary-500 hover:bg-brand-primary-400 mt-auto w-full"
                      >
                        <Link to={`/read?b=${book.id}`}>
                          {isAuthenticated ? "Read Book" : "Login to Read Book"}
                        </Link>
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
