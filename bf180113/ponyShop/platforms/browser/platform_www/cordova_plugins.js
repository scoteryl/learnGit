cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/src/browser/DeviceProxy.js",
        "id": "cordova-plugin-device.DeviceProxy",
        "pluginId": "cordova-plugin-device",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-dialogs/www/notification.js",
        "id": "cordova-plugin-dialogs.notification",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/cordova-plugin-dialogs/www/browser/notification.js",
        "id": "cordova-plugin-dialogs.notification_browser",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/cordova.custom.plugins.exitapp/www/ExitApp.js",
        "id": "cordova.custom.plugins.exitapp.exitApp",
        "pluginId": "cordova.custom.plugins.exitapp",
        "merges": [
            "navigator.app"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-compat": "1.0.0",
    "cordova-plugin-device": "1.1.6",
    "cordova-plugin-dialogs": "1.3.3",
    "cordova-plugin-geolocation": "2.4.3",
    "cordova-plugin-whitelist": "1.3.2",
    "cordova.custom.plugins.exitapp": "1.0.0"
}
// BOTTOM OF METADATA
});