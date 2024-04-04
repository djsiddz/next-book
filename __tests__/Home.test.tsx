import Home from "../app/page";

import { render, screen } from "@testing-library/react";

it('should have "Keep track of your Books"', () => {
  render(<Home />)
  const headingElement = screen.getByText("Keep track of your Books.");
  expect(headingElement).toBeInTheDocument();
})
