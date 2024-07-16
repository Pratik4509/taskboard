import React from 'react';
import logo from './logo.svg';
import './App.css';
import { KanbanBoard } from './Components/KanbanBoard';
import Sidebar from './Components/Sidebar';
import { createBrowserRouter, RouterProvider, RouteProps } from 'react-router-dom';
import Home from './Components/Home';
import Main from './Components/Main';
import { Provider } from 'react-redux';
import store from './redux/store';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/',
        element: <Main />
      },
      {
        path: '/project/:id',
        element: <KanbanBoard />
      }
    ]
  }
])

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
    </div>
  );
}

export default App;
