/**
 * Intro: listElement class
 * Author: Wang Zeyu
 * Email: ycdfwzy@outlook.com
 * Date: 2018.7.11
 */

export default class listElement {
  constructor(data = undefined) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}
