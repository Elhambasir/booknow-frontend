// lib/googleMapsLoader.ts
let googleMapsPromise: Promise<void> | null = null;

interface LoadOptions {
  apiKey: string;
  libraries?: string[];
  language?: string;
  region?: string;
}

export function loadGoogleMaps(options: LoadOptions | string): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject("Google Maps can only be loaded in the browser");
  }

  // Already loaded
  if (window.google?.maps) {
    return Promise.resolve();
  }

  // Already loading
  if (googleMapsPromise) {
    return googleMapsPromise;
  }

  // Handle string parameter (just apiKey) for backward compatibility
  const config = typeof options === 'string' 
    ? { apiKey: options }
    : options;

  googleMapsPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve());
      existingScript.addEventListener("error", () => reject(new Error("Failed to load Google Maps")));
      return;
    }

    const script = document.createElement("script");
    let url = `https://maps.googleapis.com/maps/api/js?key=${config.apiKey}`;
    
    if (config.libraries?.length) {
      url += `&libraries=${config.libraries.join(',')}`;
    }
    if (config.language) {
      url += `&language=${config.language}`;
    }
    if (config.region) {
      url += `&region=${config.region}`;
    }

    script.src = url;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Maps"));
    document.head.appendChild(script);
  });

  return googleMapsPromise;
}