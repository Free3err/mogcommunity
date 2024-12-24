// React
import { useEffect } from "react";

// Material UI
import Container from "@mui/material/Container";

// Styles
import "../../css/about.css";

const About = () => {
    useEffect(() => {
        document.title = "MogCommunity | О нас";
    }, []);
    return (
        <div className="about-container">
            <Container maxWidth="lg" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
                <div className="hero-section">
                    <h1 className="hero-title">О нас</h1>
                </div>
                <div className="about-section">
                    <h2>Команда MogCommunity</h2>
                    <p>
                        MogCommunity - это сообщество энтузиастов, объединенных любовью 
                        к открытому исходному коду и желанием создавать полезные проекты 
                        для всех.
                    </p>
                    <p>
                        Мы верим в силу открытого программного обеспечения и совместной 
                        разработки. Каждый участник нашего сообщества вносит свой 
                        уникальный вклад в развитие проектов, делясь знаниями и опытом.
                    </p>
                    <div className="team-values">
                        <h3>Наши ценности:</h3>
                        <ul>
                            <li><span>Открытый исходный код</span></li>
                            <li><span>Совместное творчество</span></li>
                            <li><span>Обмен знаниями</span></li>
                            <li><span>Доступность для всех</span></li>
                        </ul>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default About;