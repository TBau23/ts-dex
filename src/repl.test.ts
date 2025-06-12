import { cleanInput } from "./repl";
import { initState } from "./state.js";
import { describe, test, expect } from "vitest";

describe.each([
    {
      input: "  hello  world  ",
      expected: ["hello", "world"],
    },
    {
      input: "sup tech bruv    ",
      expected: ["sup", "tech", "bruv"],
    }, 
    {
      input: "  ",
      expected: [],
    }
  ])("cleanInput($input)", ({ input, expected }) => {
    test(`Expected: ${expected}`, () => {
      const actual = cleanInput(input);
      expect(actual).toHaveLength(expected.length);
      for (const i in expected) {
        expect(actual[i]).toBe(expected[i]);
      }
    });
  });

  describe.each([
    {
      input: "exit",
      expectedName: "exit",
      shouldExist: true
    },
    {
      input: "help",
      expectedName: "help",
      shouldExist: true
    },
    {
      input: "unknown",
      expectedName: null,
      shouldExist: false
    }
  ])("getCommands()", ({ input, expectedName, shouldExist }) => {
    test(`Command: ${input}`, () => {
      const state = initState();
      const actual = state.commands[input];
      
      if (shouldExist) {
        expect(actual).toBeDefined();
        expect(actual.name).toBe(expectedName);
        expect(actual.description).toBeDefined();
        expect(actual.callback).toBeInstanceOf(Function);
      } else {
        expect(actual).toBeUndefined();
      }
    });
  });