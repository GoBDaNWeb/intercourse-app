// * redux
import { useSelector } from 'react-redux';

// * components
import Avatar from 'components/common/Avatar';

const Creator = () => {
    const { privatChatData } = useSelector((state) => state.chat);

    const username =
        privatChatData.created_by?.user_metadata.username_google ||
        privatChatData.created_by?.user_metadata.username;

    return (
        <div className="flex gap-4">
            <Avatar
                avatar={privatChatData.created_by?.avatar}
                username={username}
                size={64}
                text_size="xl"
            />
            <div>
                <h3 className="font-semibold text-2xl">{username}</h3>
                <h5>{privatChatData.created_by?.email}</h5>
            </div>
        </div>
    );
};

export default Creator;
