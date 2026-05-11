package com.hms.reactnativevideoplugin

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = ReactNativeVideoPluginModuleImpl.NAME)
class ReactNativeVideoPluginModule(
  reactContext: ReactApplicationContext,
) : ReactContextBaseJavaModule(reactContext) {
  private val impl = ReactNativeVideoPluginModuleImpl(reactContext)

  override fun getName(): String = ReactNativeVideoPluginModuleImpl.NAME

  @ReactMethod
  fun changeVirtualBackground(
    data: ReadableMap,
    promise: Promise?,
  ) = impl.changeVirtualBackground(data, promise)

  @ReactMethod
  fun enableVideoPlugin(
    data: ReadableMap,
    promise: Promise?,
  ) = impl.enableVideoPlugin(data, promise)

  @ReactMethod
  fun disableVideoPlugin(
    data: ReadableMap,
    promise: Promise?,
  ) = impl.disableVideoPlugin(data, promise)
}
