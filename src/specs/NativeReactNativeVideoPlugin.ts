import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  changeVirtualBackground(data: Object): Promise<boolean>;
  enableVideoPlugin(data: Object): Promise<boolean>;
  disableVideoPlugin(data: Object): Promise<boolean>;
}

// NOTE: This default export looks unused at JS runtime — the consumer wrapper
// at src/modules/ReactNativeVideoPluginModule.ts does its own
// TurboModuleRegistry.get<Spec>(...) call with a Proxy fallback (handles iOS,
// where this module legitimately doesn't exist). Don't delete it though:
// React Native's Codegen statically parses this call to extract the module
// name. Removing it fails codegen with `UnusedModuleInterfaceParserError`.
export default TurboModuleRegistry.getEnforcing<Spec>('ReactNativeVideoPlugin');
