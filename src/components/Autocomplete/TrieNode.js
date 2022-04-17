/**
 * This class is used to make up all of the nodes contained in the Autocomplete trie.
 */
export default class TrieNode {
  // Marks when the current TrieNode is the final character in a word
  isCompletedWord = false;
  // The individual character to be kept track of
  character;
  // Mapping of child nodes; <character, TrieNode(character)>
  children = new Map();

  // Construct new TrieNode
  constructor(character) {
    this.character = character;
  }
}
