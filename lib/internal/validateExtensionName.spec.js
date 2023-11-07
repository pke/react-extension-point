import validateExtensionName from "./validateExtensionName";

describe('validateExtensionName Tests', () => {
  test('throws TypeError for number', () => {
    expect(() => validateExtensionName(Number(1))).toThrow(new TypeError("extensionName is required to be a string and can't be: \"1\" (number)"));
  });

  test('throws TypeError for undefined', () => {
    expect(() => validateExtensionName()).toThrow(new TypeError("extensionName is required to be a string and can't be: \"undefined\" (undefined)"));
  });

  test('throws TypeError for empty string', () => {
    expect(() => validateExtensionName("")).toThrow(new TypeError("extensionName is required to be a string and can't be: \"\" (string)"));
  });

  test('returns "Test" for "Test"', () => {
    expect(validateExtensionName("Test")).toBe("Test");
  });

  test('returns "Test" for " Test"', () => {
    expect(validateExtensionName(" Test")).toBe("Test");
  });

  test('returns "Test" for "Test "', () => {
    expect(validateExtensionName("Test ")).toBe("Test");
  });

  test('returns "Test" for " Test "', () => {
    expect(validateExtensionName(" Test ")).toBe("Test");
  });
});
