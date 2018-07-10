export default class listElement{
  constructor(data = undefined){
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}