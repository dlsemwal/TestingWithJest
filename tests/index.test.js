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

describe("Testing with mock function", () => {
  function forEach(items, callback) {
    for (let index = 0; index < items.length; index++) {
      callback(items[index]);
    }
  }

  it("should test with mock function", () => {
    const mockCallback = jest.fn(x => 42 + x);
    forEach([0, 1], mockCallback);

    // The mock function will be called twice
    expect(mockCallback.mock.calls.length).toBe(2);

    // 0 was the first argument of the first call to the function
    expect(mockCallback.mock.calls[0][0]).toBe(0);

    // 1 was the first argument of the second call to the function
    expect(mockCallback.mock.calls[1][0]).toBe(1);

    // 42 was the return value of the first call to the function
    expect(mockCallback.mock.results[0].value).toBe(42);
  });

  it("testing of mock function returning different values on every call", () => {
    const myMock = jest.fn();
    console.log(myMock());
    // > undefined

    myMock
      .mockReturnValueOnce(10)
      .mockReturnValueOnce("x")
      .mockReturnValue(true);

    console.log(myMock(), myMock(), myMock(), myMock());
    // > 10, 'x', true, true
  });
});

describe("mock modules", () => {
  jest.mock("../index"); // this happens automatically with automocking
  const mockIndex = require("../index");

  it("mocking of modules", () => {
    mockIndex.mockImplementation(() => 42);
    mockIndex();
    // > 42
  });

  it("mock module different implementation multiple time", () => {
    const myMockFn = jest
      .fn()
      .mockImplementationOnce(cb => cb(null, true))
      .mockImplementationOnce(cb => cb(null, false));

    myMockFn((err, val) => console.log(val));
    // > true

    myMockFn((err, val) => console.log(val));
    // > false

    // another method of implementation
    const myMockFn2 = jest
      .fn(() => "default")
      .mockImplementationOnce(() => "first call")
      .mockImplementationOnce(() => "second call");

    console.log(myMockFn2(), myMockFn2(), myMockFn2(), myMockFn2());
    // > 'first call', 'second call', 'default', 'default'
  });

  it("mocking of object in object", () => {
    const myObj = {
      myMethod: jest.fn().mockReturnThis()
    };

    // is the same as

    const otherObj = {
      myMethod: jest.fn(function() {
        return this;
      })
    };
  });

  it("testing with custom matchers", () => {
    const mockFunc = jest
      .fn()
      .mockReturnValue("default")
      .mockImplementation(scalar => 42 + scalar)
      .mockName("add42");

    [1, 2, 3, 4].forEach(v => {
      mockFunc();
    });

    // if the mock function was called at least once
    expect(mockFunc.mock.calls.length).toBeGreaterThan(0);

    // If the mock function was called at least once with the specified args
    expect(mockFunc.mock.calls).toContainEqual([arg1, arg2]);

    // If the last call to the mock function was called with the specified args
    expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1]).toEqual([
      arg1,
      arg2
    ]);

    // If the first arg of the last call to the mock function was `42`
    // (note that there are no sugar helpers for this specific of an assertion)
    expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1][0]).toBe(42);

    // If a snapshot will check that a mock was invoked the same number of times,
    // and in the same order, with the same arguments. It will also assert on the name.
    expect(mockFunc.mock.calls).toEqual([[arg1, arg2]]);
    expect(mockFunc.getMockName()).toBe("a mock name");
  });
});
