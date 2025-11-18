import FoodItem from '../models/FoodItem.js';

export async function createFood(req, res, next){
  try {
    const userId = req.user.id;
    const { name, category, quantity, unit, expiryDate, donate, notes } = req.body;
    if (!name || !category) return res.status(400).json({ error: 'Name and category required' });
    const item = await FoodItem.create({ user: userId, name, category, quantity, unit, expiryDate, donate, notes });
    res.status(201).json(item);
  } catch (err) { next(err); }
}

export async function listFood(req, res, next){
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
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(items);
  } catch (err) { next(err); }
}

export async function getFood(req, res, next){
  try {
    const item = await FoodItem.findOne({ _id: req.params.id, user: req.user.id });
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) { next(err); }
}

export async function updateFood(req, res, next){
  try {
    const item = await FoodItem.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) { next(err); }
}

export async function deleteFood(req, res, next){
  try {
    const item = await FoodItem.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
}
