
import { NavLink } from 'react-router-dom';
import { Home, Briefcase, Lightbulb, Server } from 'lucide-react';
import MobileMenuItem from './MobileMenuItem';

const SharedMenuItems = () => {
  return (
    <>
      <MobileMenuItem Icon={Home} text="Home" to="/" />
      <MobileMenuItem Icon={Briefcase} text="Jobs" to="/jobs" />
      <MobileMenuItem Icon={Server} text="Server Demo" to="/server-demo" />
      <MobileMenuItem Icon={Lightbulb} text="Resources" to="/resources" />
    </>
  );
};

export default SharedMenuItems;
