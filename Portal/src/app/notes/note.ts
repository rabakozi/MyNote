export interface INote {
  id: number;
  userId: number;
  title: string;
  lead: string;
  content: string;
  created?: string;
  modified?: string;
  shareLink?: string;
}
