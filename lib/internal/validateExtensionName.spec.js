import t from "tap"

import validateExtensionName from "./validateExtensionName"

t.throw(() => validateExtensionName(Number(1)),
  new TypeError("extensionName is required to be a string and can't be: \"1\" (number)")
)

t.throw(() => validateExtensionName(),
  new TypeError("extensionName is required to be a string and can't be: \"undefined\" (undefined)")
)

t.throw(() => validateExtensionName(""),
  new TypeError("extensionName is required to be a string and can't be: \"\" (string)")
)

t.equal(validateExtensionName("Test"), "Test")
t.equal(validateExtensionName(" Test"), "Test")
t.equal(validateExtensionName("Test "), "Test")
t.equal(validateExtensionName(" Test "), "Test")
