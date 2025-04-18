
import { runSystemDiagnostics } from '../diagnosticsService';
import { checkMissingLinks, checkCriticalComponents } from '../../utils/componentChecker';

// Mock the component checker utilities
jest.mock('../../utils/componentChecker', () => ({
  checkMissingLinks: jest.fn(),
  checkCriticalComponents: jest.fn(),
}));

describe('diagnosticsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should combine results from both checks', () => {
    const mockLinkIssues = ['Missing link: /test'];
    const mockComponentIssues = ['Missing component: #test'];
    
    (checkMissingLinks as jest.Mock).mockReturnValue(mockLinkIssues);
    (checkCriticalComponents as jest.Mock).mockReturnValue(mockComponentIssues);

    const results = runSystemDiagnostics();

    expect(results).toHaveLength(2);
    expect(results).toContain('Missing link: /test');
    expect(results).toContain('Missing component: #test');
  });

  it('should handle empty results', () => {
    (checkMissingLinks as jest.Mock).mockReturnValue([]);
    (checkCriticalComponents as jest.Mock).mockReturnValue([]);

    const results = runSystemDiagnostics();

    expect(results).toHaveLength(0);
    expect(checkMissingLinks).toHaveBeenCalled();
    expect(checkCriticalComponents).toHaveBeenCalled();
  });
});
