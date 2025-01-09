import { useState } from "react";
import { Container } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

// Components
import SettingsSelector from "../../components/settingsSelector/SettingsSelector";
import AccountLabel from "./Labels/AccountLabel";
import SettingsLabel from "./Labels/SettingsLabel";
import AdminPanel from "../Admin/AdminPanel";
// Modules
import { signOut } from "../../modules/security";

// Styles
import "../../css/settings.css";
import "../../css/settings-labels.css";
const Settings = () => {
    const [selectedSetting, setSelectedSetting] = useState("account");

    const renderSettingComponent = () => {
        switch (selectedSetting) {
            case "account":
                return <AccountLabel />;
            case "settings":
                return <SettingsLabel />;
            case "logout":
                return signOut();
            case "admin-panel":
                return <AdminPanel />;
            default:
                return <AccountLabel />;
        }
    };

    return (
        <Container maxWidth="lg" style={{ padding: "4rem 2rem" }}>
            <div className="hero-section">
                <h1 className="hero-title">Ваш аккаунт</h1>
            </div>
            <Grid2 container spacing={3}>
                <Grid2 xs={12} md={3}>
                    <div className="settings-sidebar">
                        <SettingsSelector
                            selected={selectedSetting}
                            onSelect={setSelectedSetting}
                        />
                    </div>
                </Grid2>
                <Grid2 xs={12} md={9}>
                    <div className="settings-content">
                        {renderSettingComponent()}
                    </div>
                </Grid2>
            </Grid2>
        </Container>
    );
};

export default Settings;
