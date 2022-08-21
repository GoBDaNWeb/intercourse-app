// * raect/next
import { memo } from 'react';
import Image from 'next/image';

const ChatImage = memo(({ image, chatTitle, size, text_size }) => {
    return (
        <>
            {image ? (
                <Image
                    src={`https://bxnclqtavxncwdogrurd.supabase.co/storage/v1/object/public/image-privat-chats/${image}`}
                    alt="chatImage"
                    className="rounded-full"
                    height={size}
                    width={size}
                />
            ) : (
                <div
                    className={`absolute group-hover:opacity-0 opacity-100 transition text-white text-${text_size}`}
                >
                    {chatTitle[0].toUpperCase()}
                </div>
            )}
        </>
    );
});

export default ChatImage;
