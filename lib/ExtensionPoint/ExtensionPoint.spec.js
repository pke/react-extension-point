import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ExtensionPoint, {
  ExtensionProvider as Extensions,
  createExtensionRegistry,
  ExtensionRegistry,
} from "..";
import { JSDOM } from "jsdom";

const { window } = new JSDOM("<!doctype html><html><body></body></html>");
global.window = window;
global.document = window.document;
global.navigator = window.navigator;

describe("ExtensionPoint", () => {
  test("addExtension/getExtension to/from default context", () => {
    const registry = createExtensionRegistry();
    const Test = () => <div>Test Extension</div>;
    registry.addExtension("Test", Test);
    expect(registry.getExtension("Test")).toBe(Test);
  });

  test("requires extensionName arg", () => {
    expect(() => {
      const registry = createExtensionRegistry();
      renderToStaticMarkup(
        <Extensions registry={registry}>
          <ExtensionPoint />
        </Extensions>
      );
    }).toThrow(
      new TypeError(
        'extensionName is required to be a string and can\'t be: "undefined" (undefined)'
      )
    );
  });

  test("render extension from default extension registry", () => {
    const Test = () => <div>Test Extension</div>;
    ExtensionRegistry.addExtension("Test", Test);
    const result = renderToStaticMarkup(
      <Extensions registry={ExtensionRegistry}>
        <ExtensionPoint extensionName="Test" />
      </Extensions>
    );
    expect(result).toBe("<div>Test Extension</div>");
  });

  test("render extension from props extension registry", () => {
    const Test = () => <div>Test Extension</div>;
    ExtensionRegistry.addExtension("Test", Test);
    const result = renderToStaticMarkup(
      <ExtensionPoint extensionName="Test" registry={ExtensionRegistry} />
    );
    expect(result).toBe("<div>Test Extension</div>");
  });

  test("render extension from context", () => {
    const registry = createExtensionRegistry();
    const Test = () => <div>Test Extension</div>;
    registry.addExtension("Test", Test);
    const result = renderToStaticMarkup(
      <Extensions registry={registry}>
        <ExtensionPoint extensionName="Test" />
      </Extensions>
    );
    expect(result).toBe("<div>Test Extension</div>");
  });

  test("render nothing if extension is missing", () => {
    const registry = createExtensionRegistry();
    const result = renderToStaticMarkup(
      <Extensions registry={registry}>
        <ExtensionPoint extensionName="MissingExtension" />
      </Extensions>
    );
    expect(result).toBe("");
  });

  test("renders default for missing extension", () => {
    const registry = createExtensionRegistry();
    const result = renderToStaticMarkup(
      <Extensions registry={registry}>
        <ExtensionPoint extensionName="NotRegistered">
          <div>Default</div>
        </ExtensionPoint>
      </Extensions>
    );
    expect(result).toBe("<div>Default</div>");
  });

  test("render function", () => {
    const registry = createExtensionRegistry();
    const DefaultExtension = () => <div>No Extension</div>;
    const result = renderToStaticMarkup(
      <Extensions registry={registry}>
        <ExtensionPoint extensionName="NotRegistered">
          {(Extension = DefaultExtension) => <Extension />}
        </ExtensionPoint>
      </Extensions>
    );
    expect(result).toBe("<div>No Extension</div>");
  });

  test("render function returning undefined", () => {
    const registry = createExtensionRegistry();
    const result = renderToStaticMarkup(
      <Extensions registry={registry}>
        <ExtensionPoint extensionName="NotRegistered">
          {() => undefined}
        </ExtensionPoint>
      </Extensions>
    );
    expect(result).toBe("");
  });

  test("prevent default rendering via extension shortcut null", () => {
    const registry = createExtensionRegistry();
    registry.addExtension("NullExtension", null);
    const result = renderToStaticMarkup(
      <Extensions registry={registry}>
        <ExtensionPoint extensionName="NullExtension">
          <div>Default</div>
        </ExtensionPoint>
      </Extensions>
    );
    expect(result).toBe("");
  });

  test("Handle string children", () => {
    const registry = createExtensionRegistry();
    const result = renderToStaticMarkup(
      <Extensions registry={registry}>
        <ExtensionPoint extensionName="NotExisting">A string</ExtensionPoint>
      </Extensions>
    );
    expect(result).toBe("A string");
  });
  test("Render children with props", () => {
    const registry = createExtensionRegistry();
    const result = renderToStaticMarkup(
      <Extensions registry={registry}>
        <ExtensionPoint extensionName="NotRegistered" type="button">
          <button>value</button>
        </ExtensionPoint>
      </Extensions>
    );
    expect(result).toBe('<button type="button">value</button>');
  });

  // test("Prevent settings of new registry", () => {
  //   const registry1 = createExtensionRegistry();
  //   const registry2 = createExtensionRegistry();

  //   const ProviderContainer = ({ registry }) => {
  //     return (
  //       <Extensions registry={registry}>
  //         <ExtensionPoint extensionName="Unknown" />
  //       </Extensions>
  //     );
  //   };

  //   // Initial render with registry1
  //   const { rerender } = render(<ProviderContainer registry={registry1} />);

  //   // Expect a specific error when trying to rerender with a new registry
  //   expect(() => {
  //     rerender(<ProviderContainer registry={registry2} />);
  //   }).toThrowError(
  //     "You can't change the extension registry after it has been rendered"
  //   );
  // });
});
