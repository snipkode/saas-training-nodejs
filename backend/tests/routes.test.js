const request = require('supertest');
const express = require('express');
const routes = require('../src/routes');

// Mock the controllers
jest.mock('../src/controllers/users');
jest.mock('../src/controllers/subscriptionPlan');
jest.mock('../src/controllers/userSubscriptionPlan');
jest.mock('../src/controllers/aiPromptUsage');
jest.mock('../src/controllers/payment');

const app = express();
app.use(express.json());
app.use('/', routes);

describe('API Endpoints', () => {
  it('should test the API is working', async () => {
    const res = await request(app).get('/test');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('API is working');
  });

  // Users
  it('should create a user', async () => {
    const res = await request(app).post('/users').send({ name: 'John Doe' });
    expect(res.statusCode).toEqual(201);
  });

  it('should get all users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(200);
  });

  it('should get a user by id', async () => {
    const res = await request(app).get('/users/1');
    expect(res.statusCode).toEqual(200);
  });

  it('should update a user', async () => {
    const res = await request(app).put('/users/1').send({ name: 'Jane Doe' });
    expect(res.statusCode).toEqual(200);
  });

  it('should delete a user', async () => {
    const res = await request(app).delete('/users/1');
    expect(res.statusCode).toEqual(200);
  });

  // Subscription Plans
  it('should create a subscription plan', async () => {
    const res = await request(app).post('/subscription-plans').send({ name: 'Basic Plan' });
    expect(res.statusCode).toEqual(201);
  });

  it('should get all subscription plans', async () => {
    const res = await request(app).get('/subscription-plans');
    expect(res.statusCode).toEqual(200);
  });

  it('should update a subscription plan', async () => {
    const res = await request(app).put('/subscription-plans/1').send({ name: 'Premium Plan' });
    expect(res.statusCode).toEqual(200);
  });

  it('should delete a subscription plan', async () => {
    const res = await request(app).delete('/subscription-plans/1');
    expect(res.statusCode).toEqual(200);
  });

  // User Subscriptions
  it('should create a user subscription', async () => {
    const res = await request(app).post('/user-subscriptions').send({ userId: 1, planId: 1 });
    expect(res.statusCode).toEqual(201);
  });

  it('should get all user subscriptions', async () => {
    const res = await request(app).get('/user-subscriptions');
    expect(res.statusCode).toEqual(200);
  });

  it('should update a user subscription', async () => {
    const res = await request(app).put('/user-subscriptions/1').send({ planId: 2 });
    expect(res.statusCode).toEqual(200);
  });

  it('should delete a user subscription', async () => {
    const res = await request(app).delete('/user-subscriptions/1');
    expect(res.statusCode).toEqual(200);
  });

  // AI Prompt Usage
  it('should create an AI prompt usage', async () => {
    const res = await request(app).post('/ai-prompt-usage').send({ prompt: 'Hello AI' });
    expect(res.statusCode).toEqual(201);
  });

  it('should get all AI prompt usages', async () => {
    const res = await request(app).get('/ai-prompt-usage');
    expect(res.statusCode).toEqual(200);
  });

  // Payments
  it('should create a payment', async () => {
    const res = await request(app).post('/payments').send({ amount: 100 });
    expect(res.statusCode).toEqual(201);
  });

  it('should get all payments', async () => {
    const res = await request(app).get('/payments');
    expect(res.statusCode).toEqual(200);
  });
});
