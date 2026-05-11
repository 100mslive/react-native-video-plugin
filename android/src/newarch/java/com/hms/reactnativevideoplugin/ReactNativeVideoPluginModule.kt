package com.hms.reactnativevideoplugin

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = ReactNativeVideoPluginModuleImpl.NAME)
class ReactNativeVideoPluginModule(
  reactContext: ReactApplicationContext,
) : NativeReactNativeVideoPluginSpec(reactContext) {
  private val impl = ReactNativeVideoPluginModuleImpl(reactContext)

  override fun getName(): String = ReactNativeVideoPluginModuleImpl.NAME

  override fun changeVirtualBackground(
    data: ReadableMap,
    promise: Promise,
  ) = impl.changeVirtualBackground(data, promise)

  override fun enableVideoPlugin(
    data: ReadableMap,
    promise: Promise,
  ) = impl.enableVideoPlugin(data, promise)

  override fun disableVideoPlugin(
    data: ReadableMap,
    promise: Promise,
  ) = impl.disableVideoPlugin(data, promise)
}
