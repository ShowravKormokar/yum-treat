import { useState } from 'react';
import { useCategoryContext } from "../../Context/CategoryContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:5000/api/foods/add";

const FoodAddForm = () => {
    const { categories } = useCategoryContext();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        imageUrl: '',
        rating: 0,
        numberOfReviews: 0,
        currentPrice: '',
        pastPrice: '',
        category: '',
        tags: [],
        customOrder: false,
        isAvailable: true,
        newTag: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const commonTags = [
        'spicy', 'chicken', 'roast', 'vegetarian', 'vegan',
        'gluten-free', 'dairy-free', 'nut-free', 'seafood', 'cheesy'
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleTagAdd = (tag) => {
        if (tag && !formData.tags.includes(tag)) {
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

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Food name is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.currentPrice || parseFloat(formData.currentPrice) < 0) {
            newErrors.currentPrice = 'Valid current price is required';
        }
        if (!formData.imageUrl.trim()) {
            newErrors.imageUrl = 'Image URL is required';
        }
        if (formData.pastPrice) {
            if (parseFloat(formData.pastPrice) < 0) {
                newErrors.pastPrice = 'Past price cannot be negative';
            } else if (parseFloat(formData.pastPrice) > parseFloat(formData.currentPrice)) {
                newErrors.pastPrice = 'Past price must be ≤ current price';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const foodData = {
                name: formData.name.trim(),
                description: formData.description.trim(),
                imageUrl: formData.imageUrl.trim(),
                rating: parseFloat(formData.rating) || 0,
                numberOfReviews: parseInt(formData.numberOfReviews) || 0,
                currentPrice: parseFloat(formData.currentPrice),
                pastPrice: formData.pastPrice ? parseFloat(formData.pastPrice) : undefined,
                category: formData.category,
                tags: formData.tags.filter(tag => commonTags.includes(tag)),
                customOrder: formData.customOrder,
                isAvailable: formData.isAvailable,
            };

            const response = await axios.post(URL, foodData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            alert('✅ Food item added successfully!');
            // navigate('/foods'); // You can update route according to your app
        } catch (error) {
            console.error('Error adding food:', error);

            if (error.response) {
                if (error.response.data.errors) {
                    const serverErrors = {};
                    error.response.data.errors.forEach(err => {
                        serverErrors[err.path] = err.msg;
                    });
                    setErrors(serverErrors);
                } else {
                    alert(error.response.data.error || '❌ Failed to add food item');
                }
            } else {
                alert('❌ Network error. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-amber-700 mb-6">Add New Food Item</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Food Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Food Name *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2 border ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                {/* Food Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description *</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2 border ${errors.description ? 'border-red-500' : ''}`}
                    />
                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                </div>

                {/* Food Image URL */}
                <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL *</label>
                    <input
                        type="url"
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2 border ${errors.imageUrl ? 'border-red-500' : ''}`}
                    />
                    {errors.imageUrl && <p className="mt-1 text-sm text-red-600">{errors.imageUrl}</p>}
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
                        <label htmlFor="numberOfReviews" className="block text-sm font-medium text-gray-700">Number of Reviewers</label>
                        <input
                            type="number"
                            id="numberOfReviews"
                            name="numberOfReviews"
                            min="0"
                            value={formData.numberOfReviews}
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
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2 border ${errors.category ? 'border-red-500' : ''}`}
                        >
                            <option value="">Select a category</option>
                            {categories.map(category => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))}
                        </select>
                        {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
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
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2 border ${errors.currentPrice ? 'border-red-500' : ''}`}
                        />
                        {errors.currentPrice && <p className="mt-1 text-sm text-red-600">{errors.currentPrice}</p>}
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
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2 border ${errors.pastPrice ? 'border-red-500' : ''}`}
                        />
                        {errors.pastPrice && <p className="mt-1 text-sm text-red-600">{errors.pastPrice}</p>}
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
                        id="customOrder"
                        name="customOrder"
                        checked={formData.customOrder}
                        onChange={handleChange}
                        className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                    />
                    <label htmlFor="customOrder" className="ml-2 block text-sm text-gray-700">
                        Accept Custom Orders for this item
                    </label>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition duration-150 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? 'Adding...' : 'Add Food Item'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FoodAddForm;