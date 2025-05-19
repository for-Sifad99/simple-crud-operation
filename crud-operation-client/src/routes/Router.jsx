import {
    createBrowserRouter,
} from "react-router";
import Root from "../layouts/Root";
import App from "../App";
import UserDetails from "../components/UserDetails";
import UpdateUser from "../components/UpdateUser";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            { index: true, Component: App },
            {
                path: 'users/:id',
                loader: ({ params }) => fetch(`http://localhost:3002/users/${params.id}`),
                Component: UserDetails,
                hydrateFallbackElement: <div>Loading...</div>,
            },
            {
                path: 'update/:id',
                loader: ({ params }) => fetch(`http://localhost:3002/users/${params.id}`),
                Component: UpdateUser,
                hydrateFallbackElement: <div>Loading...</div>,
            },
        ],
    },
]);


export default router;

