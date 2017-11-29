[![Travis](https://img.shields.io/travis/pke/react-extension-point.svg?style=flat-square)](https://travis-ci.org/pke/react-extension-point)
[![npm](https://img.shields.io/npm/v/react-extension-point.svg?style=flat-square)](https://www.npmjs.com/package/react-extension-point)
[![code coverage](https://img.shields.io/codecov/c/github/codecov/pke/react-extension-point.svg?style=flat-square)](https://codecov.io/gh/pke/react-extension-point)

# React Extension Point

Open your component for customisation deep in the component tree without adding new props via **Extensions** and **ExtensionPoints**.

1. Your component defines the **ExtensionPoint** where you want to allow an **Extension** component to enhance/modify your component.
2. Someone else provides the Extension which your **ExtensionPoint** is rendering

The contract established via **ExtensionPoint** also defines the props your want to make accessible to the potential **Extension**.

> Heavily inspired by [Eclipse Extension Points](https://wiki.eclipse.org/FAQ_What_are_extensions_and_extension_points%3F)

## The Journey

Lets say your (white-label) app provides a login dialog.
One of your clients wants to extend the login dialog with an additional field where the user must enter her employee number additionally/or in place of her email as you have originally designed the dialog.

One way to provide this kind of functionality would be to have some kind of logic inside the login dialog component, depending on the client you build the app for, to render the additional form input field.

This is our example base component (in a simplified form)

```js static
const LoginDialog = () => (
  <form>
    <input name="email" type="email"/>
    <input name="password" type="password"/>
    <input type="submit" value="Login"/>
  </form>
)
```

To add the employee number field we could use a prop

```js static
const LoginDialog = ({ useEmployeeNumber }) => (
  <form>
    <input name="email" type="email"/>
    <input name="password" type="password"/>
    { useEmployeeNumber && <input name="employee_number" type="number"/> }
    <input type="submit" value="Login"/>
  </form>
)
```

What if another client wants to "secure" the login dialog with a captcha?

```js static
const LoginDialog = ({ useEmployeeNumber, useCaptcha }) => (
  <form>
    <input name="email" type="email"/>
    <input name="password" type="password"/>
    { useEmployeeNumber && <input name="employee_number" type="number"/> }
    { useCaptcha && <Captcha name="captcha"/> }
    <input type="submit" value="Login"/>
  </form>
)
```

Wherever you render the login dialog you need to be aware of the clients requirements and render the dialog with the appropriate props.

```js static
const { config } = require(`${process.env.APP_CLIENT}/config`)

import LoginDialog from "components/LoginDialog"

const ClientLoginDialog = () (
  <LoginDialog useCaptcha={config.useCaptcha} useEmployeeNumber={config.useEmployeeNumber}/>
)
```

Every new variation of features from clients requires more props and conditional renderings in the LoginDialog. This is not even covering one of the clients to want to wrap the employee number in an extra field set inside the form with maybe a custom pattern validation added.

The solution this package offers is to use an `ExtensionPoint` components inside the `LoginDialog`.

```js static
const LoginDialog = () => (
  <form>
    <input name="email" type="email"/>
    <input name="password" type="password"/>
    <ExtensionPoint extensionName="LoginDialog"/>
    <input type="submit" value="Login"/>
  </form>
)
```

Each of your client apps would then use `addExtension` to provide a `LoginDialog` **Extension**.

One client could provide the `employee_number` field

```js static
// Client: ACME
import { addExtension } from "react-extension-point"

const LoginDialogExtension = () => (
  <input name="employee_number" type="number"/>
)

addExtension("LoginDialog", LoginDialogExtension)
```

Another client could provide the `Captcha` input

```js static
// Client: Foo
import { addExtension } from "react-extension-point"
import Captcha from "foo/components/Captcha"

const LoginDialogExtension = () => (
  <Captcha name="captcha"/>
)
addExtension("LoginDialog", LoginDialogExtension)
```

And yet another client could even provide a combination of both.

```js static
// Client: ACME-Foo
import { addExtension } from "react-extension-point"
import Captcha from "foo/components/Captcha"

const LoginDialogExtension = () => (
  <fieldset>
    <input name="employee_number" type="number"/>
    <Captcha name="captcha"/>
  </fieldset>
)
addExtension("LoginDialog", LoginDialogExtension)
```

Remember, the `LoginDialog` component is not aware of any of that. All it knows that at a specific point it provides a way to others to extend it.

The `LoginDialog` could also be designed in a way that one Extension replaces the default email & password combo with a employee number & password combo

```js static
const LoginDialog = () => (
  <form>
    <ExtensionPoint extensionName="LoginDialog">
      <input name="email" type="email"/>
      <input name="password" type="password"/>
    </ExtensionPoint>
    <input type="submit" value="Login"/>
  </form>
)
```

This usage of the `ExtensionPoint` renders its children if no Extension is available with the name `LoginDialog`.

```js static
// Client: ACME
const LoginDialogExtension = () => (
  <section>
    <input name="employee_number" type="number"/>
    <input name="password" type="password"/>
  </section>
)
```

Of course this could introduce code smell, because the Extension would need to know how the standard password is defined to replicate its functionality for the form submit. We can use another feature of the `ExtensionPoint` and that is **props propagation**.

```js static
const LoginDialog = () => (
  <form>
    <ExtensionPoint
      extensionName="LoginDialog"
      emailFieldName="email"
      passwordFieldName="password">
      <input name="email" type="email"/>
      <input name="password" type="password"/>
    </ExtensionPoint>
    <input type="submit" value="Login"/>
  </form>
)
```

Then our clients Extension code could use the `passwordFieldName` to add its password field

```js static
// Client: ACME
const LoginDialogExtension = ({ passwordFieldName }) => (
  <section>
    <input name="employee_number" type="number"/>
    <input name={passwordFieldName} type="password"/>
  </section>
)
```

But there is an even better way to let the Extension know about the password fields definition. Hand in the whole default password field.

```js static

const EmailField = () => (
  <input name="email" type="email"/>
)

const PasswordField = () => (
  <input name="password" type="password"/>
)

const LoginDialog = () => (
  <form>
    <ExtensionPoint
      extensionName="LoginDialog"
      EmailField={EmailField}
      PasswordField={PasswordField}>
      <EmailField/>
      <PasswordField/>
    </ExtensionPoint>
    <input type="submit" value="Login"/>
  </form>
)
```

Then you have the full power of the `LoginDialog` default components at your disposal in your Extension

```js static
// Client: ACME
const LoginDialogExtension = ({ PasswordField }) => (
  <section>
    <input name="employee_number" type="number"/>
    <PasswordField/>
  </section>
)
```

> Note the uppercase first letter on the prop. This tells React to treat this as a component.

## Use Cases

### 1. Render extension

The most simplest form is to insert an `<ExtensionPoint>` in your component where you want the extension to appear.
If no extension is registered nothing will be rendered.

```js static
<Header>
  <h1>Welcome</h1>
  <ExtensionPoint extensionName="SubTitle"/>
</Header>
```

### 2. Render extension or some default content

In this case you define an `<ExtensionPoin>` with children that are only rendered when there is no extension registered.

```js static
<Header>
  <h1>Welcome</h1>
  <ExtensionPoint extensionName="SubTitle">
    <h2>Enjoy reading this page</h2>
  </ExtensionPoint>
</Header>
```

### 3. Dynamically render some default content or wrap extension content

When you want to render default content or wrap the extensions content you can provide a function as the `<ExtensionPoint>` children.

This can be helpful when you want to wrap the extension in `<div>` or other markup, but only want that markup to appear if there is an extension registered.

So instead of having this markup, which might lead to strange styles on your page like gaps if you set some margings on elements.

#### Unused markup.

In this case the `<quote>` markup is always rendered even if there is no extension provided. This might lead to artifacts in the page like gaps or decorations depending on the style of your `<quote>` tags.

```js static
<Book>
  <quote>
    <ExtensionPoint extensionName="ThankYou"/>
  </quote>
</Book>
```

#### Only render markup with extension

In that case it would be better to render the `<quote>` only when there is an extension.

```js static
<Book>
  <ExtensionPoint extensionName="ThankYou">
  { 
    (Extension) => (
      Extension ? <quote><Extension/></quote> : null
    )
  }
  </ExtensionPoint>
</Book>
```

## TODO

- [] Provide a npm script to extract **ExtensionPoint** documentation. It should create a contract documentation which constsit of:  
  1. The name of the **ExtensionPoint**
  2. The props it hands to the **Extension**
  3. The default rendering if any

[](https://img.shields.io/travis/pke/react-extension-point.svg)
