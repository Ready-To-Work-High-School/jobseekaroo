
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Award, Heart, BookOpen, ChevronDown } from 'lucide-react';

const CredentialsDropdown = () => {
  return (
    <div className="container mx-auto px-4 py-4 mb-8 text-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="border-amber-300">
            Industry Recognized Credentials
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white">
          <DropdownMenuItem asChild>
            <Link to="/entrepreneurship-academy" className="cursor-pointer flex items-center">
              <Award className="mr-2 h-4 w-4 text-amber-500" />
              Entrepreneurship & Small Business
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/nursing-academy" className="cursor-pointer flex items-center">
              <Heart className="mr-2 h-4 w-4 text-red-500" />
              Nursing Academy
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/credentials" className="cursor-pointer flex items-center">
              <BookOpen className="mr-2 h-4 w-4 text-blue-500" />
              View All Credentials
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CredentialsDropdown;
