// * redux
import { useSelector, useDispatch } from 'react-redux';
import {handleOpenSidebar} from 'store/sidebarSlice';

const Burger = () => {
    const {isOpen} = useSelector(state => state.sidebar)

    const dispatch = useDispatch()

    return (
        <div 
            onClick={() => dispatch(handleOpenSidebar())}
            className='z-50 bg-secondary absolute rounded-full left-4 top-3 w-12 h-12 flex items-center justify-center xl:hidden'
        >
            <div className={`w-6 h-[2px] bg-accent after:w-6 after:h-[2px] after:bg-accent after:absolute after:top-4 before:w-4 before:h-[2px] before:bg-accent before:absolute before:bottom-4 ${isOpen ? 'h-0 before:w-6 before:rotate-[45deg] before:bottom-[23px] after:rotate-[-45deg] after:top-[23px] transition-all' : ''}`}>
            </div>
        </div>
    )
}

export default Burger