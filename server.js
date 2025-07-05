const express = require('express');
const { ReclaimProofRequest, verifyProof } = require('@reclaimprotocol/js-sdk');
const cors = require('cors');

const app = express();

// Allow all origins for Vercel preview, or restrict as needed
app.use(cors({
  origin: '*',
  credentials: true,
}));

app.use(express.json());
app.use(express.text({ type: '*/*', limit: '50mb' }));

// Use Vercel's dynamic base URL or fallback
const BASE_URL = process.env.BASE_URL || 'https://bcknd-git-main-sambhrams-projects-06a377b2.vercel.app/';

// Provider IDs
const KAGGLE_PROVIDER_ID = 'c94476a0-8a75-4563-b70a-bf6124d7c59b';
const LEETCODE_PROVIDER_ID = 'a9cc0a8b-8ec9-4421-bd31-73f736ade0f3';
const STACKOVERFLOW_PROVIDER_ID = '9640cb3e-6a1a-43cc-8447-812b676d917f';

// LinkedIn
app.get('/api/generate-config', async (req, res) => {
  const APP_ID = process.env.RECLAIM_APP_ID;
  const APP_SECRET = process.env.RECLAIM_APP_SECRET;
  const PROVIDER_ID = process.env.LINKEDIN_PROVIDER_ID;
  try {
    const reclaimProofRequest = await ReclaimProofRequest.init(APP_ID, APP_SECRET, PROVIDER_ID);
    reclaimProofRequest.setAppCallbackUrl(BASE_URL + '/api/receive-proofs');
    const reclaimProofRequestConfig = reclaimProofRequest.toJsonString();
    return res.json({ reclaimProofRequestConfig });
  } catch (error) {
    console.error('Error generating request config:', error);
    return res.status(500).json({ error: 'Failed to generate request config' });
  }
});

// Twitter
app.get('/api/generate-config/twitter', async (req, res) => {
  const APP_ID = process.env.RECLAIM_APP_ID;
  const APP_SECRET = process.env.RECLAIM_APP_SECRET;
  const PROVIDER_ID = process.env.TWITTER_PROVIDER_ID;
  try {
    const reclaimProofRequest = await ReclaimProofRequest.init(APP_ID, APP_SECRET, PROVIDER_ID);
    reclaimProofRequest.setAppCallbackUrl(BASE_URL + '/api/receive-proofs');
    const reclaimProofRequestConfig = reclaimProofRequest.toJsonString();
    return res.json({ reclaimProofRequestConfig });
  } catch (error) {
    console.error('Error generating request config (twitter):', error);
    return res.status(500).json({ error: 'Failed to generate request config for twitter' });
  }
});

// Kaggle
app.get('/api/generate-config/kaggle', async (req, res) => {
  const APP_ID = process.env.RECLAIM_APP_ID;
  const APP_SECRET = process.env.RECLAIM_APP_SECRET;
  const PROVIDER_ID = KAGGLE_PROVIDER_ID;
  try {
    const reclaimProofRequest = await ReclaimProofRequest.init(APP_ID, APP_SECRET, PROVIDER_ID);
    reclaimProofRequest.setAppCallbackUrl(BASE_URL + '/api/receive-proofs');
    const reclaimProofRequestConfig = reclaimProofRequest.toJsonString();
    return res.json({ reclaimProofRequestConfig });
  } catch (error) {
    console.error('Error generating request config (kaggle):', error);
    return res.status(500).json({ error: 'Failed to generate request config for kaggle' });
  }
});

// LeetCode
app.get('/api/generate-config/leetcode', async (req, res) => {
  const APP_ID = process.env.RECLAIM_APP_ID;
  const APP_SECRET = process.env.RECLAIM_APP_SECRET;
  const PROVIDER_ID = LEETCODE_PROVIDER_ID;
  try {
    const reclaimProofRequest = await ReclaimProofRequest.init(APP_ID, APP_SECRET, PROVIDER_ID);
    reclaimProofRequest.setAppCallbackUrl(BASE_URL + '/api/receive-proofs');
    const reclaimProofRequestConfig = reclaimProofRequest.toJsonString();
    return res.json({ reclaimProofRequestConfig });
  } catch (error) {
    console.error('Error generating request config (leetcode):', error);
    return res.status(500).json({ error: 'Failed to generate request config for leetcode' });
  }
});

// StackOverflow
app.get('/api/generate-config/stackoverflow', async (req, res) => {
  const APP_ID = process.env.RECLAIM_APP_ID;
  const APP_SECRET = process.env.RECLAIM_APP_SECRET;
  const PROVIDER_ID = STACKOVERFLOW_PROVIDER_ID;
  try {
    const reclaimProofRequest = await ReclaimProofRequest.init(APP_ID, APP_SECRET, PROVIDER_ID);
    reclaimProofRequest.setAppCallbackUrl(BASE_URL + '/api/receive-proofs');
    const reclaimProofRequestConfig = reclaimProofRequest.toJsonString();
    return res.json({ reclaimProofRequestConfig });
  } catch (error) {
    console.error('Error generating request config (stackoverflow):', error);
    return res.status(500).json({ error: 'Failed to generate request config for stackoverflow' });
  }
});

// Receive proofs
app.post('/api/receive-proofs', async (req, res) => {
  try {
    const decodedBody = decodeURIComponent(req.body);
    const proof = JSON.parse(decodedBody);
    const result = await verifyProof(proof);
    if (!result) {
      return res.status(400).json({ error: 'Invalid proofs data' });
    }
    console.log('Received proofs:', proof);
    return res.sendStatus(200);
  } catch (e) {
    console.error('Error in receive-proofs:', e);
    return res.status(400).json({ error: 'Invalid proof format' });
  }
});

// Export the handler for Vercel
module.exports = app;