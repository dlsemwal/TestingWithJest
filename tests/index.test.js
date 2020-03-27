describe("String test", () => {
  const testStringForFixMatch = "Hi! this is test 1";

  // For exact match
  test("Should pass for exact string", () => {
    expect(testStringForFixMatch).toBe("Hi! this is test 1");
  });

  //   for containing a string
  // it will check for string in a particular string
  test("Should contain test string", () => {
    expect(testStringForFixMatch).toContain("test");
  });

  // it will check for regex
  // in toMatch() we have to pass regex
  test("Should match regex", () => {
    expect(testStringForFixMatch).toMatch(/test/);
  });
});

describe("Testing Numbers", () => {
  const demoNumber = 566;

  //
  test("Number matchers", () => {
    // to check greater value
    expect(demoNumber).toBeGreaterThan(200);

    // to greater or equal value
    expect(demoNumber).toBeGreaterThanOrEqual(200);
    expect(demoNumber).toBeGreaterThanOrEqual(566);

    // to check less number
    expect(demoNumber).toBeLessThan(5000);

    // to check less number or equal
    expect(demoNumber).toBeLessThanOrEqual(2000);
    expect(demoNumber).toBeLessThanOrEqual(566);
  });
});

describe("Testing sum and minus", () => {
  function sum(a, b) {
    return a + b;
  }
  function minus(a, b) {
    return a - b;
  }
  it("Testing sum", () => {
    expect(sum(2, 2)).toBe(4);
  });
  it("Testing minus", () => {
    expect(minus(5, 2)).toBe(3);
  });
});
