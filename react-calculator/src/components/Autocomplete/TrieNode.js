/**
 * This class is essentially a box that serves as the display for the the user's input as well as the final calculation
 * found from the input equation. This will eventually have to parse the equation so that the calculator will also be
 * able to take input from typing it on their keyboard.
 */
export default class TrieNode {
  isCompletedWord = false;
  character;
  // new Hashmap <character, node>
  children = new Map();

  constructor(character) {
    this.character = character;
  }
}
