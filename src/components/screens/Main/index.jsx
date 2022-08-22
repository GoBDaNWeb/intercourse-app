// * react/next
import Head from 'next/head';
import { useEffect } from 'react';

// * redux
import { useSelector } from 'react-redux';

// * supabase
import { updateUserStatus } from 'supabase/modules/user';

// * components
import CreateChat from './components/CreateChat';
import Burger from 'components/ui/Burger';

const Main = () => {
    const { user } = useSelector((state) => state.auth);

    const setUserStatusOffline = (user) => {
        if (user !== null) {
            updateUserStatus(user.id, 'OFFLINE');
        }
    };

    const setUserStatusOnline = (user) => {
        if (user !== null) {
            updateUserStatus(user.id, 'ONLINE');
        }
    };

    useEffect(() => {
        document.addEventListener('visibilitychange', () => {
            // eslint-disable-next-line no-unused-expressions
            document.hidden
                ? setUserStatusOffline(user)
                : setUserStatusOnline(user);
        });
    });

    return (
        <>
            <Head>
                <title>Main</title>
            </Head>
            <div
                id="main"
                className="z-50 border-l-2 border-solid border-gray-200 dark:border-gray-800 transition-all duration-[0.4s] fixed xl:relative top-0 left-0 bottom-0 right-0 flex w-full h-full items-center justify-center bg-primary gap-2 overflow-hidden"
            >
                <Burger />
                <CreateChat />
            </div>
        </>
    );
};

export default Main;
