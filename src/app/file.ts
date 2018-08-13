export class FileEntity {
  id: string;
  name: string;
  type: string;
  size: number;
  parentId: string;
  creationDate: any;
  path: string;
  isDir: Boolean;
  isOpen: Boolean;
  selected: Boolean = false;
}
