import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { fetchBookById } from "@/store/feature/books/booksSlice";
import { fetchBookStatsByUser } from "@/store/feature/books/bookStatsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { X } from "lucide-react";
import { FC, useEffect } from "react";
import { Link, useSearchParams } from "react-router";

const ReaderStats: FC = () => {
  const [searchParams] = useSearchParams();
  const bookId = searchParams.get("b");

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const authToken = useAppSelector((state) => state.auth.token);

  const bookStats = useAppSelector((state) => state.bookStats.bookStats);
  const bookStatsError = useAppSelector((state) => state.bookStats.error);
  const bookStatsLoading = useAppSelector((state) => state.bookStats.loading);

  const activeBook = useAppSelector((state) => state.books.activeBook);
  const bookError = useAppSelector((state) => state.books.error);
  const bookLoading = useAppSelector((state) => state.books.loading);

  useEffect(() => {
    if (bookId && user && authToken && !activeBook) {
      dispatch(fetchBookById({ bookId, authToken }));
    }

    if (bookId && user && authToken && (!bookStats || bookStats.length === 0)) {
      dispatch(fetchBookStatsByUser({ userId: user.id, authToken }));
    }
  }, [dispatch, bookId, user, authToken, activeBook]);

  if (bookLoading || bookStatsLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (bookError || bookStatsError || !activeBook) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-red-500">Error: {bookError || "Book not found"}</p>
        <Button asChild>
          <Link to="/">Pick another book</Link>
        </Button>
      </div>
    );
  }

  const userBookStats = bookStats.find(
    (stat) =>
      stat.user_id.toString() === user?.id.toString() &&
      stat.book_id.toString() === bookId?.toString(),
  );

  if (!userBookStats) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p>Ready to dive in? Start reading now!</p>
        <Button asChild>
          <Link to={{ pathname: "/read", search: `?b=${bookId}` }}>
            Open this book
          </Link>
        </Button>
        <Button variant="outline">
          <Link to="/">Pick another book</Link>
        </Button>
      </div>
    );
  }

  const totalTime = Object.values(userBookStats.page_time).reduce(
    (acc, cur) => acc + cur,
    0,
  );
  const totalTimeDate = new Date(totalTime);
  const timePerPage = Math.round(
    totalTime / Object.values(userBookStats.page_time).length,
  );
  const timePerPageDate = new Date(timePerPage);

  return (
    <div className="container mx-auto max-w-3xl p-6 md:px-0">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-brand-secondary-700/70 text-2xl font-bold">
            {activeBook.title}
          </h1>
          <Button asChild variant="outline" size="icon">
            <Link to="/">
              <X className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <Card className="-mx-6 my-6 rounded-none md:-mx-0 md:rounded-xl">
          <CardContent className="mb-6 max-w-none text-black/80">
            <h2 className="text-brand-secondary-800/90 mt-14 mb-8 text-3xl font-bold">
              Book statistics
            </h2>

            <h3 className="text-brand-secondary-700/90 mt-6 mb-4 text-xl font-bold">
              Total reading time
            </h3>
            <div className="flex justify-evenly">
              <div className="flex flex-col text-center">
                <span className="text-6xl font-bold">
                  {totalTimeDate.getUTCHours().toString().padStart(2, "0")}
                </span>
                <span>hours</span>
              </div>

              <div className="flex flex-col text-center">
                <span className="text-6xl font-bold">
                  {totalTimeDate.getUTCMinutes().toString().padStart(2, "0")}
                </span>
                <span>minutes</span>
              </div>

              <div className="flex flex-col text-center">
                <span className="text-6xl font-bold">
                  {totalTimeDate.getUTCSeconds().toString().padStart(2, "0")}
                </span>
                <span>seconds</span>
              </div>
            </div>

            <h3 className="text-brand-secondary-700/90 mt-6 mb-4 text-xl font-bold">
              Time per page
            </h3>
            <div className="flex justify-evenly">
              <div className="flex flex-col text-center">
                <span className="text-6xl font-bold">
                  {timePerPageDate.getUTCHours().toString().padStart(2, "0")}
                </span>
                <span>hours</span>
              </div>

              <div className="flex flex-col text-center">
                <span className="text-6xl font-bold">
                  {timePerPageDate.getUTCMinutes().toString().padStart(2, "0")}
                </span>
                <span>minutes</span>
              </div>

              <div className="flex flex-col text-center">
                <span className="text-6xl font-bold">
                  {timePerPageDate.getUTCSeconds().toString().padStart(2, "0")}
                </span>
                <span>seconds</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center border-t">
            <Button
              size="lg"
              className="from-brand-secondary-500 to-brand-primary-500 hover:from-brand-secondary-400 hover:to-brand-primary-400 bg-linear-to-r"
              asChild
            >
              <Link to="/">Pick another book</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ReaderStats;
