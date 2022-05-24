import Layout from '../components/Layout'
import '../styles/globals.css'
import AppProvider from 'context/AppProvider';
import {Provider} from 'react-redux'
import store from '../store'
import { ThreeDots } from 'react-loader-spinner';
import { appWithTranslation } from 'next-i18next'

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

export default appWithTranslation(MyApp)
