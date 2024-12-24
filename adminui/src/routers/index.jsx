import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
const Login = lazy(() => import("../pages/login/index"));
const Operator = lazy(() => import("../pages/dashboard/subpages/operator"));
const Dashboard = lazy(() => import("../pages/dashboard/index"));
const Loading = lazy(() => import("../components/loading/index"));
const Add = lazy(() => import("../components/operator/add/index"));
const Edit = lazy(() => import("../components/operator/edit/index"));
const Buses = lazy(() => import("../pages/dashboard/subpages/buses"));
const BusesAdd = lazy(() => import("../components/buses/add/index"));
const BusesEdit = lazy(() => import("../components/buses/edit/index"));
const Routers = lazy(() => import("../pages/dashboard/subpages/routes"));
const RouteAdd = lazy(() => import("../components/routers/add/index"));
const RouteEdit = lazy(() => import("../components/routers/edit/index"));
const ScheduleRoute = lazy(() =>import("../pages/dashboard/subpages/schedule"));
const ScheduleAdd = lazy(() => import("../components/schedule/add"));
const ScheduleEdit = lazy(() => import("../components/schedule/edit"));

const withSuspense = (Component) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(Login),
  },
  {
    path: "/admin",
    element: withSuspense(Dashboard),
    children: [
      {
        path: "operator",
        element: withSuspense(Operator),
        children: [
          {
            path: "add",
            element: withSuspense(Add),
          },
          {
            path: "edit",
            element: withSuspense(Edit),
          },
        ],
      },

      {
        path: "buses",
        element: withSuspense(Buses),
        children: [
          {
            path: "add",
            element: withSuspense(BusesAdd),
          },
          {
            path: "edit",
            element: withSuspense(BusesEdit),
          },
        ],
      },

      {
        path: "routes",
        element: withSuspense(Routers),
        children: [
          {
            path: "add",
            element: withSuspense(RouteAdd),
          },
          {
            path: "edit",
            element: withSuspense(RouteEdit),
          },
        ],
      },

      {
        path: "schedule",
        element: withSuspense(ScheduleRoute),
        children: [
          {
            path: "add",
            element: withSuspense(ScheduleAdd),
          },
          {
            path: "edit",
            element: withSuspense(ScheduleEdit),
          },
        ],
      },
    ],
  },
]);

export default router;
