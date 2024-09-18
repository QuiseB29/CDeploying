import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import BlogPost from '../components/BlogPost';


describe('BlogPost', () => {
  it('renders correctly', () => {
    const { getByTitle } = render(<BlogPost />)
  })
})

it('handles input changes', () => {
  render(<BlogPost />);

  // Example using getByLabelText
  const titleInput = screen.getByLabelText(/title/i);
  const bodyInput = screen.getByLabelText(/body/i);


  fireEvent.change(titleInput, { target: { value: 'Test Title' } });
  fireEvent.change(bodyInput, { target: { value: 'Test Body' } });

  expect(titleInput.value).toBe('Test Title');
  expect(bodyInput.value).toBe('Test Body');
});


it('submits the form and stores comment in localStorage', () => {
  render(<BlogPost />);

  // Get the input fields and submit button
  const titleInput = screen.getByLabelText(/title:/i) as HTMLInputElement;
  const bodyInput = screen.getByLabelText(/body:/i) as HTMLTextAreaElement;
  const submitButton = screen.getByText(/submit/i);

  // Simulate user input
  fireEvent.change(titleInput, { target: { value: 'Test Title' } });
  fireEvent.change(bodyInput, { target: { value: 'Test Body' } });

  // Submit the form
  fireEvent.click(submitButton);

  // Verify the comment is stored in localStorage
  const storedComments = JSON.parse(localStorage.getItem('comments') || '[]');
  
  // Assertions
  expect(Array.isArray(storedComments)).toBe(true); // Ensure comments are stored as an array
  expect(storedComments.length).toBe(1); // Check if there is one comment stored
  expect(storedComments[0].title).toBe('Test Title'); // Verify the title
  expect(storedComments[0].body).toBe('Test Body'); // Verify the body
});

