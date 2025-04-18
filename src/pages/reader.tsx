import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { FC, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { marked } from "marked";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { fetchBookById } from "@/store/feature/books/booksSlice";
import { updateBookStats } from "@/store/feature/books/bookStatsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Loading from "@/components/Loading";

const Reader: FC = () => {
  const [searchParams] = useSearchParams();
  const bookId = searchParams.get("b");
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const authToken = useAppSelector((state) => state.auth.token);
  const activeBook = useAppSelector((state) => state.books.activeBook);
  const loading = useAppSelector((state) => state.books.loading);
  const error = useAppSelector((state) => state.books.error);

  const [currentPage, setCurrentPage] = useState(0);
  const lastPageRef = useRef(0);
  const startTimeRef = useRef(Date.now());

  const updateReadingStats = () => {
    if (user && authToken && bookId && currentPage >= 0) {
      const timeSpentInMs = Math.floor(Date.now() - startTimeRef.current);
      dispatch(
        updateBookStats({
          userId: user.id,
          bookId: bookId,
          pageNumber: lastPageRef.current,
          timeSpentInMs,
          authToken,
        }),
      );
    }
  };

  useEffect(() => {
    if (bookId && user && (!activeBook || activeBook.id !== bookId)) {
      dispatch(fetchBookById({ bookId, authToken }));
    }
    startTimeRef.current = Date.now();

    return () => {
      updateReadingStats();
    };
  }, [dispatch, user, authToken, bookId]);

  const changePage = (newPage: number) => {
    updateReadingStats();
    setCurrentPage(newPage);
    lastPageRef.current = newPage;
    startTimeRef.current = Date.now();
    // Scroll to the top of the page on page change
    window.scrollTo(0, 0);
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

  useEffect(() => {
    const handleKeyboardPagination = (event: KeyboardEvent) => {
      switch (event.code) {
        case "KeyL":
        case "ArrowRight":
          goToNextPage();
          break;
        case "KeyH":
        case "ArrowLeft":
          goToPreviousPage();
          break;
        case "Escape":
          navigate({
            pathname: "stats",
            search: `?b=${bookId}`,
          });
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyboardPagination);

    return () => {
      window.removeEventListener("keydown", handleKeyboardPagination);
    };
  }, [currentPage, activeBook]);

  if (loading || activeBook?.id !== bookId) {
    return <Loading />;
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
    <div className="container mx-auto max-w-3xl p-6 md:px-0">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-brand-secondary-700/70 text-2xl font-bold">
          {activeBook.title}
        </h1>
        <Tooltip>
          <TooltipTrigger>
            <Button asChild variant="outline" size="icon">
              <Link
                to={{ pathname: "stats", search: `?b=${bookId}` }}
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Close</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <Card className="-mx-6 mt-6 mb-22 rounded-none md:-mx-0 md:mb-6 md:rounded-xl">
        <CardContent className="prose prose-h2:text-brand-secondary-800/90 prose-h2:text-center prose-lg max-w-none">
          <div
            dangerouslySetInnerHTML={{
              __html: marked.parse(activeBook.pages[currentPage]),
            }}
          />
        </CardContent>
      </Card>
      <Card className="fixed bottom-0 -mx-6 w-full rounded-none md:sticky md:-mx-0 md:rounded-xl">
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            size="lg"
            aria-label="Previous page"
            onClick={goToPreviousPage}
            disabled={currentPage === 0}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
          <div className="text-sm text-gray-500">
            Page {currentPage + 1} of {activeBook.pages.length}
          </div>
          <Button
            variant="outline"
            size="lg"
            aria-label="Next page"
            onClick={goToNextPage}
            disabled={currentPage === activeBook.pages.length - 1}
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Reader;
