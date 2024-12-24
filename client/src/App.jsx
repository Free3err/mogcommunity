// Routing
import { useState, useEffect } from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";

// Components
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Sidebar from "./components/sidebar/Sidebar";
import Loading from "./components/loading/Loading";

// Utils
import ScrollToTop from "./utils/scrollToTop";

// Pages
import Home from "./pages/Info/Home";
import Projects from "./pages/Info/Projects";
import Developers from "./pages/Info/Developers";
import About from "./pages/Info/About";
import SignIn from "./pages/Info/SignIn";
import SignUp from "./pages/Info/SignUp";
import NotFound from "./pages/Info/NotFound";
// Modules
import ProtectedRoute from "./modules/security";

// Styles
import "./css/main.css";
import "./assets/fonts/MontserratAlternates/style.css";

const App = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    const routes = {
        publicRoutes: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/projects",
                element: <Projects setLoading={setLoading} />,
            },
            {
                path: "/developers",
                element: <Developers setLoading={setLoading} />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/sign-in",
                element: <SignIn setLoading={setLoading} />,
            },
            {
                path: "/sign-up",
                element: <SignUp setLoading={setLoading} />,
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
        privateRoutes: [],
    };

    const Routing = () => {
        return useRoutes([
            ...routes.publicRoutes,
            ...routes.privateRoutes.map((route) => ({
                ...route,
                element: <ProtectedRoute element={route.element} />,
            })),
        ]);
    };

    const handleThemeChange = (newTheme) => {
        localStorage.setItem("theme", newTheme);
    };

    return (
        <BrowserRouter>
            <ScrollToTop />
            <Loading loading={loading}>
                <Header />
                <Sidebar />
                <Routing />
                <Footer />
            </Loading>
        </BrowserRouter>
    );
};

export default App;
