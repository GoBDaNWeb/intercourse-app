// * react/next
import {memo} from 'react'

// * hooks
import {useAuthPanel} from './useAuthPanel'

// * components
import Login from '../Login/index';
import Register from '../Register/index';

export default memo(function AuthComponents() {
    const {
        modules: {
            authComponent
        },
        commands: {
            selectAuthComponent
        }
    } = useAuthPanel()

    return (
        <>
            {
                authComponent === 'Login'
                && <Login selectAuthComponent={selectAuthComponent}/> 
            }
            {
                authComponent === 'Register'
                && <Register selectAuthComponent={selectAuthComponent}/>
            }
        </>
    )
})