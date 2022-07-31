// * components
import RegisterFields from './RegisterFields'

export default function Register({selectAuthComponent}) {

    return (
        <div className="flex flex-col items-center gap-4">
            <h2 className='text-center text-lg sm:text-3xl font-bold text-gray-200 mb-6'>
                create new account
            </h2>
            <RegisterFields/>
            <div>
                <h3 
                    onClick={() => selectAuthComponent('Login')}
                    className='underline cursor-pointer transition text-green-400 hover:text-green-500'
                >
                    You already have an account?
                </h3>
            </div>
        </div>
    )
}