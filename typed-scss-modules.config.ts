import { resolve as pathResolve } from "path";

const srcPath = pathResolve(__dirname, "src");
const stylesPath = pathResolve(srcPath, "shared/styles");

export const config = {
	includePaths: [stylesPath],
	aliasPrefixes: {
		"@": srcPath,
	},
};
