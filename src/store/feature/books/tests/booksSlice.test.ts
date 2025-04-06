/**
 * @vitest-environment jsdom
 */

import { expect, test } from "vitest";
import reducer, { BooksState } from "./booksSlice";

const initialState: BooksState = {
  books: [],
  activeBook: null,
  loading: true,
  error: null,
};

test("should return the initial state", () => {
  expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
});
