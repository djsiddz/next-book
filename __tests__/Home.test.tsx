import Home from "../app/page";

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Import { BrowserRouter as Router } from 'react-router-dom';

describe('Home Component', () => {
  test('renders the Home component', () => {
    render(
      // <Router>
        <Home />
      // </Router>
    );

    // Check for Nav component
    expect(screen.getByRole('navigation')).toBeInTheDocument();

    // Check for main headings
    expect(screen.getByText('Keep track of all your Books.')).toBeInTheDocument();
    expect(screen.getByText('And your reading habit. No matter where and how you like to read them.')).toBeInTheDocument();

    // Check for buttons
    expect(screen.getByRole('link', { name: /Join the Waitlist/i })).toHaveAttribute('href', '/signup?campaign=Direct');
    expect(screen.getByRole('button', { name: /Learn More/i })).toBeInTheDocument();

    // Check for features section
    expect(screen.getAllByText('Features')).toHaveLength(2);
    expect(screen.getByText('All Books in one view')).toBeInTheDocument();
    expect(screen.getByText('Track your progress')).toBeInTheDocument();
    expect(screen.getByText('Build a reading habit')).toBeInTheDocument();
    expect(screen.getByText('Get AI recommendations')).toBeInTheDocument();
 });
});
