import Registration from "./pages/Registration";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import firebaseConfig from "./firebaseConfig";
import LogIn from "./pages/Login";
import Home from "./pages/Registration";

function App() {


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route
        path="/"
        element={<Registration />}
      >
      </Route>
      <Route
        path="/login"
        element={<LogIn/>}
      >
      </Route>
      <Route
        path="/home"
        element={<Home/>}
      >
      </Route>
      </Route>
    )
  );
  
  return (
    <>
          <ToastContainer
            position="top-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            />
     <RouterProvider router={router}/>
     
    </>
  )
}

export default App
