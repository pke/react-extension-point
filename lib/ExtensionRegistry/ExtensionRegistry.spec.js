import t from "tap"

import ExtensionRegistry, { createExtensionRegistry } from "./ExtensionRegistry"

t.type(createExtensionRegistry, "function")

t.type(ExtensionRegistry, "object")
  
t.type(ExtensionRegistry.addExtension, "function")
t.equal(ExtensionRegistry.addExtension.length, 1) // instead of 2 because default arg

t.type(ExtensionRegistry.getExtension, "function")
t.equal(ExtensionRegistry.getExtension.length, 1)

t.throw(() => ExtensionRegistry.addExtension())
t.throw(() => ExtensionRegistry.addExtension(""))
t.notThrow(() => ExtensionRegistry.addExtension("Test", () => null))
t.throw(() => ExtensionRegistry.addExtension("Test"), new TypeError("extension is required"))
