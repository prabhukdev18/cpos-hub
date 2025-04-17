import { useEffect } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';
import { analytics } from '../services/analytics';

export const useAnalytics = () => {
  const { user } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    if (user) {
      // Identify user in analytics when they sign in
      analytics.identify(user.username);
      Promise.all([getCurrentUser(), fetchAuthSession()]).then(([currentUser, session]) => {
        const groups = session.tokens?.accessToken?.payload['cognito:groups'] as string[] || [];
        const email = currentUser.signInDetails?.loginId || 'unknown';
        analytics.setUserProperties({
          email,
          userGroups: groups,
        });
      });
    } else {
      // Reset analytics when user signs out
      analytics.reset();
    }
  }, [user]);

  return {
    track: analytics.track.bind(analytics),
    setUserProperties: analytics.setUserProperties.bind(analytics),
  };
}; 