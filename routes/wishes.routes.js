const router = require('express').Router();
const wishes = require('../data/wishes.json');
router.get('/', (_req, res) => res.json({wishes}));
let last = -1;
router.get('/random', (_req, res) => {
  if (!wishes.length) return res.status(404).json({error:'Chưa có lời chúc'});
  let index = Math.floor(Math.random() * wishes.length);
  if (wishes.length > 1 && index === last) index = (index + 1 + Math.floor(Math.random() * (wishes.length - 1))) % wishes.length;
  last = index;
  res.set('Cache-Control','no-store');
  res.json({wish:wishes[index]});
});
module.exports = router;
