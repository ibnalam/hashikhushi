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
// import Home from "./pages/Homee";
import RootLayouts from "./components/RootLayouts";
import Message from "./components/Message";
import Settings from "./components/Settings";
import Notify from "./components/Notify";
import Homee from "./components/Homee";
import Logout from "./pages/Logout";
// import Grid from '@mui/material/Grid';

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
        path="/logout"
        element={<Logout />}
      >
      </Route>
      <Route
        path="/login"
        element={<LogIn/>}
      >
      </Route>
      <Route
        path="/page"
        element={<RootLayouts/>}
      >
          <Route
          path="homee"
          element={<Homee/>}
          >
          </Route>
          <Route
          path="message"
          element={<Message/>}
          >
          </Route>
          <Route
          path="notification"
          element={<Notify/>}
          >
          </Route>
          <Route
          path="settings"
          element={<Settings/>}
          >
          </Route>
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
