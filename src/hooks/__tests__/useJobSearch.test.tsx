
import { renderHook, act } from '@testing-library/react';
import { useJobSearch } from '../useJobSearch';
import { vi } from 'vitest';

// Mock the dependencies
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useSearchParams: () => [new URLSearchParams(), vi.fn()]
  };
});

vi.mock('@/components/ui/use-toast', () => ({
  toast: vi.fn(),
}));

describe('useJobSearch', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useJobSearch({}));
    
    expect(result.current.zipCode).toBe('');
    expect(result.current.radius).toBe(0);
    expect(result.current.isValid).toBe(true);
    expect(result.current.showRadius).toBe(false);
    expect(result.current.isFilterOpen).toBe(false);
    expect(result.current.jobType).toBe('all');
    expect(result.current.experienceLevel).toBe('all');
    expect(result.current.isRemote).toBe(null);
    expect(result.current.isFlexible).toBe(null);
    expect(result.current.sortBy).toBe('relevance');
    expect(result.current.appliedFiltersCount).toBe(0);
  });

  it('should initialize with provided values', () => {
    const { result } = renderHook(() => 
      useJobSearch({ initialZipCode: '12345', initialRadius: 10 })
    );
    
    expect(result.current.zipCode).toBe('12345');
    expect(result.current.radius).toBe(10);
    expect(result.current.showRadius).toBe(true);
  });

  it('should update zipCode when setZipCode is called', () => {
    const { result } = renderHook(() => useJobSearch({}));
    
    act(() => {
      result.current.setZipCode('54321');
    });
    
    expect(result.current.zipCode).toBe('54321');
  });

  it('should update radius when setRadius is called', () => {
    const { result } = renderHook(() => useJobSearch({}));
    
    act(() => {
      result.current.setRadius(20);
    });
    
    expect(result.current.radius).toBe(20);
  });

  it('should toggle radius visibility', () => {
    const { result } = renderHook(() => useJobSearch({}));
    
    expect(result.current.showRadius).toBe(false);
    
    act(() => {
      result.current.toggleRadius();
    });
    
    expect(result.current.showRadius).toBe(true);
    expect(result.current.radius).toBe(10); // Default radius when toggled on
    
    act(() => {
      result.current.toggleRadius();
    });
    
    expect(result.current.showRadius).toBe(false);
    expect(result.current.radius).toBe(0); // Reset when toggled off
  });

  it('should reset filters', () => {
    const { result } = renderHook(() => useJobSearch({}));
    
    // Set some filters first
    act(() => {
      result.current.setJobType('full-time');
      result.current.setExperienceLevel('entry-level');
      result.current.setIsRemote(true);
      result.current.setIsFlexible(true);
      result.current.setSortBy('date');
    });
    
    // Verify filters are set
    expect(result.current.jobType).toBe('full-time');
    
    // Reset filters
    act(() => {
      result.current.resetFilters();
    });
    
    // Verify filters are reset
    expect(result.current.jobType).toBe('all');
    expect(result.current.experienceLevel).toBe('all');
    expect(result.current.isRemote).toBe(null);
    expect(result.current.isFlexible).toBe(null);
    expect(result.current.sortBy).toBe('relevance');
    expect(result.current.isFilterOpen).toBe(false);
  });

  it('should get current filters', () => {
    const { result } = renderHook(() => useJobSearch({}));
    
    // Set some filters
    act(() => {
      result.current.setJobType('full-time');
      result.current.setExperienceLevel('entry-level');
      result.current.setIsRemote(true);
    });
    
    // Get current filters
    const filters = result.current.getCurrentFilters();
    
    // Verify filters are correct
    expect(filters).toEqual({
      type: 'full-time',
      experienceLevel: 'entry-level',
      isRemote: true,
      isFlexible: undefined,
      sortBy: undefined,
    });
  });
});
