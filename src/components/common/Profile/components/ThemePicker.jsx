// * redux
import { useDispatch, useSelector } from 'react-redux';
import { setBgChat } from 'store/chatSlice';

const themeTypes = ['standart', 'galaxy', 'ocean', 'sunset', 'emerald'];

const ThemePicker = () => {
    const dispatch = useDispatch();

    const { bgChat } = useSelector((state) => state.chat);

    const setBgChatTheme = (bg) => {
        localStorage.setItem('bgChat', bg);
        dispatch(setBgChat(bg));
    };

    return (
        <>
            <div className="flex flex-col items-center mt-6 w-full h-full">
                <h4 className="font-semibold text-primary">
                    select chat theme
                </h4>
                <div className="flex flex-wrap gap-2 text-center justify-center text-secondary">
                    {themeTypes.map((theme) => (
                        <div
                            key={theme}
                            onClick={() => setBgChatTheme(theme)}
                            className="cursor-pointer flex flex-col items-center gap-2 rounded-xl bg-black bg-opacity-40 p-2 h-24"
                        >
                            <div
                                className={`w-12 h-12 rounded-xl bg-chat-${theme} cursor-pointer border-2 border-solid border-gray-200 dark:border-gray-800`}
                            />
                            <div
                                className={`w-4 h-4 rounded-full transition-all duration-[0.3s] ${
                                    bgChat === theme
                                        ? 'bg-green-500'
                                        : 'bg-white'
                                }`}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-chat-standart hidden" />
            <div className="bg-chat-galaxy hidden" />
            <div className="bg-chat-ocean hidden" />
            <div className="bg-chat-sunset hidden" />
            <div className="bg-chat-emerald hidden" />
        </>
    );
};

export default ThemePicker;
