import TrieNode from "./TrieNode";

export default class Trie {
  // the root node for the tree
  rootNode;
  // this is the string that is being searched for inside of the tree
  searchString;

  constructor() {
    this.rootNode = new TrieNode(null);
  }

  // simply takes a word list and fills the trie with them
  fillTrie() {}

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
  search(word) {
    let node = this.getNode(word);
    if (node && node.isCompletedWord) {
      return true;
    }

    return false;
  }

  // determines if a prefix is in the trie
  startsWith(word) {
    let node = this.getNode(word);
    if (node) {
      return true;
    }

    return false;
  }

  // returns the possible words that the user can choose from what they have enterd
  getPostFixes(wordPrefix) {
    let current = this.rootNode;
    let children = [];
    let postFixes = [];
    let wordPrefixLength = [...wordPrefix].length;
    for (let x = 0; x < wordPrefixLength; x++) {
      if (x === wordPrefixLength - 1) {
        children = current.children;
      }
      current = current.children.get(character);
    }

    // [...wordPrefix].forEach(character =>{

    //   current = current.children.get(character);
    // })
  }

  getNode(word) {
    let current = this.rootNode;

    [...word].forEach((character) => {
      if (!current.children.get(character)) {
        return null;
      }
      current = current.children.get(character);
    });

    return current;
  }
}
