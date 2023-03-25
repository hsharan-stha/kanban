export interface MenuInterface {
  children: Array<MenuInterface>;
  controllername: string;
  entryusername: string;
  code: string;
  create: boolean;
  delete: boolean;
  iconUrl: string;
  id: number;
  linkUrl: string;
  masterName?: string;
  masterNameNp?: string;
  name: string;
  nameNp: string;
  parentId: number;
  read: boolean;
  update: boolean;
}
