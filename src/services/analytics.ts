import * as amplitude from '@amplitude/analytics-browser';
import { Identify } from '@amplitude/analytics-browser';

type AmplitudePropertyValue = string | number | boolean | string[];

type EventProperties = {
  [key: string]: AmplitudePropertyValue;
};

type UserProperties = {
  [key: string]: AmplitudePropertyValue;
};

const AMPLITUDE_API_KEY = import.meta.env.HUB_AMPLITUDE_API_KEY;
const ENVIRONMENT = import.meta.env.HUB_ENVIRONMENT || 'development';

class Analytics {
  private static instance: Analytics;
  private initialized: boolean = false;

  private constructor() {
    this.initializeIfEnabled();
  }

  public static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  private initializeIfEnabled(): void {
    if (this.shouldEnableAnalytics()) {
      amplitude.init(AMPLITUDE_API_KEY, {
        defaultTracking: {
          sessions: true,
          pageViews: true,
          formInteractions: true,
          fileDownloads: true,
        },
      });
      this.initialized = true;
    }
  }

  private shouldEnableAnalytics(): boolean {
    return Boolean(
      AMPLITUDE_API_KEY &&
      ['production'].includes(ENVIRONMENT)
    );
  }

  public track(eventName: string, eventProperties?: EventProperties): void {
    if (this.initialized) {
      amplitude.track(eventName, eventProperties);
    }
  }

  public setUserProperties(properties: UserProperties): void {
    if (this.initialized) {
      const identify = new Identify();
      Object.entries(properties).forEach(([key, value]) => {
        identify.set(key, value);
      });
      amplitude.identify(identify);
    }
  }

  public identify(userId: string): void {
    if (this.initialized) {
      amplitude.setUserId(userId);
    }
  }

  public reset(): void {
    if (this.initialized) {
      amplitude.reset();
    }
  }
}

export const analytics = Analytics.getInstance(); 