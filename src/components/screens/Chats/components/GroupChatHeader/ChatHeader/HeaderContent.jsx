// * redux
import { useDispatch, useSelector } from 'react-redux';
import { setOpenMenuGroupChatHeader } from 'store/chatSlice';

// * icons
import { IoMdSettings } from 'react-icons/io';

const HeaderContent = () => {
    const dispatch = useDispatch();

    const { isOpenMenuGroupChatHeader, groupChatData } = useSelector(
        (state) => state.chat,
    );

    const handleOpenMenu = () => {
        dispatch(setOpenMenuGroupChatHeader(!isOpenMenuGroupChatHeader));
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 text-primary font-semibold text-2xl">
                <h4 className="relative">
                    {groupChatData?.chat_title}
                    <span
                        onClick={handleOpenMenu}
                        className="absolute right-[-30px] bottom-1 group-hover:opacity-100 opacity-0 transition cursor-pointer"
                    >
                        <IoMdSettings />
                    </span>
                </h4>
            </div>
        </div>
    );
};

export default HeaderContent;
