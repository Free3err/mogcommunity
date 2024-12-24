import React from "react";
import { Container } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";
import GamesIcon from "@mui/icons-material/Games";
import "../css/home.css";

const Home = () => {
    return (
        <>
            <Container
                maxWidth="lg"
                style={{ paddingTop: "4rem", paddingBottom: "4rem" }}
            >
                {/* Hero Section */}
                <div className="hero-section">
                    <h1 className="hero-title">MogCommunity</h1>
                    <p className="hero-description">
                        Мы - команда энтузиастов, объединенных страстью к
                        созданию уникальных проектов. Наша цель - создавать
                        качественные и увлекательные разработки для нашего
                        сообщества.
                    </p>
                </div>

                {/* Projects Section */}
                <div className="projects-section">
                    <h2 className="projects-title">Наши проекты</h2>

                    <Grid2 container justifyContent="center">
                        <Grid2 xs={12} md={8} lg={6}>
                            <div className="project-card">
                                <div className="project-header">
                                    <GamesIcon className="project-icon" />
                                    выживание и развитие сообщества. Чистый
                                    геймплей, дружелюбная атмосфера и никаких
                                    лишних модификаций - всё, что нужно для
                                    погружения в любимую игру.
                                </p>

                                <Link to="/projects" className="project-button">
                                    Подробнее
                                </Link>
                            </div>
                            <div className="project-card">
                                <div className="project-header">
                                    <GamesIcon className="project-icon" />
                                    <h3 className="project-title">toDev</h3>
                                </div>

                                <p className="project-description">
                                    toDev - программа с открытым исходным кодом
                                    для эффективной командной разработки.
                                    Предоставляет базовый набор инструментов,
                                    необходимых для успешной реализации
                                    проектов. Простой и интуитивно понятный
                                    интерфейс позволяет быстро начать работу без
                                    длительного обучения.
                                </p>

                                <Link to="/projects" className="project-button">
                                    Подробнее
                                </Link>
                            </div>
                        </Grid2>
                    </Grid2>
                </div>
            </Container>
        </>
    );
};

export default Home;
