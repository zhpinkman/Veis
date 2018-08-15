export class PathClass {
  public parentPath: PathClass;
  public name: String;
  toString(): String {
    return this.parentPath.toString() + '/' + this.name;
  }
  getParent(): any {
    return this.parentPath;
  }
}
