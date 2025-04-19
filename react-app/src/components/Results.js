import React, { useState } from "react";

const Results = ({ places }) => {
  const [sortBy, setSortBy] = useState('name'); // 'name' or 'distance'
  const [searchTerm, setSearchTerm] = useState('');

  // Filter places based on search term
  const filteredPlaces = places.filter(place =>
    place.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort places based on selected criteria
  const sortedPlaces = [...filteredPlaces].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    // Add distance sorting if you have distance data
    return 0;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-900 flex items-center">
          <svg className="h-6 w-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Nearby Healthcare Facilities
        </h3>
        <p className="mt-2 text-gray-600">
          Found {places.length} facilities in your area
        </p>
      </div>

      {/* Search and Sort Controls */}
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search facilities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="name">Name</option>
              <option value="distance">Distance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="divide-y divide-gray-200">
        {places.length === 0 ? (
          <div className="p-6 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 14h.01M12 16h.01M12 18h.01M12 20h.01M12 22h.01" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No facilities found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search criteria</p>
          </div>
        ) : (
          sortedPlaces.map((place) => (
            <div key={place.id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                    <span className="text-2xl mr-2">🏥</span>
                    {place.name || "Unnamed Facility"}
                  </h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="h-4 w-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      Coordinates: {place.lat.toFixed(4)}, {place.lon.toFixed(4)}
                    </div>
                    {/* Add more facility details here if available */}
                  </div>
                </div>
                <div className="ml-4">
                  <button
                    className="inline-flex items-center px-4 py-2 border border-blue-500 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors duration-150"
                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lon}`)}
                  >
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                    Directions
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination or Load More (if needed) */}
      {places.length > 0 && (
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>Showing {sortedPlaces.length} of {places.length} facilities</span>
            {/* Add pagination controls here if needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
