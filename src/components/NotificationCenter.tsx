import React from 'react';
import { Bell, X, Check, Clock } from 'lucide-react';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

function NotificationCenter() {
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: '1',
      type: 'info',
      title: 'Leave Request',
      message: 'John Doe has requested leave from 20th March to 22nd March',
      timestamp: '5 minutes ago',
      read: false,
      action: {
        label: 'Review',
        onClick: () => console.log('Review leave request'),
      },
    },
    {
      id: '2',
      type: 'success',
      title: 'Payroll Processed',
      message: 'March 2024 payroll has been processed successfully',
      timestamp: '1 hour ago',
      read: false,
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="relative">
      <button className="relative p-2 text-gray-400 hover:text-gray-500">
        <Bell className="h-6 w-6" />
        {notifications.some((n) => !n.read) && (
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        )}
      </button>

      <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
            <span className="text-xs text-gray-500">
              {notifications.filter((n) => !n.read).length} unread
            </span>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No notifications
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 ${
                    notification.read ? 'bg-white' : 'bg-blue-50'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {notification.message}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {notification.timestamp}
                      </p>
                      {notification.action && (
                        <button
                          onClick={notification.action.onClick}
                          className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                        >
                          {notification.action.label}
                        </button>
                      )}
                    </div>
                    <div className="flex-shrink-0 flex space-x-2">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => removeNotification(notification.id)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t">
          <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800">
            View all notifications
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotificationCenter;