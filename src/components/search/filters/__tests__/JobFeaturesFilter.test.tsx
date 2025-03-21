
import { render, screen, fireEvent } from '@testing-library/react';
import JobFeaturesFilter from '../JobFeaturesFilter';
import { vi } from 'vitest';

describe('JobFeaturesFilter', () => {
  const mockSetIsRemote = vi.fn();
  const mockSetIsFlexible = vi.fn();
  
  beforeEach(() => {
    mockSetIsRemote.mockClear();
    mockSetIsFlexible.mockClear();
  });

  it('renders correctly with job features options', () => {
    render(
      <JobFeaturesFilter 
        isRemote={null} 
        setIsRemote={mockSetIsRemote} 
        isFlexible={null} 
        setIsFlexible={mockSetIsFlexible} 
      />
    );
    
    expect(screen.getByText('Job Features')).toBeInTheDocument();
    expect(screen.getByText('Remote Work')).toBeInTheDocument();
    expect(screen.getByText('Flexible Schedule')).toBeInTheDocument();
  });

  it('shows checked state for selected features', () => {
    render(
      <JobFeaturesFilter 
        isRemote={true} 
        setIsRemote={mockSetIsRemote} 
        isFlexible={null} 
        setIsFlexible={mockSetIsFlexible} 
      />
    );
    
    const remoteCheckbox = screen.getByLabelText('Remote Work');
    expect(remoteCheckbox).toBeChecked();
    
    const flexibleCheckbox = screen.getByLabelText('Flexible Schedule');
    expect(flexibleCheckbox).not.toBeChecked();
  });

  it('calls setIsRemote when Remote Work checkbox is clicked', () => {
    render(
      <JobFeaturesFilter 
        isRemote={null} 
        setIsRemote={mockSetIsRemote} 
        isFlexible={null} 
        setIsFlexible={mockSetIsFlexible} 
      />
    );
    
    fireEvent.click(screen.getByLabelText('Remote Work'));
    expect(mockSetIsRemote).toHaveBeenCalledWith(true);
  });

  it('calls setIsFlexible when Flexible Schedule checkbox is clicked', () => {
    render(
      <JobFeaturesFilter 
        isRemote={null} 
        setIsRemote={mockSetIsRemote} 
        isFlexible={null} 
        setIsFlexible={mockSetIsFlexible} 
      />
    );
    
    fireEvent.click(screen.getByLabelText('Flexible Schedule'));
    expect(mockSetIsFlexible).toHaveBeenCalledWith(true);
  });

  it('unchecks the checkbox when clicked again', () => {
    render(
      <JobFeaturesFilter 
        isRemote={true} 
        setIsRemote={mockSetIsRemote} 
        isFlexible={true} 
        setIsFlexible={mockSetIsFlexible} 
      />
    );
    
    fireEvent.click(screen.getByLabelText('Remote Work'));
    expect(mockSetIsRemote).toHaveBeenCalledWith(null);
    
    fireEvent.click(screen.getByLabelText('Flexible Schedule'));
    expect(mockSetIsFlexible).toHaveBeenCalledWith(null);
  });
});
