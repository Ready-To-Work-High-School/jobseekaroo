
import { render, screen, fireEvent } from '@testing-library/react';
import RadiusSelector from '../RadiusSelector';
import { vi } from 'vitest';

describe('RadiusSelector', () => {
  const defaultProps = {
    showRadius: false,
    toggleRadius: vi.fn(),
    radius: 0,
    setRadius: vi.fn()
  };

  it('renders the add radius button when showRadius is false', () => {
    render(<RadiusSelector {...defaultProps} />);
    expect(screen.getByText('Add radius filter')).toBeInTheDocument();
    expect(screen.queryByText('Search Radius:')).not.toBeInTheDocument();
  });

  it('renders the radius selector when showRadius is true', () => {
    render(<RadiusSelector {...{ ...defaultProps, showRadius: true, radius: 10 }} />);
    expect(screen.getByText('Remove radius')).toBeInTheDocument();
    expect(screen.getByText('Search Radius:')).toBeInTheDocument();
    expect(screen.getByText('10 miles')).toBeInTheDocument();
  });

  it('calls toggleRadius when the button is clicked', () => {
    render(<RadiusSelector {...defaultProps} />);
    fireEvent.click(screen.getByText('Add radius filter'));
    expect(defaultProps.toggleRadius).toHaveBeenCalledTimes(1);
  });

  it('displays singular "mile" when radius is 1', () => {
    render(<RadiusSelector {...{ ...defaultProps, showRadius: true, radius: 1 }} />);
    expect(screen.getByText('1 mile')).toBeInTheDocument();
  });

  it('displays plural "miles" when radius is not 1', () => {
    render(<RadiusSelector {...{ ...defaultProps, showRadius: true, radius: 5 }} />);
    expect(screen.getByText('5 miles')).toBeInTheDocument();
  });
});
