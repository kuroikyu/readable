import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { marked } from "marked";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { fetchBookById } from "@/store/booksSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const Reader: FC = () => {
  const dispatch = useAppDispatch();
  const { activeBook, loading, error } = useAppSelector((state) => state.books);
  const { user } = useAppSelector((state) => state.auth);
  const [searchParams] = useSearchParams();
  const bookId = searchParams.get("b");
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (bookId) {
      dispatch(fetchBookById(parseInt(bookId, 10)));
    }
  }, [dispatch, user, bookId]);

  const changePage = (newPage: number) => {
    if (user && bookId && currentPage >= 0) {
      setCurrentPage(newPage);
      // Scroll to the top of the page on page change
      window.scrollTo(0, 0);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      changePage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (activeBook && currentPage < activeBook.pages.length - 1) {
      changePage(currentPage + 1);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !activeBook) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-red-500">Error: {error || "Book not found"}</p>
        <Button asChild>
          <Link to="/">Back to Dashboard</Link>
        </Button>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 px-6 pt-6 md:p-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">{activeBook.title}</h1>
          <Button asChild variant="outline" size="icon">
            <Link to="/">
              <X className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <Card className="-mx-6 my-6 rounded-none md:-mx-0 md:rounded-xl">
          <CardContent className="prose prose-lg max-w-none">
            <div
              dangerouslySetInnerHTML={{
                __html: marked.parse(activeBook.pages[currentPage]),
              }}
            />
          </CardContent>
        </Card>
        <Card className="sticky bottom-0 -mx-6 rounded-none md:-mx-0 md:rounded-xl">
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              size="lg"
              onClick={goToPreviousPage}
              disabled={currentPage === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm text-gray-500">
              Page {currentPage + 1} of {activeBook.pages.length}
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={goToNextPage}
              disabled={currentPage === activeBook.pages.length - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Reader;
