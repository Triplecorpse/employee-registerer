export interface IVisitor {
  passId: number;
  name?: string;
  surname?: string;
  isoDate: string;
}
export type TVisitor = 'passId' | 'name' | 'surname' | 'isoDate';
