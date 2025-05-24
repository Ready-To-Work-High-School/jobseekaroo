
export const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'job_application':
      return '💼';
    case 'message':
      return '💬';
    case 'system':
      return '⚙️';
    default:
      return '📢';
  }
};

export const formatNotificationDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 1) {
    return 'Just now';
  } else if (diffInHours < 24) {
    return `${Math.floor(diffInHours)} hours ago`;
  } else {
    return date.toLocaleDateString();
  }
};
