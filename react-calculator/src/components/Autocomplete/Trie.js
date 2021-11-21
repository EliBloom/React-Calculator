import TrieNode from "./TrieNode";

/**
 * This class is essentially a box that serves as the display for the the user's input as well as the final calculation
 * found from the input equation. This will eventually have to parse the equation so that the calculator will also be
 * able to take input from typing it on their keyboard.
 */
export default class Trie {
  // the root node for the tree
  rootNode;
  // this is the string that is being searched for inside of the tree
  searchString;

  // wordPrefix = "";

  constructor() {
    this.rootNode = new TrieNode(null);
  }

  // simply takes a word list and fills the trie with them
  fillTrie(wordSet) {
    wordSet.forEach((word) => {
      this.insert(word);
    });
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

  // determines if a whole word is in the trie
  contains(word) {
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

  getPostFixesHelper(node, wordPrefix, postFixes) {
    wordPrefix += node.character;

    if (node.isCompletedWord) {
      postFixes.push(wordPrefix);
    }

    if (node.children.size === 0) {
      return;
    }

    node.children.forEach((childNode) => {
      this.getPostFixesHelper(childNode, wordPrefix, postFixes);
    });
  }

  // returns the possible words that the user can choose from what they have enterd
  getPostFixes(wordPrefix) {
    let current = this.rootNode;
    // this.wordPrefix = wordPrefix;
    let children = [];
    let temp = [...wordPrefix];
    let postFixes = [];
    let wordPrefixLength = temp.length;
    if (!this.startsWith(wordPrefix)) {
      return "Invalid Entry";
    }

    for (let x = 0; x <= wordPrefixLength; x++) {
      if (x === wordPrefixLength) {
        children = current.children;
      }
      current = current.children.get(wordPrefix.charAt(x));
    }

    children.forEach((childNode) => {
      this.getPostFixesHelper(childNode, wordPrefix, postFixes);
    });

    return postFixes;
  }

  getNode(word) {
    let current = this.rootNode;

    if (current === null) {
      return null;
    } else {
      [...word].forEach((character) => {
        if (!current.children.get(character)) {
          return (current = null);
        }
        current = current.children.get(character);
      });
    }

    return current;
  }
}
