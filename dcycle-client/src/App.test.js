import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";

import App from "./App";

test("renders the main page", () => {
  render(<App />);
});

// test("if a name is entered, the submit button becomes enabled", async () => {
//   render(<App sender={{ id: "5" }} receiver={{ id: "5" }} />);

//   expect(
//     await screen.findAllByRole("button", { type: submit / i })
//   ).toBeDisabled();

//   userEvent.type(screen.getAllByPlaceholderText(/name/i), "jane");

//   expect(
//     await screen.findAllByRole("button", { name: /submit/i })
//   ).toBeEnabled();
// });
