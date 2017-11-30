
With the `ExtensionProvider` your code looks like this:


```js static
const { createExtensionRegistry, ExtensionProvider } = require("..");

const Hello = () => (
  <div>Hello from Extension</div>
);

const Greeting = () => (
  <section>
    <ExtensionPoint extensionName="Greeting">
      This is the default greeting, if no extension is registered
    </ExtensionPoint>
  </section>
);

const App = ({ children, title }) => (
  <main>
    <h1>{title}</h1>
    <Greeting/>
  </main>
);

const registry = createExtensionRegistry();
registry.addExtension("Greeting", Hello);

<ExtensionProvider registry={registry}>
  <App title="App using ExtensionProvider"/>
</ExtensionProvider>
```

Without `ExtensionProvider` you have to hand down the extensions yourself through the whole component hierarchy.

```js static
const { createExtensionRegistry, ExtensionProvider } = require("..");

const Hello = () => (
  <div>Hello from Extension</div>
);

const Greeting = ({ registry }) => (
  <section>
    <ExtensionPoint registry={registry} extensionName="Greeting">
      This is the default greeting, if no extension is registered
    </ExtensionPoint>
  </section>
);

const App = ({ children, title, registry }) => (
  <main>
    <h1>{title}</h1>
    <Greeting registry={registry}/>
  </main>
);

const registry = createExtensionRegistry();
registry.addExtension("Greeting", Hello);

<App title="App without ExtensionProvider" registry={registry}/>
```
