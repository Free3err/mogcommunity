// React
import React, { useEffect, useState } from "react";

// Material UI
import Grid2 from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";

// HTTP Client
import axios from "axios";

// Styles
import "../../css/developers.css";

const getAgeString = (age) => {
    const lastDigit = age % 10;
    const lastTwoDigits = age % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return "лет";
    if (lastDigit === 1) return "год";
    if (lastDigit >= 2 && lastDigit <= 4) return "года";
    return "лет";
};

const Developers = ({ setIsLoading }) => {
    const [developers, setDevelopers] = useState([]);

    useEffect(() => {
        fetchDevelopers();
        document.title = "MogCommunity | Разработчики";
    }, []);

    const fetchDevelopers = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/v1/developers`);
        if (response.data.ok) {
            setDevelopers(response.data.developers);
        }
    };

    const renderDevelopers = () => {
        return developers.map((dev) => (
            <Grid2
                xs={10}
                md={3.5}
                lg={3.5}
                key={dev.id}
                className="developer-card"
            >
                <h2>{dev.nickname}</h2>
                <div className="developer-info">
                    <p>{dev.rank}</p>
                    <p>
                        {dev.age} {getAgeString(dev.age)}
                    </p>
                </div>
                <div className="resources-buttons">
                    {(dev.resources) ? dev.resources.map((resource) => (
                        <a
                            key={`${dev.id}-${resource.name}`}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="default-button resources-button"
                        >
                            {resource.name}
                        </a>
                    )) : ''}
                </div>
            </Grid2>
        ));
    };

    return (
        <Container
            maxWidth="lg"
            style={{ paddingTop: "4rem", paddingBottom: "4rem" }}
        >
            <div className="hero-section">
                <h1 className="hero-title">Наши разработчики</h1>
            </div>
            <Grid2
                container
                spacing={8}
                justifyContent="space-around"
                style={{ margin: "0 auto" }}
            >
                {renderDevelopers()}
            </Grid2>
        </Container>
    );
};

export default Developers;
