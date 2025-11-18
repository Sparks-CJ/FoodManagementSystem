import FoodItem from '../models/FoodItem.js';

/**
 * Create a new food item
 */
export async function createFood(req, res, next) {
  try {
    const userId = req.user.id;
    const { name, category, quantity = 0, unit = 'pcs', expiryDate, donate = false, notes = '' } = req.body;
    if (!name || !category) return res.status(400).json({ error: 'Name and category required' });

    const item = await FoodItem.create({
      user: userId,
      name,
      category,
      quantity,
      unit,
      expiryDate: expiryDate || undefined,
      donate,
      notes
    });

    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

/**
 * List food items for the authenticated user
 * Supports: page, limit, category, q (search), expiring=true
 */
export async function listFood(req, res, next) {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 20, category, q, expiring } = req.query;
    const filter = { user: userId };

    if (category) filter.category = category;
    if (q) filter.name = new RegExp(q, 'i');
    if (expiring === 'true') {
      const now = new Date();
      const soon = new Date(); soon.setDate(now.getDate() + 7);
      filter.expiryDate = { $gte: now, $lte: soon };
    }

    const items = await FoodItem.find(filter)
      .sort({ expiryDate: 1, createdAt: -1 })
      .skip((page - 1) * Number(limit))
      .limit(Number(limit));

    res.json(items);
  } catch (err) {
    next(err);
  }
}

/**
 * Get a single food item (owned by user)
 */
export async function getFood(req, res, next) {
  try {
    const userId = req.user.id;
    const item = await FoodItem.findOne({ _id: req.params.id, user: userId });
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
}

/**
 * Update a food item
 */
export async function updateFood(req, res, next) {
  try {
    const userId = req.user.id;
    const item = await FoodItem.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
}

/**
 * Delete a food item
 */
export async function deleteFood(req, res, next) {
  try {
    const userId = req.user.id;
    const item = await FoodItem.findOneAndDelete({ _id: req.params.id, user: userId });
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
}

/**
 * Return items expiring within `days` (default 7) for the authenticated user
 * GET /api/food/expiring?days=7
 */
export async function expiringSoon(req, res, next) {
  try {
    const userId = req.user.id;
    const days = Number(req.query.days) || 7;
    const now = new Date();
    const soon = new Date();
    soon.setDate(now.getDate() + days);

    const items = await FoodItem.find({
      user: userId,
      expiryDate: { $exists: true, $ne: null, $gte: now, $lte: soon }
    }).sort({ expiryDate: 1 });

    res.json(items);
  } catch (err) {
    next(err);
  }
}

/**
 * Toggle suggestion for donation on an item
 * POST /api/food/:id/donate { donate: true/false }
 */
export async function toggleSuggestDonation(req, res, next) {
  try {
    const userId = req.user.id;
    const id = req.params.id;
    const { donate } = req.body;
    const item = await FoodItem.findOne({ _id: id, user: userId });
    if (!item) return res.status(404).json({ error: 'Not found' });

    item.donate = !!donate;
    await item.save();
    res.json(item);
  } catch (err) {
    next(err);
  }
}
