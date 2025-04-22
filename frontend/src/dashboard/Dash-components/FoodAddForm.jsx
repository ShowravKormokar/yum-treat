import { useState } from 'react';
import { useCategoryContext } from "../../Context/CategoryContext";

const FoodAddForm = () => {
    const { categories } = useCategoryContext(); // Get categories from context
    const [formData, setFormData] = useState({
        foodName: '',
        foodDescription: '',
        foodImageUrl: '',
        rating: 0,
        numberOfReviewers: 0,
        currentPrice: '',
        pastPrice: '',
        category: '',
        tags: [],
        customOrderAccepted: false,
        isAvailable: true, // New field for food availability
        newTag: ''
    });

    const commonTags = ['spicy', 'chicken', 'roast', 'vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'nut-free', 'seafood', 'cheesy'];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleTagAdd = (tag) => {
        if (!formData.tags.includes(tag)) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, tag],
                newTag: ''
            }));
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the data to your backend API
        console.log('Form submitted:', formData);
        alert('Food item added successfully!');
        // Reset form after submission
        setFormData({
            foodName: '',
            foodDescription: '',
            foodImageUrl: '',
            rating: 0,
            numberOfReviewers: 0,
            currentPrice: '',
            pastPrice: '',
            category: '',
            tags: [],
            customOrderAccepted: false,
            isAvailable: true, // Reset to true
            newTag: ''
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-amber-700 mb-6">Add New Food Item</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Food Name */}
                <div>
                    <label htmlFor="foodName" className="block text-sm font-medium text-gray-700">Food Name *</label>
                    <input
                        type="text"
                        id="foodName"
                        name="foodName"
                        value={formData.foodName}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2 border"
                    />
                </div>

                {/* Food Description */}
                <div>
                    <label htmlFor="foodDescription" className="block text-sm font-medium text-gray-700">Description *</label>
                    <textarea
                        id="foodDescription"
                        name="foodDescription"
                        value={formData.foodDescription}
                        onChange={handleChange}
                        required
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2 border"
                    />
                </div>

                {/* Food Image URL */}
                <div>
                    <label htmlFor="foodImageUrl" className="block text-sm font-medium text-gray-700">Image URL *</label>
                    <input
                        type="url"
                        id="foodImageUrl"
                        name="foodImageUrl"
                        value={formData.foodImageUrl}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2 border"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Rating */}
                    <div>
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating (0-5)</label>
                        <input
                            type="number"
                            id="rating"
                            name="rating"
                            min="0"
                            max="5"
                            step="0.1"
                            value={formData.rating}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2 border"
                        />
                    </div>

                    {/* Number of Reviewers */}
                    <div>
                        <label htmlFor="numberOfReviewers" className="block text-sm font-medium text-gray-700">Number of Reviewers</label>
                        <input
                            type="number"
                            id="numberOfReviewers"
                            name="numberOfReviewers"
                            min="0"
                            value={formData.numberOfReviewers}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2 border"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category *</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2 border"
                        >
                            <option value="">Select a category</option>
                            {categories.map(category => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Current Price */}
                    <div>
                        <label htmlFor="currentPrice" className="block text-sm font-medium text-gray-700">Current Price ($) *</label>
                        <input
                            type="number"
                            id="currentPrice"
                            name="currentPrice"
                            min="0"
                            step="0.01"
                            value={formData.currentPrice}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2 border"
                        />
                    </div>

                    {/* Past Price */}
                    <div>
                        <label htmlFor="pastPrice" className="block text-sm font-medium text-gray-700">Past Price ($)</label>
                        <input
                            type="number"
                            id="pastPrice"
                            name="pastPrice"
                            min="0"
                            step="0.01"
                            value={formData.pastPrice}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2 border"
                        />
                    </div>
                </div>

                {/* Food Availability */}
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="isAvailable"
                        name="isAvailable"
                        checked={formData.isAvailable}
                        onChange={handleChange}
                        className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isAvailable" className="ml-2 block text-sm text-gray-700">
                        This food item is currently available
                    </label>
                </div>

                {/* Tags */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tags</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {formData.tags.map(tag => (
                            <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                {tag}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveTag(tag)}
                                    className="ml-1.5 inline-flex text-amber-500 hover:text-amber-700 focus:outline-none"
                                >
                                    &times;
                                </button>
                            </span>
                        ))}
                    </div>

                    <div className="mt-2">
                        <p className="text-sm text-gray-500 mb-1">Common tags:</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {commonTags.map(tag => (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => handleTagAdd(tag)}
                                    disabled={formData.tags.includes(tag)}
                                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${formData.tags.includes(tag) ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'}`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>

                        <div className="flex">
                            <input
                                type="text"
                                value={formData.newTag}
                                onChange={(e) => setFormData(prev => ({ ...prev, newTag: e.target.value }))}
                                placeholder="Add custom tag"
                                className="flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2 border"
                            />
                            <button
                                type="button"
                                onClick={() => formData.newTag && handleTagAdd(formData.newTag)}
                                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-r-md"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>

                {/* Custom Order Accepted */}
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="customOrderAccepted"
                        name="customOrderAccepted"
                        checked={formData.customOrderAccepted}
                        onChange={handleChange}
                        className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                    />
                    <label htmlFor="customOrderAccepted" className="ml-2 block text-sm text-gray-700">
                        Accept Custom Orders for this item
                    </label>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition duration-150"
                    >
                        Add Food Item
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FoodAddForm;