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
  odataUrl?: string;
  userName?: string; 
  password?: string;
  clientNumber?: string; 	
}

export interface NetsuiteConfigure extends IntegrationConfigure {
  url?: string;
  user?: string;
  password?: string;
  accountNumber?: string;
  useBoomiRecord?: boolean;
  consumerKey?: string;
  consumerSecret?: string;
  consumerSecretDeprecated?: string;
  tokenId?: string;
  tokenSecret?: string;
  tokenSecretDeprecated?: string;
  applicationId?: string;
  version?: string;
  numberofRetries?: string;
  maxConcurrentConnections?: string;
}