// * components
import LoginFields from './LoginFields';

const Login = ({ isLoginComponent }) => {
    return (
        <div className="flex flex-col items-center gap-4">
            <h2 className="text-center sm:text-3xl text-lg font-semibold text-gray-200 mb-6">
                Login in to your account
            </h2>
            <LoginFields />
            <div className="flex gap-2">
                <h3
                    onClick={() => isLoginComponent(false)}
                    className="underline cursor-pointer transition text-green-400 hover:text-green-500"
                >
                    Dont have account?
                </h3>
            </div>
        </div>
    );
};

export default Login;
