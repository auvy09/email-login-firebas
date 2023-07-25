import { getAuth } from 'firebase/auth'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import app from './firebase.init';

import ReactForm from './component/ReactForm';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Main from './component/layout/Main';
import LoginBootstrap from './component/layout/LoginBootstrap';

const auth = getAuth(app);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [{
      path: '/',
      element: <ReactForm></ReactForm>
    },
    {
      path: '/register',
      element: <ReactForm></ReactForm>
    },
    {
      path: '/login',
      element: <LoginBootstrap />
    }
    ]
  }
])
function App() {
  return (
    <div className="">


      <RouterProvider router={router}></RouterProvider>



    </div>
  );
}

export default App;