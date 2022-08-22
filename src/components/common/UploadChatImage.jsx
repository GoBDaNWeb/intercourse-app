// *react/next
import { memo } from 'react';

// * redux
import { useSelector } from 'react-redux';

// * hooks
import useUploadChatImage from 'hooks/useUploadChatImage';

// * icons
import { AiFillCamera } from 'react-icons/ai';

// * components
import ChatImage from './ChatImage';

const UploadChatImage = memo(({ isPrivate, size, text_size }) => {
    const { privatChatData, groupChatData } = useSelector(
        (state) => state.chat,
    );

    const { uploading, uploadImage } = useUploadChatImage(isPrivate);

    return (
        <label
            className="relative flex justify-center items-center text-8xl font-bold text-accent grad-1 rounded-full group cursor-pointer"
            htmlFor="single"
            style={{ height: size, width: size }}
        >
            {isPrivate && (privatChatData || groupChatData) ? (
                <ChatImage
                    image={privatChatData?.image}
                    chatTitle={privatChatData.chat_title}
                    size={size}
                    text_size={text_size}
                />
            ) : (
                <ChatImage
                    image={groupChatData?.image}
                    chatTitle={groupChatData.chat_title}
                    size={size}
                    text_size={text_size}
                />
            )}
            <div className="absolute text-white text-5xl flex flex-col justify-center items-center group-hover:opacity-100 opacity-0 transition cursor-pointer bg-black bg-opacity-20 w-full h-full rounded-full">
                <AiFillCamera />
                <h4 className="text-sm">upload photo</h4>
            </div>
            {uploading && (
                <h4 className="absolute flex flex-col justify-center items-center text-lg bg-black bg-opacity-20 w-full h-full rounded-full transition">
                    uploading ...
                </h4>
            )}
            <input
                style={{
                    visibility: 'hidden',
                    position: 'absolute',
                }}
                type="file"
                id="single"
                accept="image/*"
                onChange={uploadImage}
                disabled={uploading}
            />
        </label>
    );
});

export default UploadChatImage;
