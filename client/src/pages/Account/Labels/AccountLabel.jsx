import {useState, useEffect} from "react";

// HTTP Client
import axios from "axios";

const AccountLabel = () => {
    const [userData, setUserData] = useState(
        {
            nickname: "",
            uuid: "",
            registration_date: "",
        }
    );

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/v1/user?by_using=cookies`,
                {
                    withCredentials: true,
                }
            )
            setUserData({
                nickname: response.data.data.username,
                id: response.data.data.id,
                uuid: response.data.data.user_uuid,
                registration_date: response.data.data.created_at,
            });
        } catch (error) {
            alert("Ваши данные не удалось получить!");
        }
    }

    const updateNickname = async () => {
        const newNickname = prompt("Введите новый никнейм");
        if (newNickname) {
            try {
                const response = await axios.patch(`${process.env.REACT_APP_API_URL}/v1/user/nickname`, {
                        newNickname: newNickname,
                    },
                    {withCredentials: true});
                if (response.data.ok) {
                    setUserData((prev) => ({
                        ...prev,
                        nickname: response.data.newNickname
                    }))
                }
            } catch (error) {
                if (error.response.status === 409) {
                    alert("Имя пользователя уже занято")
                } else {
                    alert("Что-то пошло не так");
                }
            }
        }
    };

    const updateSessionId = async () => {
        try {
            const response = await axios.patch(`${process.env.REACT_APP_API_URL}/v1/user`,
                {},
                {withCredentials: true});
            if (response.data.ok) {
                setUserData(prev => ({
                    ...prev,
                    uuid: response.data.user_uuid
                }));
            }
        } catch (error) {
            alert("Что-то пошло не так");
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <>
            <div className="account-info">
                <div className="info-field">
                    <h3>Ваш никнейм</h3>
                    <div className="editable-info">
                        <p>{userData.nickname}</p>
                        <button className="default-button update-button" onClick={updateNickname}>
                            Изменить
                        </button>
                    </div>
                </div>
                <div className="info-field">
                    <h3>Ваш ID</h3>
                    <p>{userData.id}</p>
                </div>
                <div className="info-field">
                    <h3>Ваш UUID сессии</h3>
                    <div className="editable-info">
                        <p>{userData.uuid}</p>
                        <button className="default-button update-button" onClick={updateSessionId}>
                            Обновить
                        </button>
                    </div>
                </div>
                <div className="info-field">
                    <h3>Дата регистрации</h3>
                    <p>{userData.registration_date}</p>
                </div>
            </div>
        </>
    );
};

export default AccountLabel;
