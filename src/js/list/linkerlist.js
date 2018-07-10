import listElement from "./listElement"

export default class LinkedList{
  constructor(){
    this.head = null;
  }
  push(data){
    let le = new listElement(data);
    le.next = head;
    this.head.prev = le;
    this.head = le;
  }
  delete(itr){
    if (itr === head){
      this.head = this.head.next;
    } else
    {
      itr.prev.next = itr.next;
    }
    if (itr.next !== null){
      itr.next.prev = itr.prev;
    }
  }
}
