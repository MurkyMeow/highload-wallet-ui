const isProduction = process.env.NODE_ENV === "production";

/** @type {import('postcss-load-config').Config} */
const config = {
	plugins: [
		"postcss-flexbugs-fixes",
		[
			"postcss-preset-env",
			{
				autoprefixer: {
					flexbox: "no-2009",
				},
				stage: isProduction ? 0 : 3,
				features: {
					"custom-properties": false,
					"cascade-layers": false,
				},
			},
		],
		...(isProduction ? ["postcss-sort-media-queries"] : []),

		[
			"./postcss/px-to-rem-plugin",
			{
				development: process.env.NODE_ENV === "development",
			},
		],
	],
};

module.exports = config;
