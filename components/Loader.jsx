import { motion } from "framer-motion"
  
const ContainerVariants = {
    initial: {
        transition: {
        staggerChildren: 0.2
        }
    },
    animate: {
        transition: {
        staggerChildren: 0.2
        }
    }
};

const DotVariants = {
    initial: {
        y: "0%"
    },
    animate: {
        y: "100%"
    }
};

const DotTransition = {
    duration: 0.5,
    yoyo: Infinity,
    ease: "easeInOut"
};

export default function Loader() {
    return (
        <div>
            <div
            className="flex items-center justify-center w-full"
            >
            <motion.div
                className="w-16 h-10 flex justify-between"
                variants={ContainerVariants}
                initial="initial"
                animate="animate"
            >
                <motion.span
                    className="w-3 h-3 rounded-full block bg-green-500"
                    variants={DotVariants}
                    transition={DotTransition}
                />
                <motion.span
                    className="w-3 h-3 rounded-full bg-green-500"
                    variants={DotVariants}
                    transition={DotTransition}
                />
                <motion.span
                    className="w-3 h-3 rounded-full bg-green-500"
                    variants={DotVariants}
                    transition={DotTransition}
                />
            </motion.div>
            </div>
        </div>
    )
}