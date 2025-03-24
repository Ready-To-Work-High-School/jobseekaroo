
import { render, screen, fireEvent } from '@testing-library/react';
import { ModerationMessageItem } from '../ModerationMessageItem';
import { vi } from 'vitest';

describe('ModerationMessageItem', () => {
  const mockMessage = {
    id: 'msg-1',
    conversation_id: 'conv-1',
    content: 'Test message content',
    created_at: new Date().toISOString(),
    sender_id: 'sender-1',
    receiver_id: 'receiver-1',
    sender_name: 'John Doe',
    sender_avatar: '/avatar.png',
    receiver_name: 'Jane Smith',
    receiver_avatar: '/avatar2.png',
    is_read: false
  };

  const mockOnApprove = vi.fn();
  const mockOnReject = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders message correctly', () => {
    render(
      <ModerationMessageItem
        message={mockMessage}
        onApprove={mockOnApprove}
        onReject={mockOnReject}
      />
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Test message content')).toBeInTheDocument();
    expect(screen.getByText(/To: Jane Smith/)).toBeInTheDocument();
    expect(screen.getByText('Needs Moderation')).toBeInTheDocument();
  });

  it('calls onApprove when approve button is clicked', () => {
    render(
      <ModerationMessageItem
        message={mockMessage}
        onApprove={mockOnApprove}
        onReject={mockOnReject}
      />
    );

    fireEvent.click(screen.getByText('Approve'));
    expect(mockOnApprove).toHaveBeenCalledWith('msg-1');
  });

  it('calls onReject when reject button is clicked', () => {
    render(
      <ModerationMessageItem
        message={mockMessage}
        onApprove={mockOnApprove}
        onReject={mockOnReject}
      />
    );

    fireEvent.click(screen.getByText('Reject'));
    expect(mockOnReject).toHaveBeenCalledWith('msg-1');
  });
});
