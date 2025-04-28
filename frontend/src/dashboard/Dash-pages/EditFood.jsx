import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FoodsContext } from '../../Context/FoodsContext';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const EditFood = () => {
    const { id } = useParams(); // get the food id from URL
    const navigate = useNavigate();
    const { fetchFoods } = useContext(FoodsContext); // function to re-fetch all foods
    const [foodData, setFoodData] = useState({
        name: '',
        description: '',
        imageUrl: '',
        rating: 0,
        numberOfReviews: 0,
        currentPrice: 0,
        pastPrice: 0,
        category: '',
        tags: [],
        customOrder: false,
        isAvailable: true
    });

    // Fetch food details
    useEffect(() => {
        const fetchFood = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/foods/${id}`);
                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                const data = await res.json();
                setFoodData(data);
            } catch (error) {
                console.error('Error fetching food:', error);
            }
        };
        fetchFood();
    }, [id]);


    // Handle input change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFoodData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/foods/update/${id}`, foodData);
            alert('Food updated successfully!');
            // await fetchFoods();
            navigate(-1); // go back to previous page
        } catch (error) {
            console.error('Error updating food:', error);
            alert('Failed to update food.');
        }
    };

    // Handle delete food
    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this food?');
        if (!confirmDelete) return;
        try {
            await axios.delete(`http://localhost:5000/api/foods/delete/${id}`);
            alert('Food deleted successfully!');
            navigate(-1);
        } catch (error) {
            console.error('Error deleting food:', error);
            alert('Failed to delete food.');
        }
    };

    console.log(foodData);

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-3xl font-bold text-center mb-8">Edit Food</h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                <input
                    type="text"
                    name="name"
                    value={foodData.name}
                    onChange={handleChange}
                    placeholder="Food Name"
                    className="border rounded p-3"
                    required
                />
                <textarea
                    name="description"
                    value={foodData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="border rounded p-3"
                    required
                ></textarea>
                <input
                    type="text"
                    name="imageUrl"
                    value={foodData.imageUrl}
                    onChange={handleChange}
                    placeholder="Image URL"
                    className="border rounded p-3"
                    required
                />
                <input
                    type="number"
                    name="rating"
                    value={foodData.rating}
                    onChange={handleChange}
                    placeholder="Rating"
                    className="border rounded p-3"
                />
                <input
                    type="number"
                    name="numberOfReviews"
                    value={foodData.numberOfReviews}
                    onChange={handleChange}
                    placeholder="Number of Reviews"
                    className="border rounded p-3"
                />
                <input
                    type="number"
                    name="currentPrice"
                    value={foodData.currentPrice}
                    onChange={handleChange}
                    placeholder="Current Price"
                    className="border rounded p-3"
                    required
                />
                <input
                    type="number"
                    name="pastPrice"
                    value={foodData.pastPrice}
                    onChange={handleChange}
                    placeholder="Past Price"
                    className="border rounded p-3"
                />
                <input
                    type="text"
                    name="category"
                    value={foodData.category}
                    onChange={handleChange}
                    placeholder="Category"
                    className="border rounded p-3"
                    required
                />
                <input
                    type="text"
                    name="tags"
                    value={foodData.tags.join(',')}
                    onChange={(e) => setFoodData({ ...foodData, tags: e.target.value.split(',') })}
                    placeholder="Tags (comma separated)"
                    className="border rounded p-3"
                />
                <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="customOrder"
                            checked={foodData.customOrder}
                            onChange={handleChange}
                        />
                        Custom Order
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="isAvailable"
                            checked={foodData.isAvailable}
                            onChange={handleChange}
                        />
                        Available {foodData.isAvailable ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-red-500" />}
                    </label>
                </div>

                <div className="flex justify-between gap-6">
                    <button
                        type="submit"
                        className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition"
                    >
                        Update Food
                    </button>

                    <button
                        type="button"
                        onClick={handleDelete}
                        className="bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition"
                    >
                        Delete Food
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditFood;
