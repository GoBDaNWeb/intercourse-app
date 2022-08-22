// * redux
import { useSelector, useDispatch } from 'react-redux';
import {
    setTheirProfileData,
    handleOpenTheirProfile,
} from 'store/profileSlice';

// * components
import Avatar from 'components/common/Avatar';

const Members = () => {
    const { groupChatData } = useSelector((state) => state.chat);
    const { isTheirProfileOpen } = useSelector((state) => state.profile);

    const dispatch = useDispatch();

    const openProfile = (user) => {
        dispatch(setTheirProfileData(user.id));
        if (!isTheirProfileOpen) {
            dispatch(handleOpenTheirProfile());
        }
    };

    return (
        <div className="flex flex-col justify-between w-full px-10 gap-3">
            {groupChatData.members?.map((user) => (
                <div key={user.email} className="flex gap-2">
                    <div
                        onClick={() => openProfile(user)}
                        className="cursor-pointer"
                    >
                        <Avatar
                            avatar={user.avatar}
                            username={user.username || user.username_google}
                            size={64}
                            text_size="xl"
                        />
                    </div>
                    <div className="flex flex-col text-primary">
                        <h3 className="font-semibold text-2xl">
                            {user.username || user.username_google}
                        </h3>
                        <h5>{user.email}</h5>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Members;
