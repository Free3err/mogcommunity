// Material UI
import { List, ListItem, ListItemText } from '@mui/material';

// Styles
import './style.css';

const SettingsSelector = ({ selected, onSelect }) => {
    const settings = [
        { id: 'account', label: 'Аккаунт' },
        { id: 'settings', label: 'Настройки' },
        { id: 'logout', label: 'Выйти' },
        { id: "admin-panel", label: "Админ панель" }
    ];

    return (
        <List component="nav">
            {settings.map((setting) => (
                <ListItem
                    key={setting.id}
                    button
                    selected={selected === setting.id}
                    onClick={() => onSelect(setting.id)}
                    className={`settings-item ${selected === setting.id ? 'selected' : ''}`}
                >
                    <ListItemText primary={setting.label} />
                </ListItem>
            ))}
        </List>
    );
};

export default SettingsSelector;
