// * redux
import { useSelector, useDispatch } from 'react-redux';
import { setOpenMenuPrivatChatHeader } from 'store/chatSlice';

// * icons
import { IoMdSettings } from 'react-icons/io';

const HeaderContent = () => {
    const { user } = useSelector((state) => state.auth);
    const { isOpenMenuPrivatChatHeader, privatChatData } = useSelector(
        (state) => state.chat,
    );

    const dispatch = useDispatch();

    const handleOpenMenu = () => {
        dispatch(setOpenMenuPrivatChatHeader(!isOpenMenuPrivatChatHeader));
    };

    return (
        <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-primary font-semibold text-2xl">
                <h4 className="relative">
                    {privatChatData?.chat_title}
                    <span
                        onClick={handleOpenMenu}
                        className="absolute right-[-30px] bottom-1 group-hover:opacity-100 opacity-100 xl:opacity-0  transition cursor-pointer"
                    >
                        <IoMdSettings />
                    </span>
                </h4>
            </div>
            <div className="text-secondary text-sm flex items-center gap-2 px-8">
                this is privat chat with
                {user.id === privatChatData.created_by.id ? (
                    <h4 className="text-primary font-semibold text-lg">
                        {privatChatData?.interlocutor.username ||
                            privatChatData?.interlocutor.username_google}
                    </h4>
                ) : (
                    <h4 className="text-primary font-semibold text-lg">
                        {privatChatData?.created_by.user_metadata.username}
                    </h4>
                )}
            </div>
        </div>
    );
};

export default HeaderContent;
