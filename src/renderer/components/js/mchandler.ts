import {Installer} from "@xmcl/installer";
import {MinecraftLocation, ResolvedVersion, Version} from "@xmcl/core";

const minecraft: MinecraftLocation;
const version: string; // version string like 1.13
const resolvedVersion: ResolvedVersion = await Version.parse(version);
await Installer.installAssets(resolvedVersion);