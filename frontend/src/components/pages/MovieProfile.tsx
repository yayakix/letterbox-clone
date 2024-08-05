import React, { useState, useEffect } from "react";


const rating = 9

const MovieProfile = () => {
  return (
    <div className="flex max-w-4xl mx-auto p-6">
      <div className="flex-shrink-0 mr-6">
        <img
          src={movielink}
          alt="The Matrix movie poster"
          className="w-56 rounded-lg shadow-md"
        />
      </div>
      <div>
        <div className="flex items-center mb-2">
          <h1 className="text-2xl font-bold mr-3">{title}</h1>
          <span className="text-xl font-semibold text-yellow-500">{rating.toFixed(1)}</span>
        </div>
        <p className="text-sm text-gray-600 mb-4">{movieDirector}</p>
        <p className="text-base mb-6">
          {description}
        </p>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-green-500 text-white rounded">Watch</button>
          <button className="px-4 py-2 border border-green-500 text-green-500 rounded">Like</button>
          <button className="px-4 py-2 border border-green-500 text-green-500 rounded">Comment</button>
        </div>
      </div>
    </div>
  )
};

export default MovieProfile;