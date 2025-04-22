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
    
    const fetchProjects = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/v1/projects`);
        if (response.data.ok) {
            setProjects(response.data.projects);
        }
    }

    const renderProjects = () => {
        return projects.map((project) => (
            <Grid xs={12} sm={6} md={3.75} key={project.id}>
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
        <Container maxWidth="xl" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
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
