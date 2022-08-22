// * react/next
import AppContext from './AppContext';

// * hooks
import useMessage from 'hooks/useMessage';
import useAuth from 'hooks/useAuth';

const AppProvider = ({ children }) => {
    useMessage();
    useAuth();

    return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export default AppProvider;
