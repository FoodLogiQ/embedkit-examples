export interface Integration {
  id: string;
  name: string;
  category: string;
  iconUrl: string;
  badge: string;
  isFeatured?: boolean;
  isConfigured?: boolean;
}
export interface IntegrationConfigure {
  id: string;
}

export interface OracleConfigure extends IntegrationConfigure  {
  apiUrl?: string;
  apiAccountId?: string; 
  apiUsername?: string;
  apiToken?: string;
}
export interface SlackConfigure extends IntegrationConfigure  {
  clientId?: string;
  clientSerect?: string; 
  accessToken?: string;
  channelName?: string;
}

export interface SapConfigure extends IntegrationConfigure  {
  ODATA_URL?: string;
  USERNAME?: string; 
  PASSWORD?: string;
}
export interface NetsuiteConfigure extends IntegrationConfigure  {
  ACCOUNT_ID?: string;
  CONSUMER_KEY?: string; 
  CONSUMER_SECRET?: string;
  TOKEN_ID?: string;
}

