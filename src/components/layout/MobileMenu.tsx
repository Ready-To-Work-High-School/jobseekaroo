
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, setIsOpen }) => {
  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:w-80">
          <nav className="flex flex-col gap-4 mt-8">
            <a href="/" className="block px-2 py-1 hover:text-primary">
              Home
            </a>
            <a href="/jobs" className="block px-2 py-1 hover:text-primary">
              Jobs
            </a>
            <a href="/resources" className="block px-2 py-1 hover:text-primary">
              Resources
            </a>
            <a href="/about" className="block px-2 py-1 hover:text-primary">
              About
            </a>
            <a href="/contact" className="block px-2 py-1 hover:text-primary">
              Contact
            </a>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
