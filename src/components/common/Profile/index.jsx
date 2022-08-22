// * redux
import { useSelector } from 'react-redux';

// * components
import AvatarUpload from './components/AvatarUpload';
import Switcher from 'components/ui/Switcher';
import ThemePicker from './components/ThemePicker';
import Buttons from './components/Buttons';

const Profile = () => {
    const { isProfileOpen } = useSelector((state) => state.profile);
    const { user } = useSelector((state) => state.auth);

    const username = user?.user_metadata.name
        ? user?.user_metadata.name
        : user?.user_metadata.username;

    return (
        <>
            {isProfileOpen && (
                <div className="flex flex-col items-center py-10 justify-center w-full ">
                    <div className="flex flex-col items-center">
                        <AvatarUpload size={208} />
                        <div className="text-center mt-2">
                            <h2 className="font-semibold text-4xl text-primary">
                                {username}
                            </h2>
                            <h4 className="text-secondary">{user?.email}</h4>
                        </div>
                        <Switcher />
                        <ThemePicker />
                    </div>
                    <Buttons />
                </div>
            )}
        </>
    );
};

export default Profile;
