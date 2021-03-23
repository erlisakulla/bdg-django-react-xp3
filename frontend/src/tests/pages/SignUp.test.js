import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup } from "@testing-library/react";
import SignUp from "../../pages/SignUp";

afterEach(cleanup);

it("Username should be empty", () => {
  const { getByTestId } = render(<SignUp />);

  expect(getByTestId("username")).toHaveTextContent("");
});
it("Email should be empty", () => {
  const { getByTestId } = render(<SignUp />);

  expect(getByTestId("email")).toHaveTextContent("");
});
it("Password should be empty", () => {
  const { getByTestId } = render(<SignUp />);

  expect(getByTestId("password")).toHaveTextContent("");
});
