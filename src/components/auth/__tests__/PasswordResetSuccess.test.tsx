
import { render, screen } from '@testing-library/react';
import PasswordResetSuccess from '../PasswordResetSuccess';

describe('PasswordResetSuccess Component', () => {
  test('renders success message correctly', () => {
    render(<PasswordResetSuccess />);
    
    expect(screen.getByText(/your password has been reset successfully/i)).toBeInTheDocument();
  });
});
