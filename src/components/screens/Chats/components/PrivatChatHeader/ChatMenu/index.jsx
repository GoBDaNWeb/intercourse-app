import { useRouter } from 'next/router';

// * redux
import { useSelector, useDispatch } from 'react-redux';
import { setOpenMenuPrivatChatHeader } from 'store/chatSlice';

// * icons
import { AiOutlineEdit } from 'react-icons/ai';

// * components
import UploadChatImage from 'components/common/UploadChatImage';
import Participants from './Participants';

const ChatMenu = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const { isOpenMenuPrivatChatHeader, privatChatData } = useSelector(
        (state) => state.chat,
    );

    const handleOpenMenu = () => {
        dispatch(setOpenMenuPrivatChatHeader(false));
    };

    return (
        <div
            className={`flex flex-col justify-start items-center py-4 pt-28 w-full h-[500px] bg-primary absolute z-10 border-b-2 border-solid border-gray-200 dark:border-gray-800 shadow transition duration-700 ${
                isOpenMenuPrivatChatHeader
                    ? 'translate-y-[0vh] opacity-100'
                    : 'translate-y-[-100vh] opacity-0'
            }`}
        >
            <div
                onClick={handleOpenMenu}
                className="w-12 h-6 absolute bottom-2 cursor-pointer"
            >
                <div className="after:absolute after:bg-white after:w-6 after:h-1 after:left-1 after:bottom-2 after:rotate-[-40deg] before:absolute before:bg-white before:w-6 before:h-1 before:right-1 before:bottom-2 before:rotate-[40deg]" />
            </div>
            <div className="flex flex-col gap-5 items-center w-full">
                <div className="flex flex-col items-center">
                    <UploadChatImage
                        isPrivate
                        id={id}
                        size={128}
                        text_size="6xl"
                    />
                    <div className="relative flex items-center gap-2 text-primary font-semibold text-2xl">
                        {privatChatData.chat_title}
                        <span className="absolute right-[-30px] cursor-pointer group-hover:opacity-100 opacity-0 transition">
                            <AiOutlineEdit />
                        </span>
                    </div>
                </div>
                <Participants />
            </div>
        </div>
    );
};

export default ChatMenu;
