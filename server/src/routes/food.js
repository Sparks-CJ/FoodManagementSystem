import express from 'express';
import {
  createFood,
  listFood,
  getFood,
  updateFood,
  deleteFood,
  expiringSoon,
  toggleSuggestDonation
} from '../controllers/foodController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Protect all food routes
router.use(auth);

router.post('/', createFood);
router.get('/', listFood);
router.get('/expiring', expiringSoon);               // GET /api/food/expiring?days=7
router.post('/:id/donate', toggleSuggestDonation);   // POST /api/food/:id/donate { donate: true }
router.get('/:id', getFood);
router.put('/:id', updateFood);
router.delete('/:id', deleteFood);

export default router;
