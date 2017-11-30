

Render default content when no extension found

```js
<ExtensionPoint extensionName="NoHello">
  Hello from the Extension Point (default)
</ExtensionPoint>
```


Render an extension

<small>Try to change the `extensionName` to `Hello1` to see the default rendering provided by the Extension Point.</small>

```js
const { createExtensionRegistry } = require("..");

const Hello = () => (
  <div>Hello from Extension</div>
);

const registry = createExtensionRegistry();
registry.addExtension("Hello", Hello);

<ExtensionPoint registry={registry} extensionName="Hello">
  Hello from the Extension Point (default)
</ExtensionPoint>
```

```js
const { createExtensionRegistry } = require("..");

const Hello = ({ text = "Hello from Extension"}) => (
  <div>{text}</div>
);

const registry = createExtensionRegistry();
registry.addExtension("Hello", Hello);

<ExtensionPoint registry={registry} extensionName="Hello" text="Bonjour!"/>
```

```js
const { createExtensionRegistry } = require("..");

const Hello = ({ text = "Hello from Extension"}) => (
  <div>{text}</div>
);

const registry = createExtensionRegistry();
registry.addExtension("Hello", Hello);

<ExtensionPoint registry={registry} extensionName="Hello" text="Bonjour!">
{
  (Extension, props) => (
    Extension ? <strong><Extension {...props}/></strong> : null
  )
}
</ExtensionPoint>
```


Disable default rendering

```js
const { createExtensionRegistry } = require("..");

const registry = createExtensionRegistry();
registry.addExtension("Hello", null);

<ExtensionPoint registry={registry} extensionName="Hello">
  This should not be visible
</ExtensionPoint>
```

## Advanced examples

```js
const LoginDialog = require("../../example/LoginDialog").default;
const { createExtensionRegistry, ExtensionProvider } = require("..");

const extensions = createExtensionRegistry();

<ExtensionProvider registry={extensions}>
  <LoginDialog/>
</ExtensionProvider>
```

```js
const LoginDialog = require("../../example/LoginDialog").default;
const { createExtensionRegistry, ExtensionProvider } = require("..");

const EmployeeNumber = () => (
  <input type="number" name="employee_number" placeholder="employee number"/>
);

const extensions = createExtensionRegistry();
extensions.addExtension("LoginDialog", EmployeeNumber);

<ExtensionProvider registry={extensions}>
  <LoginDialog/>
</ExtensionProvider>
```
