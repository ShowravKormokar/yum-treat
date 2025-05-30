import React, { useState, useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FoodsContext } from '../../Context/FoodsContext';

const SearchBar = () => {
    const { foods } = useContext(FoodsContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        if (term.trim() === '') {
            setSuggestions([]);
            return;
        }

        const filtered = foods.filter(food =>
            food.name.toLowerCase().includes(term) ||
            (Array.isArray(food.tags) && food.tags.some(tag => tag.toLowerCase().includes(term)))
        );

        setSuggestions(filtered.slice(0, 5)); // Limit to 5 suggestions
    };


    const handleSelect = (productName) => {
        navigate(`/search/${productName}`);
        setSearchTerm('');
        setSuggestions([]);
    };

    const handleSearchClick = () => {
        if (searchTerm.trim() !== '') {
            navigate(`/search/${searchTerm}`);
            setSearchTerm('');
            setSuggestions([]);
        }
    };

    return (
        <div className="fixed top-15 left-0 right-0 bg-white p-6 flex flex-col items-center shadow-md z-40">
            <div className="flex w-full justify-center">
                <input
                    type="search"
                    placeholder="Search here..."
                    className="border p-2 w-1/2"
                    value={searchTerm}
                    onChange={handleChange}
                />
                <button
                    className="bg-[#c34c2e] rounded-lg ml-2 p-2 cursor-pointer hover:bg-black   "
                    onClick={handleSearchClick}
                >
                    <FaSearch className="text-2xl text-white " />
                </button>
            </div>

            {suggestions.length > 0 && (
                <ul className="bg-white border w-1/2 mt-2 rounded shadow">
                    {suggestions.map((item) => (
                        <li
                            key={item._id}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSelect(item.name)}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
