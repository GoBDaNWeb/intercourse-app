// * react/next
import { useState, useEffect } from 'react';

// * redux
import { useSelector } from 'react-redux';

// * hooks
import usePrivatChats from 'hooks/usePrivatChats';

// * components
import ChatItem from './components/ChatItem';
import { ThreeDots } from 'react-loader-spinner';

const ChatList = () => {
    const [filteredChats, setFilteredChats] = useState(null);
    const [searchChats, setSearchChats] = useState(null);

    const { searchValue } = useSelector((state) => state.sidebar);
    const { user } = useSelector((state) => state.auth);

    const { privatChats } = usePrivatChats();

    useEffect(() => {
        const filtered = privatChats.filter(
            (chat) =>
                user.id === chat.created_by.id ||
                user.id === chat.interlocutor.id,
        );
        setFilteredChats(filtered);
    }, [privatChats, user?.id]);

    useEffect(() => {
        if (filteredChats !== null) {
            const search = filteredChats.filter((chat) =>
                chat.chat_title
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()),
            );
            setSearchChats(search);
        }
    }, [filteredChats, searchValue]);

    const chatListCondition = !searchValue?.length && filteredChats !== null;

    const searchChatCondition =
        searchValue?.length > 0 &&
        searchChats !== null &&
        searchChats?.length > 0;

    const loadingChatsCondition =
        filteredChats === null && searchChats === null;

    return (
        <div className="flex flex-col h-full overflow-y-auto w-full custom-scroll">
            {chatListCondition &&
                filteredChats.map((chat) => (
                    <ChatItem key={chat.id} chatData={chat} />
                ))}
            {searchChatCondition &&
                searchChats.map((chat) => (
                    <ChatItem key={chat.id} chatData={chat} />
                ))}
            {loadingChatsCondition && (
                <div className="flex w-full justify-center">
                    <ThreeDots color="#22C55E" />
                </div>
            )}
        </div>
    );
};

export default ChatList;
