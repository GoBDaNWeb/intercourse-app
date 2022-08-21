// * redux
import { useSelector } from 'react-redux';

// * components
import Avatar from 'components/common/Avatar';

const Interlocutor = () => {
    const { privatChatData } = useSelector((state) => state.chat);

    const username =
        privatChatData.interlocutor.username_google ||
        privatChatData.interlocutor.username;

    return (
        <div className="flex gap-4">
            <div>
                <h3 className="font-semibold text-2xl">{username}</h3>
                <h5>{privatChatData.interlocutor?.email}</h5>
            </div>
            <Avatar
                avatar={privatChatData.interlocutor.avatar}
                username={username}
                size={64}
                text_size="xl"
            />
        </div>
    );
};

export default Interlocutor;
