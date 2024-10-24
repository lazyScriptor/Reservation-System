import { createBrowserRouter } from "react-router-dom";
import DrawerAd from "./sections/Drawers/Drawer_Ad";
import DashboardLayout from "./sections/DashbaordLayout";

const router = createBrowserRouter([

  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "admin",
        element: <>admin</>,
      },
      {
        path: "staff",
        element: <>staff</>,
      },
    ],
  },
]);

export default router;
