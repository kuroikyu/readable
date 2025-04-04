export interface BaseBook {
  id: number;
  title: string;
  author: string;
  blurb: string;
  cover: string;
}

export interface BookWithPages extends BaseBook {
  pages: string[];
}

export interface BookOverview extends BaseBook {
  noOfPages: number;
}

export interface BookStats {
  id: string;
  user_id: number;
  book_id: number;
  time_by_page: {
    page: number;
    timeInMs: number;
  }[];
  page_time: Record<string, number>;
}

export function isBookWithPages(maybe: any): maybe is BookWithPages {
  return (
    maybe &&
    typeof maybe === "object" &&
    "id" in maybe &&
    "title" in maybe &&
    "author" in maybe &&
    "blurb" in maybe &&
    "cover" in maybe &&
    "pages" in maybe
  );
}

export function areBooksWithPages(maybe: any): maybe is BookWithPages[] {
  return (
    maybe &&
    typeof maybe === "object" &&
    Array.isArray(maybe) &&
    maybe.every(isBookWithPages)
  );
}
