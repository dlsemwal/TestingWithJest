describe("Practice tests", () => {
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

    // We can also use it instead test
    it("Testing sum", () => {
      expect(sum(2, 2)).toBe(4);
    });

    it("Testing minus", () => {
      expect(minus(5, 2)).toBe(3);
    });
  });

  describe("Testing Array", () => {
    const testArray = ["USD", "AUD", "INR"];

    // testing array by simple method
    it("array testing 1", () => {
      // compare length of array
      expect(testArray.length).toBe(3);
    });

    it("array testing 2", () => {
      // we can't use toBe method here because it checks the object reference
      //  it will match the exact sequence of array
      // if array is not of same sequence then this test will be broken
      expect(testArray).toEqual(["USD", "AUD", "INR"]);
    });

    it("array testing 3", () => {
      // another method is to check every element of array.
      // but in this method we are specifically checking on basis of
      // index which can be changed conditionally.
      expect(testArray[0]).toBe("USD");
      expect(testArray[1]).toBe("AUD");
      expect(testArray[2]).toBe("INR");
    });

    it("array testing 4", () => {
      // Ideal way for testing an array.
      expect(testArray).toEqual(expect.arrayContaining(["INR", "USD", "AUD"]));
    });
  });

  describe("Testing Object", () => {
    const testObj = { id: 1, name: "john doe", address: "US" };

    it("object test 1", () => {
      // this method compare two object having
      // both object must have exact same number of properties

      expect(testObj).toEqual({ id: 1, name: "john doe", address: "US" });
    });

    it("object test 2", () => {
      // this method compare two object having
      // target object can have more properties than compare object

      expect(testObj).toMatchObject({ id: 1, name: "john doe" });
    });

    it("object test 3", () => {
      // this method can compare that a particular property with particular
      // value is in target value or not

      expect(testObj).toHaveProperty("id", 1);
    });
  });

  describe("Error testing", () => {
    const testFn = x => {
      if (!x) {
        throw new Error("Something went wrong!");
      }
      return x;
    };

    test("error testing 1", () => {
      // JS consider following values as falsy
      // undefined
      // null
      // NaN
      // False
      // ''
      // 0

      const args = [undefined, null, NaN, false, "", 0];

      args.forEach(value => {
        // this method will check that testFn is throwing error or not
        expect(() => {
          testFn(value);
        }).toThrow();
      });
    });
  });
});
