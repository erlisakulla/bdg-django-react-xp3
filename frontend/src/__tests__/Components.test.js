import React from 'react';
import ReactDOM from 'react-dom';
import LogIn from '../pages/auth/LogIn';
import SignUp from '../pages/auth/Register';
import GameCreationForm from '../pages/components/GameCreationForm';
import GameRegisterForm from '../pages/components/GameRegisterForm';
import GamesList from '../pages/components/GamesList';
import GameUpdateForm from '../pages/components/GameUpdateForm';
import MonitorGamesList from '../pages/components/MonitorGamesList';
import Navbar from '../pages/components/Navbar';
import PlayersList from '../pages/components/PlayersList';
import RegisteredGamesList from '../pages/components/RegisteredGamesList';

import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

afterEach(cleanup);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LogIn/>, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SignUp/>, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GameCreationForm/>, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GameRegisterForm/>, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GamesList/>, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GameUpdateForm/>, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MonitorGamesList/>, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Navbar/>, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PlayersList/>, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RegisteredGamesList/>, div);
});