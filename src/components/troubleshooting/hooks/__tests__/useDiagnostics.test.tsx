
import { renderHook, act } from '@testing-library/react';
import { useDiagnostics } from '../../useDiagnostics';
import { useToast } from '@/hooks/use-toast';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { runSystemDiagnostics } from '../../services/diagnosticsService';

// Mock dependencies
jest.mock('@/hooks/use-toast', () => ({
  useToast: jest.fn(),
}));

jest.mock('@/hooks/useNetworkStatus', () => ({
  useNetworkStatus: jest.fn(),
}));

jest.mock('../../services/diagnosticsService', () => ({
  runSystemDiagnostics: jest.fn(),
}));

describe('useDiagnostics', () => {
  const mockToast = jest.fn();
  
  beforeEach(() => {
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
    (useNetworkStatus as jest.Mock).mockReturnValue(true);
    (runSystemDiagnostics as jest.Mock).mockReturnValue([]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should start and end checking state during diagnostics', async () => {
    const { result } = renderHook(() => useDiagnostics());

    expect(result.current.isChecking).toBe(false);

    await act(async () => {
      await result.current.handleDiagnostics();
    });

    expect(result.current.isChecking).toBe(false);
  });

  it('should show toast with diagnostic results', async () => {
    (runSystemDiagnostics as jest.Mock).mockReturnValue(['Missing link: /test']);

    const { result } = renderHook(() => useDiagnostics());

    await act(async () => {
      await result.current.handleDiagnostics();
    });

    expect(mockToast).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Diagnostic Results",
        description: expect.stringContaining("Missing link: /test"),
      })
    );
  });

  it('should handle errors during diagnostics', async () => {
    (runSystemDiagnostics as jest.Mock).mockImplementation(() => {
      throw new Error('Test error');
    });

    const { result } = renderHook(() => useDiagnostics());

    await act(async () => {
      await result.current.handleDiagnostics();
    });

    expect(mockToast).toHaveBeenCalledWith(
      expect.objectContaining({
        variant: "destructive",
        title: "Diagnostic Failed",
      })
    );
  });
});
