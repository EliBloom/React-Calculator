import Trie from "../components/Autocomplete/Trie";

describe("Trie Autocomplete Test", () => {
  const trie = new Trie();
  const insertedWords = [];

  beforeAll(() => {
    trie.insert("primaryInsertion");
    insertedWords.push("primaryInsertion");
  });

  describe("Trie insert function", () => {
    it("should be able to insert a word", function () {
      trie.insert("secondaryInsertion");
      insertedWords.push("secondaryInsertion");
      expect(trie.contains("secondaryInsertion")).toEqual(true);
    });
  });

  describe("Trie fillTrie function", () => {
    it("should be able to insert an array of words", function () {
      const words = ["A", "few", "words"];
      trie.fillTrie(words);

      words.forEach((word) => {
        insertedWords.push(word);
        expect(trie.contains(word)).toEqual(true);
      });
    });
  });

  describe("Trie contains function", () => {
    it("should be able to tell whether or not the Trie contains a specified word", function () {
      insertedWords.forEach((word) => {
        expect(trie.contains(word)).toEqual(true);
      });
    });

    it("should return false if the Trie does not contain a word", function () {
      expect(trie.contains("notInTrie")).toEqual(false);
    });
  });

  describe("Trie startsWith function", () => {
    it("should be able to tell whether or not the Trie has a prefix", function () {
      expect(trie.startsWith("p")).toEqual(true);
      expect(trie.startsWith("pr")).toEqual(true);
      expect(trie.startsWith("primary")).toEqual(true);
    });

    it("should return false if the Trie does not have a prefix", function () {
      expect(trie.startsWith("qrimary")).toEqual(false);
    });
  });

  describe("Trie getPostFixes function", () => {
    it("should get a list of possible postFixes based on a prefix", function () {
      const words = [
        "flock",
        "find",
        "face",
        "for",
        "fleeting",
        "fleet",
        "fogger",
        "big",
        "frozen",
        "frought",
        "flogger",
        "fog",
        "fought",
      ];

      trie.fillTrie(words);
      let fPrefixPostfixes = trie.getPostFixes("f");
      let fPrefixWords = [
        "flock",
        "find",
        "face",
        "for",
        "fleeting",
        "fleet",
        "fogger",
        "frozen",
        "frought",
        "few",
        "flogger",
        "fog",
        "fought",
      ];
      expect(fPrefixPostfixes.length).toEqual(13);
      expect(
        fPrefixPostfixes.every((word) => fPrefixWords.includes(word))
      ).toEqual(true);

      let flPrefixPostfixes = trie.getPostFixes("fl");
      let flPrefixWords = ["flock", "fleeting", "fleet", "flogger"];

      expect(flPrefixPostfixes.length).toEqual(4);
      expect(
        flPrefixPostfixes.every((word) => flPrefixWords.includes(word))
      ).toEqual(true);
    });

    it("should return error message if no postfixes exist for given prefix", function () {
      let emptyPostfixes = trie.getPostFixes("ze");

      expect(emptyPostfixes).toEqual("Invalid Entry");
    });
  });
});
