export class PathClass {
  constructor(_name: String, parent: PathClass = null){
    this.name = _name;
    this.parentPath = parent;
  }
  public parentPath: PathClass;
  public name: String;
  toString(): String {  
    if (this.parentPath == null) return "";
    return this.parentPath.toString() + '/' + this.name;
  }
  getParent(): any {
    return this.parentPath;
  }
}
