// src/data/integrations.ts
export interface Integration {
  id: string;
  name: string;
  category: string;
  iconUrl: string;
  badge: string;
  isFeatured?: boolean;
}

export const INTEGRATIONS: Integration[] = [
  {
    id: "oracle",
    name: "Oracle Database",
    category: "Data",
    iconUrl: "https://www.vectorlogo.zone/logos/oracle/oracle-icon.svg",
    badge: "Database",
    isFeatured: true,
  },
  {
    id: "algolia",
    name: "Algolia",
    category: "Knowledge Base",
    iconUrl: "https://www.vectorlogo.zone/logos/algolia/algolia-icon.svg",
    badge: "Knowledge Base",
  },
  {
    id: "amazon-s3",
    name: "Amazon S3",
    category: "Data",
    iconUrl: "https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg",
    badge: "Data",
  },
  {
    id: "bigquery",
    name: "BigQuery",
    category: "Data",
    iconUrl: "https://www.vectorlogo.zone/logos/google_bigquery/google_bigquery-icon.svg",
    badge: "Data",
  },
  {
    id: "calendly",
    name: "Calendly",
    category: "Collaboration",
    iconUrl: "https://www.vectorlogo.zone/logos/calendly/calendly-icon.svg",
    badge: "Collaboration",
  },
  {
    id: "confluence",
    name: "Confluence",
    category: "Knowledge Base",
    iconUrl: "https://www.vectorlogo.zone/logos/atlassian_confluence/atlassian_confluence-icon.svg",
    badge: "Knowledge Base",
  },
];

export const CATEGORIES = [
  "All",
  "Data",
  "Knowledge Base",
  "Collaboration",
  "CRM",
  "CS/Support",
];