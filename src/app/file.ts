export class FileEntity {
  id: string;
  name: string;
  type: string;
  size: number;
  parentId: string;
  creationDate: any;
  path: string;
  isDir: Boolean;
  url: string;
  isOpen: Boolean = false;
  selected: Boolean = false;
}
