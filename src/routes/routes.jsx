import ErrorPage from "../pages/error-page";
import Root, { loader as rootLoader, action as rootAction } from "../pages/root";
import Contact, { loader as contactLoader, action as contactAction } from "../pages/contact";
import EditContact, { action as editAction } from "../pages/edit";
import Index from "../pages";
import { action as destroyAction } from "../pages/destroy";

export const routes = [
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: rootLoader,
        action: rootAction,
        children: [
            {
                errorElement: <ErrorPage />,
                children: [
                    { index: true, element: <Index /> },
                    {
                        path: "contacts/:contactId",
                        element: <Contact />,
                        loader: contactLoader,
                        action: contactAction,
                    },
                    {
                        path: "contacts/:contactId/edit",
                        element: <EditContact />,
                        loader: contactLoader,
                        action: editAction,
                    },
                    {
                        path: "contacts/:contactId/destroy",
                        action: destroyAction,
                        element: <div>ok</div>,
                        errorElement: <div>Oops! There was an error.</div>
                    }
                ]
            },
        ]
    },
];