// * icons
import { AiOutlineSearch } from 'react-icons/ai';

const SearchInput = ({ fn }) => {
    return (
        <label
            htmlFor="searchInput"
            className="flex items-center rounded-full border-2 border-solid border-gray-200 dark:border-gray-800 h-12 w-full bg-opacity-80 text-secondary px-4 mt-2"
        >
            <div className=" text-4xl">
                <AiOutlineSearch />
            </div>
            <input
                onChange={fn}
                className="w-full bg-transparent outline-none text-xl font-semibold px-2 text-secondary"
                type="text"
                placeholder="Search chat"
                id="searchInput"
            />
        </label>
    );
};

export default SearchInput;
