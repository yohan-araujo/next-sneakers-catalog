export interface IProduct {
  id: number;
  code: string;
  name: string;
  subname: string;
  category_id: number;
  category_name?: string;
  brand_id: number;
  brand_name?: string;
  collab_id: number;
  collab_name?: string;
}
