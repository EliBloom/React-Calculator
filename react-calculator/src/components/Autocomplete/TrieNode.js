export default class TrieNode {
  isCompletedWord = false;
  character;
  // new Hashmap <character, node>
  children = new Map();

  constructor(character) {
    this.character = character;
  }
}
