// * redux
import { useDispatch } from 'react-redux';
import { signInWithProvider } from 'store/authSlice';

// * icons
import { FcGoogle } from 'react-icons/fc';

// * components
import AuthComponents from './AuthComponents';

const AuthPanel = () => {
    const dispatch = useDispatch();

    const handleSignInWithProvider = () => {
        dispatch(signInWithProvider('google'));
    };

    return (
        <div className="z-50">
            <div className="flex flex-col items-center justify-center gap-6 max-w-[280px] sm:max-w-[512px] max-h-[636px] bg-[#273345] rounded-2xl bg-opacity-70 backdrop-blur-sm shadow-md px-16 py-10">
                <AuthComponents />
                <div className="flex items-center justify-center gap-4 text-5xl">
                    <button
                        onClick={handleSignInWithProvider}
                        className="cursor-pointer"
                    >
                        <FcGoogle />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthPanel;
