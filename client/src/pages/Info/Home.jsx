// React
import { useEffect, useState } from "react";

// Material UI
import { Container } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import CodeIcon from "@mui/icons-material/Code";
import GamesIcon from "@mui/icons-material/Games";
import TerminalIcon from '@mui/icons-material/Terminal';

// HTTP Client
import axios from 'axios';

// Styles
import "../../css/home.css";

const Home = ({setLoading}) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects();
        document.title = "MogCommunity | Главная";
    }, []);

    const fetchProjects = () => {
        // setLoading(true);
        // axios.get("http://localhost:8000/api/v1/projects/get_all")
        //     .then((response) => {
        //         setProjects(response.data.projects);
        //     })
        //     .catch((error) => {
        //     })
        //     .finally(() => {
        //         setLoading(false);
        //     });

        const mockData = [
            {
                id: 1,
                name: "MogCraft",
                description: "Ванильный сервер Minecraft с дружелюбным комьюнити. Присоединяйтесь к нам для совместного выживания, строительства и приключений в чистом мире Minecraft без лишних модификаций.",
                type: "game",
                action: {
                    name: "Сайт",
                    url: "https://mogcraft.ru"
                },
                tags: ["Java", "Minecraft", "Game"]
            },
            {
                id: 2,
                name: "toDev",
                description: "Программа с открытым исходным кодом, предназначенная для командной разработки проектов, предоставляющая базовый набор инструментов для разработки проектов. Основной упор сделан на быстроту и простоту в использовании программы.",
                type: "code",
                action: {
                    name: "GitHub",
                    url: "https://github.com/free3err/toDev"
                },
                tags: ["Python", "GitHub", "Open Source"]
            }
        ];
        setProjects(mockData);
    }

    const renderProjects = () => {
        return projects.map((project) => {
            let projectIcon;
            switch (project.type) {
                case 'game':
                    projectIcon = <GamesIcon className="project-icon" />;
                    break;
                case 'code':
                    projectIcon = <CodeIcon className="project-icon" />;
                    break;
                default:
                    projectIcon = <TerminalIcon className="project-icon" />;
                    break;
            }
            
            return (
                <Grid2 key={project.name} xs={12} md={8} lg={6}>
                    <div className="project-card">
                        <div className="project-header">
                            {projectIcon}
                            <h3 className="project-title">{project.name}</h3>
                        </div>
                        <p className="project-description">
                            {project.description}
                        </p>
                        <a 
                            href={project.action.url} 
                            className="default-button"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {project.action.name}
                        </a>
                    </div>
                </Grid2>
            );
        });
    };

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
                    <Grid2 container spacing={4} justifyContent="space-around" alignItems="center">
                        {renderProjects()}
                    </Grid2>
                </div>
            </Container>
        </>
    );
};

export default Home;
