// Routing
import React, { useEffect, useState } from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";

// Components
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

// Modules
import { validateSession } from "./modules/security";
import Loading from "./components/loading/Loading";

// Utils
import ScrollToTop from "./utils/scrollToTop";

// Pages
import Home from "./pages/Info/Home";
import Projects from "./pages/Info/Projects";
import Developers from "./pages/Info/Developers";
import About from "./pages/Info/About";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import NotFound from "./pages/Info/NotFound";
import Account from "./pages/Account/Account";

// Modules
import ProtectedRoute from "./modules/security";

// Styles
import "./css/main.css";
import "./assets/fonts/MontserratAlternates/style.css";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        validateSession()
            .then((isValid) => {
                setIsAuthenticated(isValid);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    const routes = {
        publicRoutes: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/projects",
                element: <Projects />,
            },
            {
                path: "/developers",
                element: <Developers />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/sign-in",
                element: <SignIn isAuthenticated={isAuthenticated}/>,
            },
            {
                path: "/sign-up",
                element: <SignUp isAuthenticated={isAuthenticated} />,
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
        privateRoutes: [
            {
                path: "/me",
                element: <Account />,
            },
        ],
    };

    const Routing = () => {
        return useRoutes([
            ...routes.publicRoutes,
            ...routes.privateRoutes.map((route) => ({
                ...route,
                element: <ProtectedRoute isAuthenticated={isAuthenticated} element={route.element} />,
            })),
        ]);
    };

    return (
        <BrowserRouter>
            <ScrollToTop />
            <Header isAuthenticated={isAuthenticated}/>
            <Routing />
            <Footer isAuthenticated={isAuthenticated} />
        </BrowserRouter>
    );
};

export default App;
