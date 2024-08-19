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
import ManageProject from './Components/ManageProject';
import ManageMembers from './Components/ManageMembers';
import Table from './Components/Table';
import Projects from './Components/Projects';
import Teams from './Components/Teams';
import NotFound from './Components/NotFound';

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
        path: '/project',
        element: <Projects />
      },
      {
        path: '/project/:projectId',
        element: <KanbanBoard />
      },
      {
        path: '/project/add',
        element: <ManageProject/>
      },
      {
        path: '/project/edit/:projectId',
        element: <ManageProject/>
      },
      {
        path: '/team',
        element: <Teams/>
      },
      {
        path: '/team/add',
        element: <ManageMembers/>
      },
      {
        path: '/team/edit/:id',
        element: <ManageMembers/>
      }
    ]
  },
  {
    path: '/*',
    element: <NotFound/>
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
