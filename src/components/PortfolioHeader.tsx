import React, { useState } from 'react';
import { EditIcon, Share2Icon } from 'lucide-react';

interface PortfolioHeaderProps {
  portfolioName: string;
  setPortfolioName: (name: string) => void;
}

const PortfolioHeader: React.FC<PortfolioHeaderProps> = ({ portfolioName, setPortfolioName }) => {
  const [isEditingName, setIsEditingName] = useState(false);

  const sharePortfolio = () => {
    console.log("Sharing portfolio...");
  };

  return (
    <div className="flex justify-between items-center mb-6">
      {isEditingName ? (
        <input
          value={portfolioName}
          onChange={(e) => setPortfolioName(e.target.value)}
          onBlur={() => setIsEditingName(false)}
          onKeyPress={(e) => e.key === 'Enter' && setIsEditingName(false)}
          className="text-2xl font-bold bg-white border border-gray-300 rounded px-2 py-1 text-gray-900"
          autoFocus
        />
      ) : (
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          {portfolioName}
          <button
            onClick={() => setIsEditingName(true)}
            className="ml-2 text-gray-600 hover:text-gray-900"
          >
            <EditIcon className="w-4 h-4" />
          </button>
        </h2>
      )}
      <button onClick={sharePortfolio} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex items-center">
        <Share2Icon className="w-4 h-4 mr-2" />
        Share Portfolio
      </button>
    </div>
  );
};

export default PortfolioHeader;