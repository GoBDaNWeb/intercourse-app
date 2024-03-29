// * react
import { memo } from 'react';

// * moment
import moment from 'moment';

const OwnMessage = memo(({ messageData }) => {
    const { message, inserted_at } = messageData;

    return (
        <div className="flex items-center justify-end w-full min-h-10 pl-40">
            <div className="flex gap-2 items-end min-h-10 min-w-20 max-w-[85%] bg-[#21978B] text-white p-2 rounded-2xl shadow-custom">
                {message}
                <div className="relative w-14">
                    <span className="absolute right-0 bottom-0 text-sm bg-black bg-opacity-10 px-2 rounded-full whitespace-normal">
                        {moment(inserted_at).format('h:mm')}
                    </span>
                </div>
            </div>
        </div>
    );
});

OwnMessage.displayName = 'OwnMessage';

export default OwnMessage;
