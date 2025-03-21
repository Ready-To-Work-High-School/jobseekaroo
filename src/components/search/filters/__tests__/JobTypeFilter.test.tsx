
import { render, screen, fireEvent } from '@testing-library/react';
import JobTypeFilter from '../JobTypeFilter';
import { vi } from 'vitest';

describe('JobTypeFilter', () => {
  const mockSetJobType = vi.fn();
  
  beforeEach(() => {
    mockSetJobType.mockClear();
  });

  it('renders correctly with all job type options', () => {
    render(<JobTypeFilter jobType="all" setJobType={mockSetJobType} />);
    
    expect(screen.getByText('Job Type')).toBeInTheDocument();
    expect(screen.getByText('All Types')).toBeInTheDocument();
    expect(screen.getByText('Full Time')).toBeInTheDocument();
    expect(screen.getByText('Part Time')).toBeInTheDocument();
    expect(screen.getByText('Internship')).toBeInTheDocument();
  });

  it('highlights the selected job type', () => {
    render(<JobTypeFilter jobType="full-time" setJobType={mockSetJobType} />);
    
    // The "Full Time" button should have the default variant (highlighted)
    const fullTimeButton = screen.getByText('Full Time').closest('button');
    expect(fullTimeButton).toHaveClass('bg-primary');
    
    // The other buttons should have the outline variant (not highlighted)
    const allTypesButton = screen.getByText('All Types').closest('button');
    expect(allTypesButton).not.toHaveClass('bg-primary');
  });

  it('calls setJobType when a job type is clicked', () => {
    render(<JobTypeFilter jobType="all" setJobType={mockSetJobType} />);
    
    fireEvent.click(screen.getByText('Part Time'));
    expect(mockSetJobType).toHaveBeenCalledWith('part-time');
    
    fireEvent.click(screen.getByText('Full Time'));
    expect(mockSetJobType).toHaveBeenCalledWith('full-time');
    
    fireEvent.click(screen.getByText('Internship'));
    expect(mockSetJobType).toHaveBeenCalledWith('internship');
    
    fireEvent.click(screen.getByText('All Types'));
    expect(mockSetJobType).toHaveBeenCalledWith('all');
  });
});
