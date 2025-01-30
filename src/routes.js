// routes.js
const express = require('express');
const router = express.Router();

const userController = require('./controllers/users');
const subscriptionPlanController = require('./controllers/subscriptionPlan');
const userSubscriptionController = require('./controllers/userSubscriptionPlan');
const aiPromptUsageController = require('./controllers/aiPromptUsage');
const paymentController = require('./controllers/payment');
const authController = require('./controllers/auth');
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
router.post('/user-subscriptions', userSubscriptionController.createUserSubscription);
router.get('/user-subscriptions', userSubscriptionController.getUserSubscriptions);
router.put('/user-subscriptions/:id', userSubscriptionController.updateUserSubscription);
router.delete('/user-subscriptions/:id', userSubscriptionController.deleteUserSubscription);

// AI Prompt Usage
router.post('/ai-prompt-usage', aiPromptUsageController.createAIPromptUsage);
router.get('/ai-prompt-usage', aiPromptUsageController.getAIPromptUsages);

// Payments
router.post('/payments', paymentController.createPayment);
router.get('/payments', paymentController.getPayments);

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
