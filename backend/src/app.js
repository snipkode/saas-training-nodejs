// app.js
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const cors = require('cors');
const routes = require('./routes');
const authController = require('./controllers/cAuth');
const verifyTenantMiddleware = require('./middleware/verifyTenantExist');
const paymentController = require('./controllers/cPayment');

const app = express();
const port = process.env.PORT || 3000;

const swaggerDocument = yaml.load('./swagger.yaml');

app.use(cors());
app.use(express.json());

app.post('/api/login', authController.loginUser);
app.post('/api/register', authController.registerUser);
app.post('/api/payments/notification', paymentController.handleNotification);

app.use('/api', authController.verifyToken, verifyTenantMiddleware.verifyTenantExist, routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});