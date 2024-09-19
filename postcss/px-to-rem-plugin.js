module.exports = ({ development = false }) => {
	return {
		postcssPlugin: "px-to-rem-plugin",

		Once(root, result) {
			root.walkRules((rule) => {
				rule.walkDecls((decl) => {
					if (decl.prop === "--rem-size") {
						return;
					}

					let matchArray = decl.value.match(/-?\d*\.*\d+px/gi);

					if (matchArray !== null) {
						matchArray.forEach((value) => {
							let numericValue = value.match(/(-?\d*\.*\d+)px/i)[1];
							let remValue = numericValue / 16;

							if (development) {
								decl.value = decl.value.replace(
									value,
									`calc(${numericValue} / 16 * 1rem)`,
								);
							} else {
								decl.value = decl.value.replace(value, remValue + "rem");
							}
						});
					}
				});
			});

			return result;
		},
	};
};

module.exports.postcss = true;
