// * react/next
import AppContext from './AppContext'

// * hooks 
import {useMessage} from 'hooks/useMessage'
import {useAuth} from 'hooks/useAuth'

const AppProvider = (props) => {
    useMessage()
	useAuth()

    return (
        <AppContext.Provider value={{}}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppProvider