export class PathClass {
  parentPath: PathClass;
  name: string;
  constructor(_name: string, parent: PathClass = null) {
    this.name = _name;
    this.parentPath = parent;
  }
  pathToString(): string {
    if (this.parentPath == null) return ``;
    return `${this.parentPath.pathToString()}/${this.name}`;
  }
  toRoute(): string {
    if (this.parentPath == null) return `/myfiles`;
    return `${this.parentPath.toRoute()}/${this.name}`;
  }
  getParent(): any {
    return this.parentPath;
  }
}
