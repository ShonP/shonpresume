// Google Analytics 4 Event Tracking Utilities
// Track only meaningful business events

type GTagEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

declare global {
  interface Window {
    gtag: (
      command: "event" | "config" | "js",
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

// Generic event tracking
export const trackEvent = ({ action, category, label, value }: GTagEvent) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Newsletter signup event
export const trackNewsletterSignup = (source?: string) => {
  trackEvent({
    action: "newsletter_signup",
    category: "engagement",
    label: source || "newsletter_form",
  });
};

// Contact form submission
export const trackContactSubmit = (method: string) => {
  trackEvent({
    action: "contact_submit",
    category: "engagement",
    label: method,
  });
};

// Book a call click (Calendly, etc.)
export const trackBookCallClick = (source?: string) => {
  trackEvent({
    action: "book_call_click",
    category: "conversion",
    label: source || "cta",
  });
};

// Outbound link clicks (WhatsApp, LinkedIn, GitHub, Calendly)
export const trackOutboundClick = (destination: string, url?: string) => {
  trackEvent({
    action: "outbound_click",
    category: "outbound",
    label: destination,
  });

  // Also track with GA4's built-in outbound click if URL provided
  if (typeof window !== "undefined" && window.gtag && url) {
    window.gtag("event", "click", {
      event_category: "outbound",
      event_label: url,
      transport_type: "beacon",
    });
  }
};

// Tool usage tracking
export const trackToolUsage = (toolName: string, action: string) => {
  trackEvent({
    action: "tool_usage",
    category: "tools",
    label: `${toolName}_${action}`,
  });
};

// Blog post read tracking
export const trackBlogRead = (postSlug: string) => {
  trackEvent({
    action: "blog_read",
    category: "content",
    label: postSlug,
  });
};

// Share button clicks
export const trackShare = (platform: string, postSlug?: string) => {
  trackEvent({
    action: "share",
    category: "social",
    label: postSlug ? `${platform}_${postSlug}` : platform,
  });
};
