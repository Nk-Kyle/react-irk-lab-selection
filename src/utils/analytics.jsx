import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { getAnalytics, logEvent } from '@firebase/analytics';

export function useFirebaseRoutesAnalytics() {
    const location = useLocation();

    useEffect(() => {
        const analytics = getAnalytics();
        logEvent(analytics, 'screen_view', {
            firebase_screen: location.pathname,
            firebase_screen_class: 'firebase-routes-analytics',
        });
    }, [location]);

    return null;
}