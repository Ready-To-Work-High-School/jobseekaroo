import React, { useState } from 'react';
import Layout from '@/components/Layout';
import NotificationContent from '@/components/notifications/NotificationContent';
import NotificationHeader from '@/components/notifications/NotificationHeader';
import NotificationEmpty from '@/components/notifications/NotificationEmpty';
import { useNotifications } from '@/contexts/notifications/NotificationsContext';
import NotificationFilters from '@/components/notifications/NotificationFilters';

const Notifications = () => {
  const { notifications, isLoading, errorMessage } = useNotifications();
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
              {isLoading ? (
                <p>Loading notifications...</p>
              ) : errorMessage ? (
                <p className="text-red-500">{errorMessage}</p>
              ) : notifications.length === 0 ? (
                <NotificationEmpty />
              ) : (
                <NotificationContent />
              )}
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
