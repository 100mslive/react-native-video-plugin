package com.hms.reactnativevideoplugin

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class ReactNativeVideoPluginPackage : BaseReactPackage() {
  override fun getModule(
    name: String,
    reactContext: ReactApplicationContext,
  ): NativeModule? =
    if (name == ReactNativeVideoPluginModuleImpl.NAME) {
      ReactNativeVideoPluginModule(reactContext)
    } else {
      null
    }

  override fun getReactModuleInfoProvider(): ReactModuleInfoProvider =
    ReactModuleInfoProvider {
      mapOf(
        ReactNativeVideoPluginModuleImpl.NAME to
          ReactModuleInfo(
            ReactNativeVideoPluginModuleImpl.NAME,
            ReactNativeVideoPluginModuleImpl.NAME,
            false, // canOverrideExistingModule
            false, // needsEagerInit
            false, // hasConstants
            false, // isCxxModule
            true,  // isTurboModule
          ),
      )
    }
}
