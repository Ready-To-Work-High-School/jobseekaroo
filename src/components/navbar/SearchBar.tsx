
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { sanitizeUrlParam } from '@/utils/sanitization';

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Sanitize the search query before using it in the URL
      navigate(`/jobs?q=${sanitizeUrlParam(searchQuery.trim())}`);
    }
  };
  
  const showSearchBar = !location.pathname.includes('/jobs') && !location.pathname.includes('/sign');
  
  if (!showSearchBar) return null;
  
  return (
    <form className="hidden md:flex" onSubmit={handleSearch}>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
        <Input
          type="search"
          placeholder="Search jobs..."
          className="pl-8 w-[180px] lg:w-[240px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search for jobs"
        />
      </div>
    </form>
  );
};
