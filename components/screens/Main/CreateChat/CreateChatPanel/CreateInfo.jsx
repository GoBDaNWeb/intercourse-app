// * react/next
import {memo} from 'react'

// * framer-motion
import {motion} from 'framer-motion'

const CreateInfo = memo(({selectedUsers, chatTitle, createChat}) => {
    return (
        <div className='flex flex-col gap-1 items-center justify-center'>
            <div className='h-8'>
                {
                    selectedUsers?.length 
                    ? (
                        <h6 className='text-secondary text-sm'>
                            you create 
                                <span className='italic font-bold'>
                                    {selectedUsers?.length > 1 ? 'group' : 'privat'}
                                </span>  
                            chat
                        </h6>
                    ) : null
                }
            </div>
            <motion.button 
                disabled={!chatTitle?.length || !selectedUsers?.length}
                onClick={createChat}
                className='text-accent text-xl bg-accent px-4 rounded-full bg-opacity-80 disabled:opacity-50 disabled:pointer-events-none'
                whileHover={{
                    scale: 1.05
                }}
            >
                create
            </motion.button>
        </div>
    )
})

CreateInfo.displayName = 'CreateInfo';

export default CreateInfo