import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { createMemoryHistory } from "history";
import { Router } from "react-router";
import { render, cleanup } from '@testing-library/react';

afterEach(cleanup);

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App/>, div);
});

test("redirects to login page", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App logged_in={false}/>
    </Router>
  );
  expect(history.location.pathname).toBe("/");
});