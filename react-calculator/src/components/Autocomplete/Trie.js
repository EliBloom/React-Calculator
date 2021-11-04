import TrieNode from "./TrieNode";

export default class Trie {
  // the root node for the tree
  rootNode;
  // this is the string that is being searched for inside of the tree
  searchString;

  constructor() {
    this.rootNode = new TrieNode(null);
  }

  // inserting keys in a random order allows for a well balanced tree, adding in alphabetical order leads to worse performance
  insert(word) {
    let current = this.rootNode;

    [...word].forEach((character) => {
      if (!current.children.get(character)) {
        current.children.set(character, new TrieNode(character));
      }
      current = current.children.get(character);
    });
    current.isCompletedWord = true;
  }

  remove() {}

  // determines if a whole word is in the trie
  search() {}

  // determines if a prefix is in the trie
  startsWith(wordSequence) {
    let current = this.rootNode;
    let doesContainWordSequence = true;

    [...wordSequence].forEach((character) => {
      if (!current.children.get(character)) {
        doesContainWordSequence = false;
      }
      current = current.children.get(character);
    });

    return doesContainWordSequence;
  }
}
