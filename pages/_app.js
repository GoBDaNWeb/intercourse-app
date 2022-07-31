import Layout from '../components/layout/Layout'
import '../styles/globals.css'
import AppProvider from 'context/App/AppProvider';
import PrivatChatProvider from 'context/PrivatChat/PrivatChatProvider';
import GroupChatProvider from 'context/GroupChat/GroupChatProvider';
import {Provider} from 'react-redux'
import store from '../store'

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<AppProvider>
				<GroupChatProvider>
					<PrivatChatProvider>
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</PrivatChatProvider>
				</GroupChatProvider>
			</AppProvider>
		</Provider>
	)
}

export default MyApp
