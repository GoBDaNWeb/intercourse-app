// * react/next
import { useState } from 'react';
import { useRouter } from 'next/router';

// * supabase
import { supabase } from 'supabase/supabaseClient';
import {
    updateGroupChatImage,
    updatePrivateChatImage,
} from 'supabase/modules/chat';

export default function useUploadChatImage(isPrivatChat) {
    const [uploading, setUploading] = useState(false);

    const router = useRouter();

    async function uploadImage(event) {
        try {
            setUploading(true);
            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from(isPrivatChat ? 'image-privat-chats' : 'image-group-chats')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            if (isPrivatChat) {
                updatePrivateChatImage(router.query.id, filePath);
            } else {
                updateGroupChatImage(router.query.id, filePath);
            }
        } catch (error) {
            console.error(error.message);
        } finally {
            setUploading(false);
        }
    }

    return { uploading, uploadImage };
}
