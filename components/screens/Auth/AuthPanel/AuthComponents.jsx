// * react/next
import { memo, useState, useCallback } from 'react'

// * redux
import {useDispatch} from 'react-redux'
import { clearError } from 'store/authSlice';


// * components
import Login from './Login';
import Register from './Register';

const AuthComponents = memo(() => {
    const [isLogin, setIsLogin] = useState(true)

	const dispatch = useDispatch()

	const selectAuthComponent = useCallback(type => {
		setIsLogin(!isLogin)
		dispatch(clearError())
	}, [])

    return (
        <>
            {
                isLogin
                ? <Login selectAuthComponent={selectAuthComponent}/> 
                : <Register selectAuthComponent={selectAuthComponent}/>
            }
        </>
    )
})

AuthComponents.displayName = 'AuthComponents';

export default AuthComponents