import React, { createContext, useContext, useEffect, useRef } from "react";
import { ExtensionRegistry } from "../ExtensionRegistry";
import invariant from "invariant";

interface ExtensionProviderProps {
  registry: ExtensionRegistry;
  children: React.ComponentType<any>;
}

export type ExtensionProvider = React.FC<ExtensionProviderProps>;

const ExtensionRegistryContext = createContext<ExtensionRegistry | null>(null);

const useExtensionRegistry = (): ExtensionRegistry | null => {
  const registry = useContext(ExtensionRegistryContext);
  return registry;
};

const ExtensionProvider: React.FC<ExtensionProviderProps> = ({ registry, children }) => {
  const initialRegistry = useRef<ExtensionRegistry>(registry);

  useEffect(() => {
    invariant(
      initialRegistry.current === registry,
      "You can't change the extension registry after it has been rendered"
    );
  }, [registry]);

  return (
    <ExtensionRegistryContext.Provider value={registry}>
      {React.Children.only(children)}
    </ExtensionRegistryContext.Provider>
  );
};

export default ExtensionProvider;
export { useExtensionRegistry };
