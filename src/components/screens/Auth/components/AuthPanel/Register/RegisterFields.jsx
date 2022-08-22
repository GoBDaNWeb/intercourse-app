// * react/next
import { useState, useCallback } from 'react';

// * redux
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from 'store/authSlice';

// * framer-motion
import { motion } from 'framer-motion';

// * components
import { ThreeDots } from 'react-loader-spinner';

const RegisterFields = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [loader, setLoader] = useState(false);

    const dispatch = useDispatch();

    const { error } = useSelector((state) => state.auth);

    const onChange = useCallback((e) => {
        const { value } = e.target;
        const { name } = e.target;
        if (name === 'username') {
            setUsername(value);
        }
        if (name === 'email') {
            setEmail(value);
        }
        if (name === 'password') {
            setPassword(value);
        }
        if (name === 'confirm') {
            setConfirm(value);
        }
    }, []);

    const register = () => {
        dispatch(signUp({ username, email, password, confirm }));
        setLoader(true);
    };

    return (
        <div className="flex flex-col items-center justify-center gap-3 ">
            <div className="flex flex-col items-center">
                <input
                    onChange={onChange}
                    value={username}
                    className="sm:w-96 w-60 h-10 rounded-2xl p-2 outline-none"
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                />
                {username.length < 3 && (
                    <h4 className="text-sm text-center text-gray-200">
                        username must be 3 symbol length or more
                    </h4>
                )}
            </div>
            <input
                onChange={onChange}
                value={email}
                className="sm:w-96 w-60 h-10 rounded-2xl p-2 outline-none"
                type="email"
                name="email"
                placeholder="Enter your email"
            />
            <>
                <input
                    onChange={onChange}
                    value={password}
                    className={`sm:w-96 w-60 h-10 rounded-2xl p-2 outline-none ${
                        error ? 'border-2 border-red-500' : ''
                    }`}
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                />
                {password.length < 6 && (
                    <h4 className="text-sm text-center text-gray-200">
                        password must be 6 symbol length or more
                    </h4>
                )}
            </>
            <>
                <input
                    onChange={onChange}
                    value={confirm}
                    className={`sm:w-96 w-60 h-10 rounded-2xl p-2 outline-none ${
                        error ? 'border-2 border-red-500' : ''
                    }`}
                    type="password"
                    name="confirm"
                    placeholder="Confirm your password"
                />
                {error && (
                    <h4 className="text-sm text-center text-red-500">
                        passwords dont match
                    </h4>
                )}
            </>
            {loader ? (
                <ThreeDots color="#22C55E" />
            ) : (
                <motion.button
                    disabled={
                        username.length < 3 ||
                        email.length < 5 ||
                        password.length < 6
                    }
                    onClick={register}
                    className="bg-white px-8 h-10 rounded-2xl font-bold disabled:opacity-50 disabled:pointer-events-none"
                    whileHover={{
                        scale: 1.05,
                    }}
                    whileTap={{
                        scale: 0.95,
                    }}
                >
                    Sign Up
                </motion.button>
            )}
        </div>
    );
};

export default RegisterFields;
