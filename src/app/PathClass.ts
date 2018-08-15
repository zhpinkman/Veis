export class PathClass {
  constructor(_name: String, parent: PathClass = null) {
    this.name = _name;
    this.parentPath = parent;
  }
  public parentPath: PathClass;
  public name: String;
  pathToString(): String {
    if (this.parentPath == null) return '/' + this.name;
    return this.parentPath.pathToString() + '/' + this.name;
  }
  getParent(): any {
    return this.parentPath;
  }
}
