import { lazy } from "react";
import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const Home = lazy(() => import("../pages/home/index"));
const Login = lazy(() => import("../pages/login"));
const Signup = lazy(() => import("../pages/signup"));
const Booking = lazy(() => import("../pages/booking"));
const Loading = lazy(() => import("../components/loading"));

const withSuspense = (Component) => {
  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(Home),
  },
  {
    path: "/login",
    element: withSuspense(Login),
  },
  {
    path: "/signup",
    element: withSuspense(Signup),
  },
  {
    path: "/booking/:id",
    element: withSuspense(Booking),
  },
]);

export default router;
