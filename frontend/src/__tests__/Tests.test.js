import React from 'react';
import LogIn from '../pages/auth/LogIn';
import SignUp from '../pages/auth/Register';
import GameCreationForm from '../pages/components/forms/GameCreationForm'
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

afterEach(cleanup);

it("renders Login header", () => {
  const { getByTestId } = render(<LogIn/>);
  const header = getByTestId('log-in-page');
  expect(header).toHaveTextContent('Welcome to the Beer Distribution Game');
});

test('input field value change', () => {
  const { getByTestId } = render(<SignUp/>);
  const input = getByTestId('email-input');

  expect(input.value).toBe('');
  fireEvent.change(input, { target: { value: 'test' } });
  expect(input.value).toBe('test');
});