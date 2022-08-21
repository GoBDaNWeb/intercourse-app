// * react/next
import Image from 'next/image';

// * redux
import { useSelector } from 'react-redux';

const Logo = () => {
    const { theme } = useSelector((state) => state.theme);

    return (
        <div className="flex items-center w-full text-left">
            {theme === 'dark' ? (
                <Image src="/Logo.svg" alt="Logo" width={62} height={62} />
            ) : (
                <Image
                    src="/carbon_chat-bot.svg"
                    alt="Logo"
                    width={62}
                    height={62}
                />
            )}
            <h3 className="mt-3 font-bold text-2xl text-primary">
                Intercourse
            </h3>
        </div>
    );
};

export default Logo;
