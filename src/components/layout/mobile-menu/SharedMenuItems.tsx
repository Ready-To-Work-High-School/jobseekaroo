
import { Home, Briefcase, Lightbulb, Server } from 'lucide-react';
import MobileMenuItem from './MobileMenuItem';

interface SharedMenuItemsProps {
  setIsOpen?: (open: boolean) => void;
}

const SharedMenuItems = ({ setIsOpen }: SharedMenuItemsProps) => {
  const handleClick = () => {
    if (setIsOpen) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <MobileMenuItem icon={Home} to="/" onClick={handleClick}>
        Home
      </MobileMenuItem>
      <MobileMenuItem icon={Briefcase} to="/jobs" onClick={handleClick}>
        Jobs
      </MobileMenuItem>
      <MobileMenuItem icon={Server} to="/server-demo" onClick={handleClick}>
        Server Demo
      </MobileMenuItem>
      <MobileMenuItem icon={Lightbulb} to="/resources" onClick={handleClick}>
        Resources
      </MobileMenuItem>
    </>
  );
};

export default SharedMenuItems;
