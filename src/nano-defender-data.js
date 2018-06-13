/**
 * Nano Defender build data.
 */
"use strict";

/**
 * Load modules.
 * @const {Module}
 */
const assert = require("assert");
const fs = require("../lib/promise-fs.js");

/**
 * Extra information specific to Chromium.
 * @const {Object}
 */
exports.chromium = {
    id: "ggolfgbegefeeoocgjbmkembbncoadlb",
};
/**
 * Extra information specific to Firefox.
 * @const {Object}
 */
exports.firefox = {
    id: "{be5b33ab-bfd7-44fc-b54c-b9654587233d}",
};

/**
 * Patch manifest.
 * @async @function
 * @param {Enum} browser - One of "chromium", "firefox", "edge".
 * @return {string} The manifest
 */
exports.patchManifest = async (browser) => {
    assert(browser === "chromium" || browser === "firefox" || browser === "edge");

    if (browser === "chromium") {
        return;
    }

    const path = "./dist/nano_defender_" + browser + "/manifest.json";
    let manifest = await fs.readFile(path, "utf8");
    manifest = JSON.parse(manifest);

    if (browser === "firefox") {
        manifest.applications = {
            "gecko": {
                "id": exports.firefox.id,
                "strict_min_version": "58.0"
            }
        };
        manifest.background.scripts = [
            "common.js",
            "platform/firefox-vars.js",
            "background/core.js",
            "platform/chromium-background.js", // This is not a mistake
            "platform/firefox-background.js",
            "background/rules.js",
            "background/debug.js"
        ];
        manifest.content_scripts.js = [
            "common.js",
            "libdom.js",
            "content/core.js",
            "platform/firefox-content.js",
            "content/rules-common.js",
            "content/rules-specific.js",
            "content/rules-sticky.js",
            "content/debug.js"
        ];
        delete manifest.minimum_chrome_version;
    } else if (browser === "edge") {
        // Edge does not care if the size is actually right but do care if the
        // key name is right
        manifest["-ms-preload"] = {
            "backgroundScript": "edgyfy.js",
            "contentScript": "edgyfy.js"
        };
        manifest.background.persistent = true;
        manifest.background.scripts = [
            "common.js",
            "platform/edge-vars.js",
            "background/core.js",
            "background/rules.js",
            "background/debug.js"
        ];
        manifest.browser_action.default_icon = {
            "38": "icon128.png"
        };
        manifest.browser_specific_settings = {
            "edge": {
                "browser_action_next_to_addressbar": true
            }
        };
        manifest.description = "An anti-adblock defuser for Nano Adblocker";
        manifest.icons = {
            "128": "icon128.png",
            "16": "icon128.png"
        };
        delete manifest.minimum_chrome_version;
        manifest.minimum_edge_version = "41.16299.248.0";
    }

    await fs.writeFile(path, JSON.stringify(manifest, null, 2), "utf8");
};
