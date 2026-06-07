import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage.tsx";
import SignIn from "./pages/auth/Signin.tsx";
import SignUp from "./pages/auth/Signup.tsx";
import OnboardingPage from "./pages/onboarding/OnboardingPage.tsx";
import TodayPage from "./pages/TodayPage.tsx";
import { ErrorPage } from "./pages/ErrorPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/signin",
    element: <SignIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/onboarding",
    element: <OnboardingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/today",
    element: <TodayPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
