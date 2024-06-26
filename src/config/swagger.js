const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Aridevs Mini Blog API",
			description:
				"API endpoints for a mini blog services documented on swagger",
			version: "1.0.0",
		},
		servers: [
			{
				url: "http://localhost:8001/",
				description: "Local server",
			},
		],
		securityDefinitions: {
			bearerAuth: {
				type: "apiKey",
				in: "header",
				name: "Authorization",
				description: "Bearer token to access these api endpoints",
				scheme: "bearer",
			},
		},

		security: [
			{
				bearerAuth: [],
			},
		],
	},
	// looks for configuration in specified directories
	apis: [
		"./src/routes/api/v1/authentication/*.js",
		"./src/routes/api/v1/users/*.js",
	],
};
const swaggerSpec = swaggerJsdoc(options);
function swaggerDocs(app, port) {
	// Swagger Page
	app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
	// Documentation in JSON format
	app.get("/docs.json", (req, res) => {
		res.setHeader("Content-Type", "application/json");
		res.send(swaggerSpec);
	});
}

module.exports = swaggerDocs;
