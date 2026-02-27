import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({ theme: 'light', toggleTheme: () => { } });

export const useTheme = () => useContext(ThemeContext);

const getInitialTheme = () => {
    // 1. Respect explicit user preference stored in localStorage
    const stored = localStorage.getItem('acrtech-theme');
    if (stored === 'dark' || stored === 'light') return stored;

    // 2. Auto dark after 20:00 (8 PM) Turkey Time (UTC+3)
    const utcHours = new Date().getUTCHours();
    const trHour = (utcHours + 3) % 24;
    if (trHour >= 20 || trHour < 6) return 'dark';

    return 'light';
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('acrtech-theme', theme);
    }, [theme]);

    // Auto-switch at 22:00 if user hasn't manually toggled
    useEffect(() => {
        const checkTime = () => {
            const stored = localStorage.getItem('acrtech-theme-manual');
            if (stored === 'true') return; // user manually toggled, don't auto-switch
            // Auto-switch at 20:00 Turkey Time
            const utcHours = new Date().getUTCHours();
            const trHour = (utcHours + 3) % 24;
            const shouldBeDark = trHour >= 20 || trHour < 6;
            setTheme(shouldBeDark ? 'dark' : 'light');
        };

        // Check every minute
        const interval = setInterval(checkTime, 60_000);
        return () => clearInterval(interval);
    }, []);

    const toggleTheme = () => {
        localStorage.setItem('acrtech-theme-manual', 'true');
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
