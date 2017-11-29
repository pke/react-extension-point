import t from "tap"

import { JSDOM } from "jsdom"

const { window } = new JSDOM("<!doctype html><html><body></body></html>")

global.window = window
global.document = window.document
global.navigator = window.navigator

import React from "react"
import { renderToStaticMarkup } from "react-dom/server"

import { mount } from "../../spec/enzyme"

import ExtensionPoint, { ExtensionProvider as Extensions, createExtensionRegistry, ExtensionRegistry } from ".."

t.test("addExtension/getExtension to/from default context", t => {
  t.plan(1)
  const registry = createExtensionRegistry()
  
  const Test = () => <div>Test Extension</div>
  registry.addExtension("Test", Test)
  t.equal(registry.getExtension("Test"), Test)
})

t.test("requires extensionName arg", t => {
  t.plan(1)
  
  t.throws(
    function() { 
      const registry = createExtensionRegistry()
      renderToStaticMarkup(
        <Extensions registry={registry}>
          <ExtensionPoint/>
        </Extensions>
      )
    },
    new TypeError("extensionName is required")
  )
})

t.test("render extension from default extension registry", t => {
  t.plan(1)

  const Test = () => <div>Test Extension</div>
  ExtensionRegistry.addExtension("Test", Test)
  
  const result = renderToStaticMarkup(
    <ExtensionPoint extensionName="Test"/>
  )
  t.equal(result, "<div>Test Extension</div>")
})

t.test("render extension from props extension registry", t => {
  t.plan(1)

  const Test = () => <div>Test Extension</div>
  ExtensionRegistry.addExtension("Test", Test)
  
  const result = renderToStaticMarkup(
    <ExtensionPoint extensionName="Test" registry={ExtensionRegistry}/>
  )
  t.equal(result, "<div>Test Extension</div>")
})


t.test("render extension from context", t => {
  t.plan(1)

  const registry = createExtensionRegistry()
  
  const Test = () => <div>Test Extension</div>
  registry.addExtension("Test", Test)
  
  const result = renderToStaticMarkup(
    <Extensions registry={registry}>
      <ExtensionPoint extensionName="Test"/>
    </Extensions>
  )
  t.equal(result, "<div>Test Extension</div>")
})

t.test("render nothing if extension is missing", t => {
  t.plan(1)
  const registry = createExtensionRegistry()
  
  const result = renderToStaticMarkup(
    <Extensions registry={registry}>
      <ExtensionPoint extensionName="MissingExtension"/>
    </Extensions>
  )
  t.equal(result, "")
})

t.test("renders default for missing extension", function(t) {
  t.plan(1)
  const registry = createExtensionRegistry()

  const result = renderToStaticMarkup(
    <Extensions registry={registry}>
      <ExtensionPoint extensionName="NotRegistered">
        <div>Default</div>
      </ExtensionPoint>
    </Extensions>
  )
  t.equal(result, "<div>Default</div>")
})

t.test("render function", function(t) {
  t.plan(1)
  
  const registry = createExtensionRegistry()

  const DefaultExtension = () => (
    <div>No Extension</div>
  )
  const result = renderToStaticMarkup(
    <Extensions registry={registry}>
      <ExtensionPoint extensionName="NotRegistered">
        {
          (Extension = DefaultExtension) => (
            <Extension/>
          )
        }
      </ExtensionPoint>
    </Extensions>
  )
  t.equal(result, "<div>No Extension</div>")
})

t.test("render function returning undefined", function(t) {
  t.plan(1)
  const registry = createExtensionRegistry()
  
  const result = renderToStaticMarkup(
    <Extensions registry={registry}>
      <ExtensionPoint extensionName="NotRegistered">
        {
          () => (
            undefined
          )
        }
      </ExtensionPoint>
    </Extensions>
  )
  t.equal(result, "")
})

t.test("prevent default rendering via extension shortcut null", function(t) {
  t.plan(1)
  const registry = createExtensionRegistry()
  registry.addExtension("NullExtension", null)

  const result = renderToStaticMarkup(
    <Extensions registry={registry}>
      <ExtensionPoint extensionName="NullExtension">
        <div>Default</div>
      </ExtensionPoint>
    </Extensions>
  )
  t.equal(result, "")
})

t.test("Handle string children", t => {
  t.plan(1)
  const registry = createExtensionRegistry()
  
  const result = renderToStaticMarkup(
    <Extensions registry={registry}>
      <ExtensionPoint extensionName="NotExisting">
        A string
      </ExtensionPoint>
    </Extensions>
  )
  t.equal(result, "A string")
})

t.test("Render children with props", t => {
  t.plan(1)
  const registry = createExtensionRegistry()
  
  const result = renderToStaticMarkup(
    <Extensions registry={registry}>
      <ExtensionPoint extensionName="NotRegistered" type="button">
        <button>value</button>
      </ExtensionPoint>
    </Extensions>
  )
  t.equal(result, "<button type=\"button\">value</button>")
})

t.test("Prevent settings of new registry", t => {
  t.plan(1)
  const registry1 = createExtensionRegistry()
  const registry2 = createExtensionRegistry()

  class ProviderContainer extends React.Component {
    constructor() {
      super()
      this.state = { registry: registry1 }
    }
    render() {
      return (
        <Extensions registry={this.state.registry}>
          <ExtensionPoint extensionName="Unknown"/>
        </Extensions>
      )
    }
  }
  const container = mount(<ProviderContainer/>)
  //const child = container.find(ExtensionPoint).first()
  //const reg = container.context("registry")
  t.throws( () => container.setState({ registry: registry2 }))
})
