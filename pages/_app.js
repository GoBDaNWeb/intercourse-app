import Layout from '../components/layout/Layout'
import '../styles/globals.css'
import AppProvider from 'context/AppProvider';
import {Provider} from 'react-redux'
import store from '../store'
import {useMessage} from 'hooks/useMessage'
import {useAuth} from 'hooks/useAuth'

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<AppProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</AppProvider>
		</Provider>
	)
}

export default MyApp
