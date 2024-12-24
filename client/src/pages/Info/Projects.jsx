// React
import { useEffect, useState } from "react";

// Material UI
import { Container } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

// HTTP Client
import axios from "axios";

// Styles
import "../../css/projects.css";

const Projects = ({setLoading}) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects();
        document.title = "MogCommunity | Проекты";
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
        return projects.map((project) => (
            <Grid xs={12} sm={6} md={4.5} key={project.id}>
                <div className="project-card">
                    <div className="project-image">
                    </div>
                    <div className="project-content">
                        <h2>{project.name}</h2>
                        <p>{project.description}</p>
                        <div className="project-tags">
                            {project.tags.map((tag) => (
                                <span className="tag" key={tag}>{tag}</span>
                            ))}
                        </div>
                        <a 
                            href={project.action.url} 
                            className="default-button"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {project.action.name}
                        </a>
                    </div>
                </div>
            </Grid>
        ));
    }

    return (
        <Container maxWidth="lg" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
            <div className="hero-section">
                <h1 className="hero-title">Проекты сообщества</h1>
            </div>
            <Grid 
                container 
                spacing={3} 
                justifyContent="center"
            >
                {renderProjects()}
            </Grid>
        </Container>
    );
};

export default Projects;
