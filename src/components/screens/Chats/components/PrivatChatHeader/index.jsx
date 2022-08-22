// * react/next
import { useEffect } from 'react';
import { useRouter } from 'next/router';

// * redux
import { useDispatch, useSelector } from 'react-redux';
import { setOpenMenuPrivatChatHeader } from 'store/chatSlice';

// * components
import ChatHeader from './ChatHeader';
import ChatMenu from './ChatMenu';

const PrivatChatHeader = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { privatChatData } = useSelector((state) => state.chat);

    useEffect(() => {
        dispatch(setOpenMenuPrivatChatHeader(false));
    }, [router.query.id]);

    return (
        <>
            {privatChatData && (
                <>
                    <ChatHeader />
                    <ChatMenu />
                </>
            )}
        </>
    );
};

export default PrivatChatHeader;
