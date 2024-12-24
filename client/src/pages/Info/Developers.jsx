// React
import { useEffect, useState } from "react";

// Material UI
import Grid2 from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";

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

const Developers = ({setLoading}) => {
    const [developers, setDevelopers] = useState([]);

    useEffect(() => {
        document.title = "MogCommunity | Разработчики";
        fetchDevelopers();
    }, []);

    const fetchDevelopers = () => {
        // setLoading(true);
        // axios.get("http://localhost:8000/api/v1/developers/get_all")
        //     .then((response) => {
        //         setDevelopers(response.data.developers);
        //     })
        //     .catch((error) => {
        //     })
        //     .finally(() => {
        //         setLoading(false);
        //     });
        const mockData = [
            {
                id: 1,
                nickname: "free3err",
                rank: "React разработчик",
                age: 14,
                resources: [
                    {
                        name: "GitHub",
                        url: "https://github.com/free3err",
                    },
                    {
                        name: "Telegram",
                        url: "https://t.me/free3err",
                    },
                ],
            },
            {
                id: 2,
                nickname: "fiodop",
                rank: "Backend-Java разработчик",
                age: 19,
                resources: [
                    {
                        name: "GitHub",
                        url: "https://github.com/fiodop",
                    },
                    {
                        name: "Telegram",
                        url: "https://t.me/fiodop",
                    },
                ],
            },
            {
                id: 3,
                nickname: "da1loks",
                rank: "PHP разработчик",
                age: 14,
                resources: [
                    {
                        name: "GitHub",
                        url: "https://github.com/da1loks",
                    },
                    {
                        name: "Telegram",
                        url: "https://t.me/da1loks",
                    },
                ],
            },
        ];
        setDevelopers(mockData);
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
                    {dev.resources.map((resource) => (
                        <a
                            key={`${dev.id}-${resource.name}`}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="default-button resources-button"
                        >
                            {resource.name}
                        </a>
                    ))}
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
