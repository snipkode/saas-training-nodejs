// routes.js
const express = require('express');
const router = express.Router();

const userController = require('./controllers/cUsers');
const subscriptionPlanController = require('./controllers/cSubscriptionPlan');
const userSubscriptionController = require('./controllers/cUserSubscriptionPlan');
const aiPromptUsageController = require('./controllers/cPromptUsage');
const paymentController = require('./controllers/cPayment');

// Users
router.post('/users', userController.createUser);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

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

// API Test
router.get('/test', (req, res) => {
  res.status(200).send('API is working');
});

module.exports = router;
