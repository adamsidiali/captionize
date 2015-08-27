App.info({
  name: 'Captionizer',
  description: 'Add beautiful text captions to your photos in seconds.',
  version: '1.0'
});

App.icons({
  'android_ldpi': 'public/icons/drawable-ldpi/Icon.png',
  'android_mdpi': 'public/icons/drawable-mdpi/Icon.png',
  'android_hdpi': 'public/icons/drawable-hdpi/Icon.png',
  'android_xhdpi': 'public/icons/drawable-xhdpi/Icon.png'
  //'android_xxhdpi': 'private/assets/drawable-xxhdpi/ic_launcher.png',
  //'android_xxxhdpi': 'private/assets/drawable-xxxhdpi/ic_launcher.png',
});

App.launchScreens({
  'android_ldpi_portrait': 'public/icons/drawable-ldpi/splash.png',
  'android_ldpi_landscape': 'public/icons/drawable-ldpi/splash.png',
  'android_mdpi_portrait': 'public/icons/drawable-mdpi/splash.png',
  'android_mdpi_landscape': 'public/icons/drawable-mdpi/splash.png',
  'android_hdpi_portrait': 'public/icons/drawable-hdpi/splash.png',
  'android_hdpi_landscape': 'public/icons/drawable-hdpi/splash.png',
  'android_xhdpi_portrait': 'public/icons/drawable-xhdpi/splash.png',
  'android_xhdpi_landscape': 'public/icons/drawable-xhdpi/splash.png'
});

App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('StatusBarBackgroundColor', '#333');
