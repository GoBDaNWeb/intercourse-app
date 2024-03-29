// * redux
import { useSelector } from 'react-redux';

// *  framer-motion
import { motion, AnimatePresence } from 'framer-motion';

// * components
import Profile from 'components/common/Profile';
import TheirProfile from 'components/common/TheirProfile';
import PreviewProfile from 'components/common/PreviewProfile';

const variant = {
    open: {
        height: '100vh',
        transition: {
            duration: 0.3,
            damping: 45,
            stiffness: 900,
        },
    },
    close: {
        height: '80px',
        transition: {
            duration: 0.5,
            damping: 45,
            stiffness: 900,
        },
    },
};

const SidebarProfile = () => {
    const { isProfileOpen, isTheirProfileOpen } = useSelector(
        (state) => state.profile,
    );

    return (
        <div className="relative min-h-[80px]">
            <AnimatePresence exitBeforeEnter>
                {isTheirProfileOpen && (
                    <motion.div
                        className="absolute bottom-0 border-t-2  border-solid border-gray-200 dark:border-gray-800 w-full h-[80px] bg-secondary "
                        variants={variant}
                        animate={isTheirProfileOpen ? 'open' : 'close'}
                        exit="close"
                    >
                        <TheirProfile />
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.div
                className="absolute bottom-0 border-t-2  border-solid border-gray-200 dark:border-gray-800 w-full bg-secondary "
                variants={variant}
                animate={isProfileOpen ? 'open' : 'close'}
            >
                <Profile />
                <PreviewProfile />
            </motion.div>
        </div>
    );
};

export default SidebarProfile;
