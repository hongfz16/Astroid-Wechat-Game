import listElement from "./listElement"

export default class LinkedList{
  constructor(){
    head = null;
  }
  push(data){
    let le = new listElement(data);
    le.next = head;
    head.prev = le;
    head = le;
  }
  delete(itr){
    if (itr === head){
      head = head.next;
    } else
    {
      itr.prev.next = itr.next;
    }
    if (itr.next !== null){
      itr.next.prev = itr.prev;
    }
  }
}
