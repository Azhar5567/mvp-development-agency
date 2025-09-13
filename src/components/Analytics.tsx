import { useEffect } from 'react';

// Simple analytics tracking component
// In production, replace with your preferred analytics service (Google Analytics, Mixpanel, etc.)
const Analytics = () => {
  useEffect(() => {
    // Track page view
    if (typeof window !== 'undefined') {
      // Example: Google Analytics 4 tracking
      // gtag('event', 'page_view', {
      //   page_title: document.title,
      //   page_location: window.location.href
      // });

      // For now, we'll just log to console (remove in production)
      console.log('Page viewed:', {
        title: document.title,
        url: window.location.href,
        timestamp: new Date().toISOString()
      });
    }
  }, []);

  // Track button clicks and form submissions
  useEffect(() => {
    const trackButtonClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON') {
        const text = target.textContent?.trim() || '';
        const href = (target as HTMLAnchorElement).href || '';
        
        // Log analytics event
        console.log('Button clicked:', {
          text,
          href,
          timestamp: new Date().toISOString()
        });

        // Example: Send to analytics service
        // gtag('event', 'click', {
        //   event_category: 'engagement',
        //   event_label: text,
        //   value: 1
        // });
      }
    };

    const trackFormSubmit = (event: SubmitEvent) => {
      const form = event.target as HTMLFormElement;
      const formId = form.id || 'unknown';
      
      console.log('Form submitted:', {
        formId,
        timestamp: new Date().toISOString()
      });

      // Example: Send to analytics service
      // gtag('event', 'form_submit', {
      //   event_category: 'lead_generation',
      //   event_label: formId,
      //   value: 1
      // });
    };

    document.addEventListener('click', trackButtonClick);
    document.addEventListener('submit', trackFormSubmit);

    return () => {
      document.removeEventListener('click', trackButtonClick);
      document.removeEventListener('submit', trackFormSubmit);
    };
  }, []);

  return null; // This component doesn't render anything
};

// Custom hook for tracking events
export const useAnalytics = () => {
  const trackEvent = (eventName: string, parameters: Record<string, unknown> = {}) => {
    console.log('Custom event:', {
      event: eventName,
      parameters,
      timestamp: new Date().toISOString()
    });

    // Example: Send to analytics service
    // gtag('event', eventName, parameters);
  };

  const trackPageView = (pageName: string) => {
    console.log('Page view:', {
      page: pageName,
      timestamp: new Date().toISOString()
    });

    // Example: Send to analytics service
    // gtag('event', 'page_view', {
    //   page_title: pageName,
    //   page_location: window.location.href
    // });
  };

  return { trackEvent, trackPageView };
};

export default Analytics;