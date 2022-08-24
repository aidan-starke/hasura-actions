const { join } = require("path");
const { merge } = require("webpack-merge");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const commonConfig = {
	target: "node",
	context: __dirname,
	entry: { index: "index.ts" },
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: {
					loader: "ts-loader",
				},
			},
		],
	},

	resolve: {
		extensions: [".tsx", ".ts", ".js", ".json"],
		plugins: [new TsconfigPathsPlugin()],
	},
	externalsPresets: { node: true },
	output: {
		path: join(__dirname, "./dist"),
		filename: "[name].js",
		libraryTarget: "commonjs",
		clean: true,
	},
};

const devConfig = {
	devtool: "inline-source-map",
	stats: "minimal",
};

const prodConfig = {};

module.exports = (_, args) => {
	switch (args.mode) {
		case "development":
			return merge(commonConfig, devConfig);
		case "production":
			return merge(commonConfig, prodConfig);
	}
};
