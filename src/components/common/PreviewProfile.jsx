// * react/next
import { useRouter } from 'next/router';

// * redux
import { useSelector, useDispatch } from 'react-redux';
import { handleOpenProfile } from 'store/profileSlice';
import { signOut } from 'store/authSlice';

// * supabase
import { updateUserStatus } from 'supabase/modules/user';

// * icons
import { ImExit } from 'react-icons/im';
import { IoMdSettings } from 'react-icons/io';

// * components
import Avatar from 'components/common/Avatar';

const PreviewProfile = () => {
    const { user, avatar } = useSelector((state) => state.auth);
    const { isProfileOpen } = useSelector((state) => state.profile);

    const router = useRouter();

    const dispatch = useDispatch();

    const handleSignOut = () => {
        updateUserStatus(user.id, 'OFFLINE');
        dispatch(signOut());
        router.push('/');
    };

    const openProfile = () => {
        dispatch(handleOpenProfile());
    };

    const username = user?.user_metadata.name
        ? user?.user_metadata.name
        : user?.user_metadata.username;

    return (
        <div
            className={`flex items-center justify-center gap-4 group py-2 transition ${
                isProfileOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
            } `}
        >
            <Avatar
                avatar={avatar}
                username={username}
                size={64}
                text_size="7xl"
            >
                <div
                    onClick={openProfile}
                    className="absolute flex justify-center text-xl items-center w-8 h-8 bg-accent rounded-full -top-2 -right-2 border-2 border-solid border-white dark:border-[#283141] cursor-pointer opacity-0 group-hover:opacity-100 transition"
                >
                    <IoMdSettings />
                </div>
            </Avatar>
            <div className="w-[60%]">
                <h2 className="font-semibold text-[3.4vw] xl:text-[1.4vw] sm:text-[2.4vw] md:text-[1.8vw] text-primary">
                    {username}
                </h2>
                <h4 className="text-secondary text-[3vw] xl:text-[1vw] sm:text-[2vw] md:text-[1.4vw]">
                    {user?.email}
                </h4>
            </div>
            <button
                onClick={handleSignOut}
                className="text-3xl pl-2 text-primary"
            >
                <ImExit />
            </button>
        </div>
    );
};

export default PreviewProfile;
