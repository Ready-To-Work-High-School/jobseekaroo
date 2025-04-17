
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CategoryFilter = ({ categories, selectedCategory, setSelectedCategory }: CategoryFilterProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Browse by Category</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge 
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className="cursor-pointer text-sm py-1 px-3 capitalize"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
