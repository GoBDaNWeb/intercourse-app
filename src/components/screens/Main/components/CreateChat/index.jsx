// * react/next
import { useState, useCallback } from 'react';

// * components
import CreateChatBanner from './CreateChatBanner';
import CreateChatPanel from './CreateChatPanel';

const CreateChat = () => {
    const [createChat, setCreateChat] = useState(false);

    const handleCreateChatWindow = useCallback(() => {
        setCreateChat(!createChat);
    }, [createChat]);

    return (
        <div className="flex items-center justify-center w-full">
            {createChat ? (
                <CreateChatPanel
                    handleCreateChatWindow={handleCreateChatWindow}
                />
            ) : (
                <CreateChatBanner
                    handleCreateChatWindow={handleCreateChatWindow}
                />
            )}
        </div>
    );
};

export default CreateChat;
