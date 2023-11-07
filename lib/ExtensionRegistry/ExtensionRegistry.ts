import React from "react"; // Import React
import validateExtensionName from "../internal/validateExtensionName";

const required = (name: string): never => {
  throw new TypeError(`${name} is required`);
};

export type ExtensionType = React.ComponentType<any>;

type AddExtension = (
  extensionName: string,
  extension?: ExtensionType
) => void;

type GetExtension = (
  extensionName: string
) => ExtensionType

export interface ExtensionRegistry {
  addExtension: AddExtension;
  getExtension: GetExtension;
}

export type CreateExtensionRegistry = () => ExtensionRegistry;

const createExtensionRegistry = (): ExtensionRegistry => {
  const extensions:{ [extensionName: string]: ExtensionType }  = {};
  const addExtension: AddExtension = (extensionName, extension) => {
    extensionName = validateExtensionName(extensionName);
    if (!extension && extension !== null) {
      return required("extension");
    }
    extensions[extensionName.toLowerCase()] = extension;
  };

  const getExtension: GetExtension = (extensionName) => {
    extensionName = validateExtensionName(extensionName);
    return extensions[extensionName.toLowerCase()];
  };

  return  {
    addExtension,
    getExtension,
  };
};

const defaultRegistry = createExtensionRegistry();

export { createExtensionRegistry, defaultRegistry as default };

