// * react
import { useCallback } from 'react';

// * redux
import { useSelector, useDispatch } from 'react-redux';
import { setSearchValue, handleTypeChats } from 'store/sidebarSlice';

// * components
import SearchInput from 'components/ui/SearchInput';
import SidebarButton from 'components/ui/SidebarButton';

const SidebarForm = () => {
    const { isPrivatChats } = useSelector((state) => state.sidebar);

    const dispatch = useDispatch();

    const onChange = useCallback(
        (e) => {
            const { value } = e.target;
            dispatch(setSearchValue(value));
        },
        [dispatch],
    );

    return (
        <div className="flex flex-col gap-2 items-center justify-center h-full w-full px-2">
            <SearchInput fn={onChange} />
            <div className="flex justify-center items-center px-4 mb-2 gap-[1px]">
                <SidebarButton
                    fn={() => dispatch(handleTypeChats())}
                    isLeft
                    condition={isPrivatChats}
                    text="private chats"
                />
                <SidebarButton
                    fn={() => dispatch(handleTypeChats())}
                    isLeft={false}
                    condition={!isPrivatChats}
                    text="group chats"
                />
            </div>
        </div>
    );
};

export default SidebarForm;
