// * react/next
import { useRef, useEffect, useState } from 'react';

// * redux
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from 'store/themeSlice';

const Switcher = () => {
    const [checkBoxChange, setCheckBoxChange] = useState(false);

    const { theme } = useSelector((state) => state.theme);
    const dispatch = useDispatch();

    const checkbox = useRef(null);

    useEffect(() => {
        checkbox.current.checked = theme === 'dark';
    }, []);

    const onChange = () => {
        setCheckBoxChange(!checkBoxChange);
        dispatch(setTheme(checkbox.current.checked ? 'dark' : 'light'));
        localStorage.setItem(
            'isDarkTheme',
            checkbox.current.checked ? 'dark' : 'light',
        );
    };

    return (
        <div className="flex items-center gap-2 text-primary">
            <h5>light</h5>
            <label className="relative" htmlFor="toggle-switch">
                <input
                    onChange={onChange}
                    type="checkbox"
                    ref={checkbox}
                    id="toggle-switch"
                    className=" cursor-pointer w-14 h-6 rounded-full appearance-none bg-accent transition duration-200 relative"
                />
            </label>
            <h5>dark</h5>
        </div>
    );
};

export default Switcher;
