import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage.tsx";
import SignIn from "./pages/auth/Signin.tsx";
import SignUp from "./pages/auth/Signup.tsx";
import OnboardingPage from "./pages/onboarding/OnboardingPage.tsx";
import WorkspacePage from "./pages/TodayPage.tsx";
import QuickCapturePage from "./pages/QuickCapturePage.tsx";
import DraftsPage from "./pages/DraftsPage.tsx";
import HistoryPage from "./pages/HistoryPage.tsx";
import ConsistencyPage from "./pages/ConsistencyPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import AppShell from "./components/layout/AppShell.tsx";
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
    element: <AppShell />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "workspace",
        element: <WorkspacePage />,
      },
      {
        path: "quick-capture",
        element: <QuickCapturePage />,
      },
      {
        path: "drafts",
        element: <DraftsPage />,
      },
      {
        path: "history",
        element: <HistoryPage />,
      },
      {
        path: "consistency",
        element: <ConsistencyPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
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
