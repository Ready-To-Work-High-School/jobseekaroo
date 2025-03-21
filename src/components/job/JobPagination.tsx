
import React from 'react';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

interface JobPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  jobsCount: number;
  currentPageStart: number;
  currentPageEnd: number;
}

const JobPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  jobsCount,
  currentPageStart,
  currentPageEnd
}: JobPaginationProps) => {
  if (jobsCount <= 0) return null;
  
  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg border border-border shadow-sm">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Found <span className="font-medium text-foreground">{jobsCount}</span> job{jobsCount !== 1 ? 's' : ''}
          </p>
          <p className="text-sm text-muted-foreground">
            Showing {currentPageStart} to {currentPageEnd} of {jobsCount}
          </p>
        </div>
      </div>
      
      {totalPages > 1 && (
        <div className="py-4">
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious onClick={() => onPageChange(currentPage - 1)} />
                </PaginationItem>
              )}
              
              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink 
                    isActive={currentPage === index + 1} 
                    onClick={() => onPageChange(index + 1)}>
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext onClick={() => onPageChange(currentPage + 1)} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default JobPagination;
