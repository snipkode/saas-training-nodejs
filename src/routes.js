// routes.js
const express = require('express');
const router = express.Router();

const userController = require('./controllers/cUsers');
const subscriptionPlanController = require('./controllers/cSubscriptionPlan');
const userSubscriptionController = require('./controllers/cUserSubscriptionPlan');
const aiPromptUsageController = require('./controllers/cPromptUsage');
const paymentController = require('./controllers/cPayment');
const authController = require('./controllers/cAuth');
const tenantMiddleware = require('./middleware/tenant/verifyTenant');

// Users
router.post('/users', authController.verifyToken, tenantMiddleware.verifyTenant, userController.createUser);
router.get('/users', authController.verifyToken, tenantMiddleware.verifyTenant, userController.getUsers);
router.get('/users/:id', authController.verifyToken, tenantMiddleware.verifyTenant, userController.getUserById);
router.put('/users/:id', authController.verifyToken, tenantMiddleware.verifyTenant, userController.updateUser);
router.delete('/users/:id', authController.verifyToken, tenantMiddleware.verifyTenant, userController.deleteUser);

// Subscription Plans
router.post('/subscription-plans', subscriptionPlanController.createSubscriptionPlan);
router.get('/subscription-plans', subscriptionPlanController.getSubscriptionPlans);
router.put('/subscription-plans/:id', subscriptionPlanController.updateSubscriptionPlan);
router.delete('/subscription-plans/:id', subscriptionPlanController.deleteSubscriptionPlan);

// User Subscriptions
router.post('/user-subscriptions', authController.verifyToken, tenantMiddleware.verifyTenant, userSubscriptionController.createUserSubscription);
router.get('/user-subscriptions', authController.verifyToken, tenantMiddleware.verifyTenant, userSubscriptionController.getUserSubscriptions);
router.put('/user-subscriptions/:id', authController.verifyToken, tenantMiddleware.verifyTenant, userSubscriptionController.updateUserSubscription);
router.delete('/user-subscriptions/:id', authController.verifyToken, tenantMiddleware.verifyTenant, userSubscriptionController.deleteUserSubscription);

// AI Prompt Usage
router.post('/ai-prompt-usage', authController.verifyToken, tenantMiddleware.verifyTenant, aiPromptUsageController.createAIPromptUsage);
router.get('/ai-prompt-usage', authController.verifyToken, tenantMiddleware.verifyTenant, aiPromptUsageController.getAIPromptUsages);

// Payments
router.post('/payments', authController.verifyToken, tenantMiddleware.verifyTenant, paymentController.createPayment);
router.get('/payments', authController.verifyToken, tenantMiddleware.verifyTenant, paymentController.getPayments);

// Authentication
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

// Protected route example
router.get('/protected', authController.verifyToken, (req, res) => {
  res.status(200).send('This is a protected route');
});

// API Test
router.get('/test', (req, res) => {
  res.status(200).send('API is working');
});

module.exports = router;
