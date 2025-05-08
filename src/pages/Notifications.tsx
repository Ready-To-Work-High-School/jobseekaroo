
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import NotificationContent from '@/components/notifications/NotificationContent';
import NotificationHeader from '@/components/notifications/NotificationHeader';
import NotificationFilters from '@/components/notifications/NotificationFilters';
import { useNotifications } from '@/contexts/notifications/NotificationsContext';

const Notifications = () => {
  const { filteredNotifications, unreadCount, markAllAsRead, isLoading, errorMessage } = useNotifications();
  const [showFilters, setShowFilters] = useState(false);

  return (
    <Layout>
      <div className="container max-w-5xl py-8">
        <div className="flex flex-col gap-6">
          <NotificationHeader 
            onFilterClick={() => setShowFilters(!showFilters)}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {showFilters && (
              <aside className="md:col-span-1">
                <NotificationFilters />
              </aside>
            )}
            
            <main className={`md:col-span-${showFilters ? 3 : 4}`}>
              <NotificationContent 
                filteredNotifications={filteredNotifications}
                unreadCount={unreadCount}
                markAllAsRead={markAllAsRead}
                isLoading={isLoading}
                errorMessage={errorMessage}
              />
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
