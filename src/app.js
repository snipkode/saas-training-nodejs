// app.js
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

const swaggerDocument = yaml.load('./api-spec.yaml');

app.use(express.json());
app.use('/', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
