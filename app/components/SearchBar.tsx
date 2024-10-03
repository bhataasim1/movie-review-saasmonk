
import { SearchIcon } from "lucide-react";

export default function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  return (
    <div className="relative max-w-xl mx-auto">
      <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search for your favourite movie"
        className="w-full px-4 py-2 border rounded-md"
        // onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  )
}