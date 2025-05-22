import React from 'react';

interface FooterProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  isMobile?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  isMobile = false
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Calculate which page numbers to show
  const getPageNumbers = () => {
    if (isMobile) {
      // For mobile, show at most 3 pages
      if (totalPages <= 3) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      } else if (currentPage === 1) {
        return [1, 2, 3];
      } else if (currentPage === totalPages) {
        return [totalPages - 2, totalPages - 1, totalPages];
      } else {
        return [currentPage - 1, currentPage, currentPage + 1];
      }
    } else {
      // For desktop, show all pages up to 5
      return Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1);
    }
  };

  return (
    <footer className={`flex ${isMobile ? 'flex-col gap-3' : 'items-center justify-between'} py-[11px] w-full`}>
      <div className={`font-normal ${isMobile ? 'text-sm' : 'text-lg'}`}>
        <span className="text-[#969b9f]">Showing </span>
        <span className="text-[#333333]">{startItem}-{endItem}</span>
        <span className="text-[#969b9f]"> from</span>
        <span className="text-[#333333]"> {totalItems} </span>
        <span className="text-[#969b9f]">data</span>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center w-5 h-5"
        >
          <img src="/caretleft.svg" alt="Previous" className={`w-5 h-5 ${currentPage === 1 ? 'opacity-50' : ''}`} />
        </button>
        
        <div className="flex items-center gap-2">
          {getPageNumbers().map(page => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`flex items-center justify-center ${isMobile ? 'w-6 h-6 text-xs' : 'w-[30px] h-[30px]'} ${
                currentPage === page
                  ? "bg-[#4F56D3] rounded shadow-[0px_20px_50px_0px_rgba(0,0,0,0.12)] text-white"
                  : "rounded border border-solid border-[#ECECEB] shadow-[0px_20px_50px_0px_rgba(0,0,0,0.12)] text-[#B2B3B9]"
              } font-['Cairo'] text-sm`}
            >
              {page}
            </button>
          ))}
        </div>
        
        <button 
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center w-5 h-5"
        >
          <img src="/caretright.svg" alt="Next" className={`w-5 h-5 ${currentPage === totalPages ? 'opacity-50' : ''}`} />
        </button>
      </div>
    </footer>
  );
}; 