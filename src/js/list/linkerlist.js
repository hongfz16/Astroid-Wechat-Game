import listElement from './listElement';

export default class LinkedList {
  constructor() {
    this.size = 0;
    this.head = null;
  }

  push(data) {
    this.size += 1;
    const le = new listElement(data);
    le.next = this.head;
    if (this.head !== null) this.head.prev = le;
    this.head = le;
  }

  delete(itr) {
    this.size -= 1;
    if (itr.prev === null) {
      this.head = this.head.next;
    } else {
      itr.prev.next = itr.next;
    }
    if (itr.next !== null) {
      itr.next.prev = itr.prev;
    }
    // itr.destroy();
    // Destroy(itr);
    itr = null;
  }
}
