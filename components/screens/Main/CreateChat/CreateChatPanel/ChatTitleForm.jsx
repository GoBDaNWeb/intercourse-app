

export default function ChatTitleForm({setChatTitle, chatTitle}) {
    const onChangeChatTitle = (e) => {
        const {value} = e.target
        setChatTitle(value)
    }
    return (
        <label className='flex flex-col items-center'>
            <div className='text-center text-primary text-2xl font-semibold relative w-full'>
                <h3>
                    chat title
                </h3>
            </div>
            <input 
                onChange={onChangeChatTitle}
                className='transition-all duration-[0.4s] text-primary bg-primary outline-none px-4 py-2 rounded-[20px] border-2 border-solid border-gray-200 dark:border-gray-800 bg-opacity-80'
                placeholder='enter title'
                value={chatTitle}
                type="text"
            />
        </label>
    )
}