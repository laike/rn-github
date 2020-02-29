 npx react-native bundle --platform android --entry-file index.js --bundle-
output ./bundles/index.android.bundle  --dev false

code-push release iOSRNHybridForAndroid ./bundles/index.android.bundle 1.0.2 --deploymentName Production --description "1.支持文章缓存。" --mandatory true


code-push release-react  iOSRNHybridForAndroid   --targetBinaryVersion "1.0.2" -m  --description "Modified the header color"  