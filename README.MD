# Nano Build

The one and only build center

The automated build center with streamlined build, test, and publish.
Requires latest current branch of [Node.js](https://nodejs.org/en/).

## Usage

Depending on what is being built, these repositories may be required to be in
the same parent directory: `NanoCore`, `NanoFilters`, `NanoDefender`,
`Edgyfy`, `uBlockProtector`, `uBlock`, `uAssets`.

```
node . <action> [<target>] [--upstream] [--pack] [--publish] [--trace-fs]

<action>          One of:
    --chromium    Build for Chromium
    --firefox     Build for Firefox
    --edge        Build for Edge
    --clean       Delete all build files, implicitly disable <target>, --upstream, "--pack", and "--publish"
<target>          One of:
    --both        (Default) Build Nano Adblocker and Nano Defender
    --adblocker   Build Nano Adblocker
    --defender    Build Nano Defender
    --ubo         Build uBlock Origin
--upstream        Prefer upstream repository
--pack            Create .zip packages
--publish         Publish build packages, implicitly apply "--pack"
--trace-fs        Log file system access
```