// React
import { useState, useEffect } from "react";

// HTTP-client
import axios from "axios";

const ProposeIdea = ({isAuthenticated}) => {
    const [ideas, setIdeas] = useState([]);

    const getIdeas = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/v1/ideas`);
        setIdeas(response.data);
    }

    useEffect(() => {
        getIdeas();
    }, []);

    return (
        <>
        </>
    )
}

export default ProposeIdea;