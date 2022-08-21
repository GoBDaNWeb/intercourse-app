import { useRouter } from 'next/router';

// * icons
import { TiArrowBackOutline } from 'react-icons/ti';

// * components
import Burger from 'components/ui/Burger';
import HeaderContent from './HeaderContent';

const ChatHeader = () => {
    const router = useRouter();

    const redirectToMain = () => {
        router.push('/main');
    };

    return (
        <div className="z-50 fixed top-0 left-0 right-0 w-full flex justify-center h-14 bg-secondary border-b-2 border-solid border-gray-200 dark:border-gray-800 group shadow">
            <Burger />
            <div
                onClick={redirectToMain}
                className="absolute right-4 xl:left-4 xl:right-[100%] top-4 text-2xl text-secondary cursor-pointer z-50 hover:scale-105"
            >
                <TiArrowBackOutline />
            </div>
            <HeaderContent />
        </div>
    );
};

export default ChatHeader;
