import React from 'react';
import { HomeIcon, FilmIcon, TrendingUpIcon, UserIcon } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">BADE PAPA'S Project</div>
        <div className="flex space-x-4">
          <NavButton icon={<HomeIcon className="w-5 h-5 mr-2" />} text="Home" />
          <NavButton icon={<FilmIcon className="w-5 h-5 mr-2" />} text="Movies" />
          <NavButton icon={<TrendingUpIcon className="w-5 h-5 mr-2" />} text="Trending" />
          <NavButton icon={<UserIcon className="w-5 h-5 mr-2" />} text="Profile" />
        </div>
      </div>
    </nav>
  );
};

const NavButton: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <button className="flex items-center text-white hover:bg-indigo-500 px-3 py-2 rounded">
    {icon}
    {text}
  </button>
);

export default Navbar;