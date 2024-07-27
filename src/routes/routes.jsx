import App from "../App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Homepage from "../pages/Homepage";
import AddInvoicesPage from "../pages/AddInvoicesPage";
const routes = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            children: [
                {
                    path: "/",
                    element: <Homepage />
                },
                {
                    path: "/add-invoice",
                    element: <AddInvoicesPage />
                },
            ]
        }
]);

const Router = () => <RouterProvider router={routes} />;
export default Router;