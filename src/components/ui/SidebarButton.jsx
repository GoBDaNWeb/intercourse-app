const SidebarButton = ({fn, isLeft, condition, text}) => {
    return (
        <button 
            onClick={() => fn()}
            className={`border-2 border-solid border-gray-200 dark:border-gray-800 bg-opacity-80 py-2  font-semibold w-40 ${isLeft ? 'rounded-l-full' : 'rounded-r-full'} ${condition ? 'bg-accent border-0 text-accent pointer-events-none' : ''}`}
        >
            {text}
        </button>
    )
}

export default SidebarButton