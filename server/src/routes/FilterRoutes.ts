import express from 'express';
import {
  fetchRequestDocuments,
  fetchListingDocuments,
} from '../controllers/FilterController.js';
// import {fetchListingDocuments} from '../controllers/FilterController.js';
const router = express.Router();
router.post('/request', fetchRequestDocuments);
router.post('/listing', fetchListingDocuments);
//Natural language processing search
router.post('/search', fetchListingDocuments);
export default router;
