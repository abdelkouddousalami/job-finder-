export interface JobOffer {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  url: string;
  salary?: string;
  datePublished: string;
  tags?: string[];
  remote?: boolean;
  apiSource: string;
}
