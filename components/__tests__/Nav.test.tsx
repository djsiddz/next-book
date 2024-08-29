import { render, screen } from "@testing-library/react";

import Nav from "ZC/native/Nav";

describe("Nav component", () => {
  describe("Render", () => {
    it("should render 'Login' button", () => {
      render(<Nav />) // ARRANGE
      const navElement = screen.getByText("Login"); // ACT
      expect(navElement).toBeInTheDocument(); // ASSERT
    })
  })
})
