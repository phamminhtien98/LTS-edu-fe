import { createContext, useState } from 'react';

export const PhatTuContext = createContext();

export const PhatTuProvider = ({ children }) => {
    const [phatTu, setPhatTu] = useState(null);

    return (
        <PhatTuContext.Provider value={{ phatTu, setPhatTu }}>
            {children}
        </PhatTuContext.Provider>
    );
};