
import { render, screen, fireEvent } from '@testing-library/react';
import ExperienceLevelFilter from '../ExperienceLevelFilter';
import { vi } from 'vitest';

// Mock the JobFilterContext to avoid errors
vi.mock('../JobFilterContext', () => ({
  useJobFilter: () => ({
    experienceLevel: 'all',
    setExperienceLevel: vi.fn(),
  }),
}));

describe('ExperienceLevelFilter', () => {
  const mockSetExperienceLevel = vi.fn();
  
  beforeEach(() => {
    mockSetExperienceLevel.mockClear();
  });

  it('renders correctly with all experience level options', () => {
    render(<ExperienceLevelFilter experienceLevel="all" setExperienceLevel={mockSetExperienceLevel} />);
    
    expect(screen.getByText('Experience Level')).toBeInTheDocument();
    expect(screen.getByText('All Levels')).toBeInTheDocument();
    expect(screen.getByText('No Experience')).toBeInTheDocument();
    expect(screen.getByText('Entry Level')).toBeInTheDocument();
    expect(screen.getByText('Some Experience')).toBeInTheDocument();
  });

  it('highlights the selected experience level', () => {
    render(<ExperienceLevelFilter experienceLevel="entry-level" setExperienceLevel={mockSetExperienceLevel} />);
    
    // The "Entry Level" button should have the default variant (highlighted)
    const entryLevelButton = screen.getByText('Entry Level').closest('button');
    expect(entryLevelButton).toHaveClass('bg-primary');
    
    // The other buttons should have the outline variant (not highlighted)
    const allLevelsButton = screen.getByText('All Levels').closest('button');
    expect(allLevelsButton).not.toHaveClass('bg-primary');
  });

  it('calls setExperienceLevel when an experience level is clicked', () => {
    render(<ExperienceLevelFilter experienceLevel="all" setExperienceLevel={mockSetExperienceLevel} />);
    
    fireEvent.click(screen.getByText('No Experience'));
    expect(mockSetExperienceLevel).toHaveBeenCalledWith('no-experience');
    
    fireEvent.click(screen.getByText('Entry Level'));
    expect(mockSetExperienceLevel).toHaveBeenCalledWith('entry-level');
    
    fireEvent.click(screen.getByText('Some Experience'));
    expect(mockSetExperienceLevel).toHaveBeenCalledWith('some-experience');
    
    fireEvent.click(screen.getByText('All Levels'));
    expect(mockSetExperienceLevel).toHaveBeenCalledWith('all');
  });
});
