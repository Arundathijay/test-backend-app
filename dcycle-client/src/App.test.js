import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";

import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("if a name enters, the submit button is enabled", async () => {
  render(<App />);

  userEvent.type(screen.getAllByPlaceholderText(/name/i), "jane");

  expect(
    await screen.findAllByRole("button", { name: /name/i })
  ).toBeDisabled();
});
