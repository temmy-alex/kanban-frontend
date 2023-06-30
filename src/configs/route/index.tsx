import { lazy } from "react";

// Layout
const BlankLayout = lazy(() => import('../../components/layout/BlankLayout'));
const HeaderLayout = lazy(() => import('../../components/layout/HeaderLayout'));

// Pages
const SignInPage = lazy(() => import('../../pages/authentication/SignIn'));
const SignUpPage = lazy(() => import('../../pages/authentication/SignUp'));
const Dashboard = lazy(() => import('../../pages/main/Main'));

const appRoutes = [
    {
        path: '',
        element: <HeaderLayout />,
        children: [
            { path: '', element: <Dashboard /> },
        ],
    },
    {
        path: 'auths',
        element: <BlankLayout />,
        children: [
            { path: 'sign-in', element: <SignInPage /> },
            { path: 'sign-up', element: <SignUpPage /> },
        ],
    }
];

export default appRoutes;