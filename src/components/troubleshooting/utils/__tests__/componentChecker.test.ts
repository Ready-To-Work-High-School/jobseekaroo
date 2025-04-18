
import { checkMissingLinks, checkCriticalComponents } from '../componentChecker';

describe('componentChecker utilities', () => {
  let querySelectorSpy: jest.SpyInstance;

  beforeEach(() => {
    // Mock document.querySelector
    querySelectorSpy = jest.spyOn(document, 'querySelector');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('checkMissingLinks', () => {
    it('should return missing links when elements are not found', () => {
      querySelectorSpy.mockReturnValue(null);
      
      const missingLinks = checkMissingLinks();
      
      expect(missingLinks).toContain('Missing link: /jobs');
      expect(missingLinks).toContain('Missing link: /student-dashboard');
      expect(missingLinks.length).toBe(5);
    });

    it('should return empty array when all links are found', () => {
      querySelectorSpy.mockReturnValue(document.createElement('a'));
      
      const missingLinks = checkMissingLinks();
      
      expect(missingLinks).toHaveLength(0);
    });

    it('should handle errors gracefully', () => {
      querySelectorSpy.mockImplementation(() => {
        throw new Error('Test error');
      });
      
      const missingLinks = checkMissingLinks();
      
      expect(missingLinks).toHaveLength(0);
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('checkCriticalComponents', () => {
    it('should return missing components when elements are not found', () => {
      querySelectorSpy.mockReturnValue(null);
      
      const missingComponents = checkCriticalComponents();
      
      expect(missingComponents).toContain('Missing component: #job-listings');
      expect(missingComponents).toContain('Missing component: .user-profile');
      expect(missingComponents.length).toBe(3);
    });

    it('should return empty array when all components are found', () => {
      querySelectorSpy.mockReturnValue(document.createElement('div'));
      
      const missingComponents = checkCriticalComponents();
      
      expect(missingComponents).toHaveLength(0);
    });
  });
});
