/**
 * @vitest-environment jsdom
 */

import { expect, test } from "vitest";
import reducer from "../authSlice";

test("should return the initial state", () => {
  expect(reducer(undefined, { type: "unknown" })).toEqual({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  });
});
