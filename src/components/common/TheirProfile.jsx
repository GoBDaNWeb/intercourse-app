// * react/next
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// * redux
import { useSelector, useDispatch } from 'react-redux';
import { handleOpenTheirProfile } from 'store/profileSlice';

// * supabase
import { fetchCurrentUser, fetchUserAvatar } from 'supabase/modules/user';
import { addPrivatChat } from 'supabase/modules/chat';

// * icons
import { AiOutlineClose } from 'react-icons/ai';

// * components
import Avatar from './Avatar';

const TheirProfile = () => {
    const [avatarUrl, setAvatarUrl] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [chatTitle, setChatTitle] = useState('');

    const router = useRouter();

    const { theirProfileData } = useSelector((state) => state.profile);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleFetchCurrentUser = async () => {
        const response = await fetchCurrentUser(theirProfileData);
        setCurrentUser(response);
    };

    const handleFetchAvatar = async () => {
        const response = await fetchUserAvatar(theirProfileData);
        setAvatarUrl(response);
    };

    useEffect(() => {
        handleFetchCurrentUser();
        handleFetchAvatar();
    }, [theirProfileData]);

    const randomId = (len) => {
        return Math.random().toString(36).substr(3, len);
    };

    const newChat = () => {
        const id = randomId(15);
        addPrivatChat(id, user, currentUser, chatTitle);
        router.push({
            pathname: '/chats/[id]',
            query: { type: 'p', id: `${id}` },
        });
    };

    const onChange = (e) => {
        const { value } = e.target;
        setChatTitle(value);
    };

    const handleOpenTheirProfileFunc = () => {
        dispatch(handleOpenTheirProfile());
    };

    const username = currentUser?.username
        ? currentUser?.username
        : currentUser?.username_google;

    return (
        <div>
            <div className="flex flex-col items-center py-10 justify-center w-full">
                <Avatar
                    avatar={avatarUrl}
                    username={username}
                    size={208}
                    text_size="7xl"
                />
                <div className="text-center mt-2">
                    <h2 className="font-semibold text-4xl text-primary">
                        {username}
                    </h2>
                    <h4 className="text-secondary">{currentUser?.email}</h4>
                </div>
                <div className="mt-10 flex flex-col items-center text-primary">
                    <h5 className="font-semibold">
                        you can create a private chat with this user
                    </h5>
                    <div className="flex flex-col items-center gap-2">
                        <input
                            onChange={onChange}
                            className="text-primary bg-primary outline-none px-4 py-2 rounded-[20px] border-2 border-solid border-gray-200 dark:border-gray-800 bg-opacity-80"
                            placeholder="enter title"
                            type="text"
                        />
                        <button
                            disabled={!chatTitle.length}
                            onClick={newChat}
                            className="text-accent text-xl bg-accent px-4 rounded-full bg-opacity-80 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            create
                        </button>
                    </div>
                </div>
                <div
                    onClick={handleOpenTheirProfileFunc}
                    className="absolute right-2 top-6 text-2xl text-primary cursor-pointer"
                >
                    <AiOutlineClose />
                </div>
            </div>
        </div>
    );
};

export default TheirProfile;
