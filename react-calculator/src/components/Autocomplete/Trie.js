import TrieNode from "./TrieNode";

/**
 * This class creates a Trie data structure used for the storage and retrieval of words/prefixes; said Trie is used to
 * make the autocomplete feature, which displays valid words based on what prefix the user has entered.
 */
export default class Trie {
  // the root node for the tree
  rootNode;
  // this is the string that is being searched for inside of the tree
  searchString;

  constructor() {
    this.rootNode = new TrieNode(null);
  }

  /**
   * Used to fill the Trie with various words using an array of keywords
   *
   * @param wordSet - Array of string based words.
   */
  fillTrie(wordSet) {
    wordSet.forEach((word) => {
      this.insert(word);
    });
  }

  /**
   * Inserts a completed word into the Tries.
   *
   * @param word - A string of user entered word.
   */
  insert(word) {
    let current = this.rootNode;

    [...word].forEach((character) => {
      // If the node for the character doesn't exist, create one
      if (!current.children.get(character)) {
        current.children.set(character, new TrieNode(character));
      }

      current = current.children.get(character);
    });
    current.isCompletedWord = true;
  }

  /**
   * Returns a boolean value based on whether or not the supplied word is a complete word within the Trie.
   *
   * @param word - A string of user entered word.
   */
  contains(word) {
    let node = this.getNode(word);
    if (node && node.isCompletedWord) {
      return true;
    }

    return false;
  }

  /**
   * Returns a boolean value based on whether or not the given prefix exists in the Trie.
   *
   * @param prefix - A string of user entered prefix.
   */
  startsWith(prefix) {
    let node = this.getNode(prefix);
    if (node) {
      return true;
    }

    return false;
  }

  /**
   * Recursive helper function for building an array of possible words that start with the given prefix, these
   * values are used as the options in the autocomplete dropdown. Recursion is needed to traverse the tree of possible
   * words.
   *
   * @param node - the current node being looked at.
   * @param wordPrefix - the word prefix entered by user.
   * @param postFixes - array of words that the prefix could turn into.
   */
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

  /**
   * Returns an array of possible words based on the user entered prefix.
   *
   * @param wordPrefix - the word prefix entered by user.
   */
  getPostFixes(wordPrefix) {
    let current = this.rootNode;
    let children = [];
    let temp = [...wordPrefix];
    let postFixes = [];
    let wordPrefixLength = temp.length;
    // check if trie even contains the prefix
    if (!this.startsWith(wordPrefix)) {
      return "Invalid Entry";
    }

    for (let x = 0; x <= wordPrefixLength; x++) {
      if (x === wordPrefixLength) {
        children = current?.children;
      }
      current = current?.children.get(wordPrefix.charAt(x));
    }

    children.forEach((childNode) => {
      this.getPostFixesHelper(childNode, wordPrefix, postFixes);
    });

    return postFixes;
  }

  /**
   * Callback for when a number is entered into the calculator.
   *
   * @param word - A string of user entered word.
   */
  getNode(word) {
    let current = this.rootNode;

    if (current === null) {
      return null;
    } else {
      [...word].forEach((character) => {
        if (!current?.children.get(character)) {
          return (current = null);
        }
        current = current.children.get(character);
      });
    }

    return current;
  }
}
