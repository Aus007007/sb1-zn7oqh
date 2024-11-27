export const getTenantFromSubdomain = () => {
  const hostname = window.location.hostname;
  
  // Local development
  if (hostname === 'localhost') {
    return 'demo';
  }
  
  // Extract subdomain from hostname
  const parts = hostname.split('.');
  if (parts.length > 2) {
    return parts[0];
  }
  
  return null;
};

export const getTenantUrl = (tenant: string) => {
  const hostname = window.location.hostname;
  
  // Local development
  if (hostname === 'localhost') {
    return `http://localhost:5173`;
  }
  
  // Production
  const domain = hostname.split('.').slice(-2).join('.');
  return `https://${tenant}.${domain}`;
};