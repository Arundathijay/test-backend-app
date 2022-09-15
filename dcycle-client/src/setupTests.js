// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import App from "./App";

test("if a name enters, the submit button is enabled", async () => {
  render(<App />);

  userEvent.type(screen.getAllByPlaceholderText(/name/i), "jane");

  expect(
    await screen.findAllByRole("button", { name: /name/i })
  ).toBeDisabled();
});
