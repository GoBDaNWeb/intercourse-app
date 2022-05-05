import {useRef, useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setTheme} from 'store/themeSlice'

export default function Switcher() {
    const [checkBoxChange, setCheckBoxChange] = useState(false)
    
    const {theme} = useSelector(state => state.theme)
    const dispatch = useDispatch()
    
    const checkbox = useRef(null)

    // ** при изменении checkBoxChange переключает тему
    useEffect(() => {
        dispatch(setTheme(checkbox.current.checked ? 'dark' : 'light'))
        localStorage.setItem('isDarkTheme', checkbox.current.checked ? 'dark' : 'light')
    }, [checkBoxChange])

    // ** при монтировании менять положение свитчера
    useEffect(() => {
        checkbox.current.checked = theme === 'dark' ? true : false
    }, [])
    
    return (
        <div className='flex items-center gap-2 text-primary'>
            <h5>light</h5>
            <label className='relative' htmlFor='toggle-switch'>
                <input 
                    onChange={() => setCheckBoxChange(!checkBoxChange)}
                    type="checkbox" 
                    ref={checkbox} 
                    id='toggle-switch' 
                    className=' cursor-pointer w-14 h-6 rounded-full appearance-none bg-accent transition duration-200 relative'
                />
            </label>
            <h5>dark</h5>
        </div>
        
    )
}