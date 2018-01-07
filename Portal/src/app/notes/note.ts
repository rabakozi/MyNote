export interface INote {
  id: number;
  owner: string;
  title: string;
  lead: string;
  content: string;
  created?: string;
  modified?: string;
  shareLink?: string;
}
