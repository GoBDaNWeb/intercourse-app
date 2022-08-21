import Layout from '../components/layout/Layout';
import '../styles/globals.css';
import AppProvider from 'context/AppProvider';
import { Provider } from 'react-redux';
import store from '../store';

const MyApp = ({ Component, pageProps }) => {
    return (
        <Provider store={store}>
            <AppProvider>
                <Layout>
                    {/* eslint-disable react/jsx-props-no-spreading */}
                    <Component {...pageProps} />
                </Layout>
            </AppProvider>
        </Provider>
    );
};

export default MyApp;
