// * react/next
import { useState } from 'react';

// * redux
import { useDispatch } from 'react-redux';
import { clearError } from 'store/authSlice';

// * components
import Login from './Login';
import Register from './Register';

const AuthComponents = () => {
    const [isLogin, setIsLogin] = useState(true);

    const dispatch = useDispatch();

    const isLoginComponent = (boolean) => {
        setIsLogin(boolean);
        dispatch(clearError());
    };

    return (
        <>
            {isLogin ? (
                <Login isLoginComponent={isLoginComponent} />
            ) : (
                <Register isLoginComponent={isLoginComponent} />
            )}
        </>
    );
};

AuthComponents.displayName = 'AuthComponents';

export default AuthComponents;
