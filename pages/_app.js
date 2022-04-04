import Layout from '../components/Layout'
import {useEffect, useState} from 'react'
import '../styles/globals.css'
import { supabase } from './../utils/supabaseClient';
import Router from 'next/router'
import AppProvider from 'context/AppProvider';

function MyApp({ Component, pageProps }) {
	return (
		<AppProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</AppProvider>
	)
}

export default MyApp
