import Home from "../app/page";

import { render, screen } from "@testing-library/react";

describe('Home page', () => {
  // This is the AAA pattern for testing.
  it('should have "Keep track of your Books"', () => {
    render(<Home />) // ARRANGE
    const headingElement = screen.getByText("Keep track of all your Books.");
    expect(headingElement).toBeInTheDocument(); // ASSERT
  })
  // Adding one more test.
  it('should have "Join the Waitlist" button', () => {
    render(<Home />) // ARRANGE
    const ctaElement = screen.getByText("Join the Waitlist"); // ACT
    expect(ctaElement).toBeInTheDocument(); // ASSERT
  })

})
