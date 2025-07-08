import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Builder from "./pages/Builder";
import Dashboard from "./pages/Dashboard";
import ResumeViewer from "./pages/ResumeViewer";
import Profile from "./pages/Profile";
import Features from "./pages/Features";
import AuthGuard from "./components/AuthGuard";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path:"/",
        element:<Home/>
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/features",
        element: <Features />,
      },
      {
        path: "/profile",
        element: <AuthGuard><Profile /></AuthGuard>,
      },
      {
        path: "builder",
        element: <AuthGuard><Builder /></AuthGuard>,
      },
      {
        path: "dashboard",
        element: <AuthGuard><Dashboard /></AuthGuard>,
      },
      {
        path: "resume/:resumeId",
        element: <AuthGuard><ResumeViewer /></AuthGuard>,
      },
    ],
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default App;
