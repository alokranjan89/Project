import React from "react";

const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm animate-pulse">

      {/* Image */}
      <div className="w-full h-52 bg-gray-200 rounded-lg"></div>

      {/* Title */}
      <div className="mt-4 h-4 bg-gray-200 rounded w-3/4"></div>

      {/* Rating */}
      <div className="mt-2 h-3 bg-gray-200 rounded w-1/2"></div>

      {/* Price */}
      <div className="mt-4 h-5 bg-gray-200 rounded w-1/3"></div>

    </div>
  );
};

export default SkeletonCard;