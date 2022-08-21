// * react/next;
import { memo, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Howl } from 'howler';

// * redux
import { useSelector } from 'react-redux';

// * supabase
import { updateUserTyping } from 'supabase/modules/user';
import { addMessage } from 'supabase/modules/message';

// * framer-motion
import { motion } from 'framer-motion';

// * icons
import { BsEmojiSmile } from 'react-icons/bs';

// * components
import { ThreeDots } from 'react-loader-spinner';
import SendButton from './SendButton';

const Picker = dynamic(
    () => {
        return import('emoji-picker-react');
    },
    { ssr: false },
);

const ChatFooter = memo(({ typingData }) => {
    const [showPicker, setShowPicker] = useState(false);
    const [value, setValue] = useState('');

    const { user, avatar } = useSelector((state) => state.auth);

    const router = useRouter();
    const { id: chatId } = router.query;

    const callSound = (src) => {
        const sound = new Howl({
            src,
            html5: true,
        });
        sound.play();
    };

    const onChange = (e) => {
        const { value } = e.target;
        setValue(value);
    };

    const onEmojiClick = (emojiObject) => {
        setValue(value + emojiObject.emoji);
    };

    const handleOpenPicker = () => {
        setShowPicker(!showPicker);
    };

    const sendMessage = (value) => {
        const authorCondition = user.user_metadata.name
            ? user.user_metadata.name
            : user.user_metadata.username;
        const message = {
            message: value,
            user_id: user.id,
            chat_id: chatId,
            author: authorCondition,
            author_avatar: avatar,
        };
        addMessage(message);
    };

    const sendMessageMouse = () => {
        sendMessage(value);
        setValue('');
        callSound('/sendMessage.mp3');
    };

    const sendMessageEnter = (e) => {
        if (e.code === 'Enter') {
            sendMessage(value);
            setValue('');
            callSound('/sendMessage.mp3');
        }
    };

    const typingCondition =
        typingData !== null &&
        typingData.chat === router.query.id &&
        typingData.typing;

    return (
        <div className="fixed bottom-0 w-full bg-secondary h-16 border-t-2 border-solid border-gray-200 dark:border-gray-800 p-2">
            {showPicker && (
                <div className="absolute bottom-[60px] left-[270px]">
                    <Picker
                        onEmojiClick={onEmojiClick}
                        pickerStyle={{
                            width: '20rem',
                            boxShadow:
                                '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                        }}
                    />
                </div>
            )}
            {typingCondition && (
                <motion.div className="absolute flex items-center gap-2 justify-center -top-7 right-0 left-0 m-auto text-center w-full italic text-secondary">
                    {typingData.name} is typing a message{' '}
                    <ThreeDots color="#6B7280" height={12} width={25} />
                </motion.div>
            )}
            <div className="flex justify-center gap-2 items-center h-full w-full">
                <div
                    onClick={handleOpenPicker}
                    className="text-3xl text-secondary dark:text-gray-900 cursor-pointer"
                >
                    <BsEmojiSmile />
                </div>
                <input
                    onBlur={() => updateUserTyping(user.id, true, false)}
                    onFocus={() => updateUserTyping(user.id, false, true)}
                    onKeyUp={sendMessageEnter}
                    onChange={onChange}
                    value={value}
                    className="w-[50%] px-2 border-2 border-solid text-primary bg-secondary border-gray-200 dark:border-gray-800 rounded-full h-full outline-none"
                    type="text"
                    placeholder="message"
                />
                <SendButton value={value} sendMessageMouse={sendMessageMouse} />
            </div>
        </div>
    );
});

ChatFooter.displayName = 'ChatFooter';

export default ChatFooter;
