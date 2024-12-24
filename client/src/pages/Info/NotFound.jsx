// React
import { useEffect } from "react";

// Routing
import { Link } from "react-router-dom";

// Styles
import "../../css/not-found.css";

const NotFound = () => {
    useEffect(() => {
        document.title = "MogCommunity | 404";
    }, []);
    return (
        <div className="not-found-container">
            <h1>404</h1>
            <p>Страница не найдена</p>
            <Link to="/" className="default-button">
                Вернуться на главную
            </Link>
        </div>
    );
}
 
export default NotFound;