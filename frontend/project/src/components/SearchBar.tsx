import React, { useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import { useCandidates } from '../context/CandidateContext';
import { debounce } from '../utils/debounce';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { fetchCandidates } = useCandidates();

  // Debounce function to limit API calls
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      fetchCandidates(term);
    }, 500),
    [fetchCandidates]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div className="relative">
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>

      {/* Search Input Field */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by name, skills, or experience..."
        className="block w-full pl-10 pr-3 py-2 border rounded-md leading-5 
          bg-gray-700 text-white placeholder-gray-400 border-gray-600 
          focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
      />
    </div>
  );
};

export default SearchBar;
