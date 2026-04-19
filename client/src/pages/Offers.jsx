import React from "react";
import ProductCard from "../components/ProductCard";

const offerProducts = [
    {
        id: 101,
        name: "Lipstick Combo",
        price: 299,
        originalPrice: 599,
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa",
    },
    {
        id: 102,
        name: "Stylish Dress",
        price: 999,
        originalPrice: 1999,
        image: "https://images.unsplash.com/photo-1521334884684-d80222895322",
    },
    {
        id: 103,
        name: "Makeup Kit",
        price: 799,
        originalPrice: 1499,
        image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb",
    },
    {
        id: 104,
        name: "Handbag",
        price: 1299,
        originalPrice: 2499,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
    },
    {
        id: 105,
        name: "Perfume",
        price: 699,
        originalPrice: 1299,
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f",
    },
];

const Offers = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-10">

            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">🔥 Today's Offers</h1>
                        <p className="text-gray-500 text-sm">
                            Limited time deals on selected products
                        </p>
                    </div>

                    <span className="text-sm text-gray-400">
                        Hurry before stock ends!
                    </span>
                </div>

                {/* Products */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {offerProducts.map((product) => {
                        const discount = Math.round(
                            ((product.originalPrice - product.price) /
                                product.originalPrice) *
                            100
                        );

                        return (
                            <div key={product.id} className="relative">

                                {/* Discount Badge */}
                                <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded z-10">
                                    {discount}% OFF
                                </span>

                                {/* Product Card */}
                                <div className="bg-white rounded-xl p-3 shadow-sm hover:shadow-lg transition">

                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-48 object-cover rounded"
                                    />

                                    <h3 className="mt-2 font-semibold text-gray-800">
                                        {product.name}
                                    </h3>

                                    {/* Price */}
                                    <div className="flex items-center gap-2 mt-1">
                                        <p className="text-pink-600 font-bold">
                                            ₹{product.price}
                                        </p>
                                        <p className="text-gray-400 line-through text-sm">
                                            ₹{product.originalPrice}
                                        </p>
                                    </div>

                                    {/* Rating */}
                                    <div className="text-yellow-500 text-sm mt-1">
                                        ⭐ 4.5
                                    </div>

                                    {/* Button */}
                                    <button className="mt-3 w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
};

export default Offers;