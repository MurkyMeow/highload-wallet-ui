/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,

	experimental: {},

	eslint: {
		ignoreDuringBuilds: true,
	},

	typescript: {
		ignoreDuringBuilds: true,
		ignoreBuildErrors: true,
	},
};

export default nextConfig;
