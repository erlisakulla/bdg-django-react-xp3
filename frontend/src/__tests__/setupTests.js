import '@testing-library/jest-dom';
import ReactDOM from 'react-dom';
import LogIn from '../pages/auth/LogIn';
import SignUp from '../pages/auth/Register';
import Dashboard from '../pages/games/Dashboard';
import MonitorGames from '../pages/games/MonitorGame';
import JoinGames from '../pages/games/JoinGame';
import AccountSettings from '../pages/auth/AccountSettings';
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';

// Render and snapshot testing

afterEach(cleanup);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LogIn/>, div);
});

it('matches snapshot', () => {
  const tree = renderer.create(<LogIn/>).toJSON();
  expect(tree).toMatchSnapshot();
});

////////////
  
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SignUp/>, div);
});

it('matches snapshot', () => {
  const tree = renderer.create(<SignUp/>).toJSON();
  expect(tree).toMatchSnapshot();
});

////////////

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Dashboard/>, div);
});

it('matches snapshot', () => {
  const tree = renderer.create(<Dashboard/>).toJSON();
  expect(tree).toMatchSnapshot();
});

////////////
 
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MonitorGames/>, div);
});

it('matches snapshot', () => {
  const tree = renderer.create(<MonitorGames/>).toJSON();
  expect(tree).toMatchSnapshot();
});

////////////
 
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<JoinGames/>, div);
});

it('matches snapshot', () => {
  const tree = renderer.create(<JoinGames/>).toJSON();
  expect(tree).toMatchSnapshot();
});

////////////
 
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AccountSettings/>, div);
});

it('matches snapshot', () => {
  const tree = renderer.create(<AccountSettings/>).toJSON();
  expect(tree).toMatchSnapshot();
});