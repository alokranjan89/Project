import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CategoryCard = ({ title, image, path }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(path)}
      className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition duration-300"
    >
      {/* IMAGE */}
      <img
        src={image}
        alt={title}
        className="w-full h-56 object-cover group-hover:scale-110 transition duration-500 ease-out"
      />

      {/* OVERLAY (lighter & better gradient) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition duration-300" />

      {/* CONTENT */}
      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">

        {/* Title */}
        <h3 className="text-white text-xl font-semibold tracking-wide drop-shadow-md">
          {title}
        </h3>

        {/* Arrow Button */}
        <div className="flex items-center justify-center bg-white/20 backdrop-blur-md p-2 rounded-full 
        group-hover:bg-white group-hover:text-pink-600 group-hover:scale-110 transition duration-300 shadow">
          <ArrowRight size={18} />
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-pink-400/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition duration-500" />

      {/* Subtle border highlight on hover */}
      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-white/20 transition duration-300" />
    </div>
  );
};

export default CategoryCard;