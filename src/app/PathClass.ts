export class PathClass {
  constructor(_name: string, parent: PathClass = null) {
    this.name = _name;
    this.parentPath = parent;
  }
  public parentPath: PathClass;
  public name: string;
  pathToString(): string {
    if (this.parentPath == null) return '/' + this.name;
    return this.parentPath.pathToString() + '/' + this.name;
  }
  getParent(): any {
    return this.parentPath;
  }
}
