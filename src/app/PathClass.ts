export class PathClass {
  constructor(_name: string, parent: PathClass = null) {
    this.name = _name;
    this.parentPath = parent;
  }
  public parentPath: PathClass;
  public name: string;
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
