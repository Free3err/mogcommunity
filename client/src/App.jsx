// Import frameworks and libs
import { BrowserRouter, useRoutes } from "react-router-dom";

// Import components
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Sidebar from "./components/sidebar/Sidebar";

// Import pages
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contacts from "./pages/Contacts";

// Import modules
import ProtectedRoute from "./modules/security";

// Import others
import ScrollToTop from "./utils/scrollToTop";
import "./css/main.css";
import "./assets/fonts/MontserratAlternates/style.css";

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
            path: "/contacts",
            element: <Contacts />,
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

const App = () => {
    return (
        <>
            <BrowserRouter>
                <ScrollToTop />
                <Header />
                <Sidebar />
                <Routing />
                <Footer />
            </BrowserRouter>
        </>
    );
};

export default App;
