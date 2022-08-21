// * raect/next
import { memo } from 'react';

// * icons
import { BiMessageAdd } from 'react-icons/bi';

const CreateChatBanner = memo(({ handleCreateChatWindow }) => {
    return (
        <>
            <div
                onClick={handleCreateChatWindow}
                className="transition-all duration-[0.4s] bg-secondary text-primary h-96 w-96 flex flex-col items-center justify-center gap-4 rounded-2xl cursor-pointer border-2 border-solid border-gray-200 dark:border-gray-800"
            >
                <h3 className="text-3xl font-medium">Want to create a chat?</h3>
                <BiMessageAdd className="text-9xl" />
                <h5 className="text-4xl font-bold">Click</h5>
            </div>
        </>
    );
});

export default CreateChatBanner;
