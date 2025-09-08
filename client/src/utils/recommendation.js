import { products } from '../data/products';

// Simple similarity by category + overlapping tags
const similarity = (a, b) => {
  const category = a.category && b.category && a.category === b.category ? 1 : 0;
  const tagsA = a.tags || [];
  const tagsB = b.tags || [];
  const overlap = tagsA.filter(t => tagsB.includes(t)).length;
  return category * 0.6 + overlap * 0.4;
};

export const getSimilarProducts = (product, limit = 4) => {
  if (!product) return [];
  return products
    .filter(p => p.id !== product.id)
    .map(p => ({ ...p, _sim: similarity(product, p) }))
    .sort((a, b) => b._sim - a._sim)
    .slice(0, limit)
    .map(({ _sim, ...rest }) => rest);
};

export const getComplementaryProducts = (product, limit = 4) => {
  if (!product) return [];
  const map = {
    tops: ['bottoms', 'accessories'],
    bottoms: ['tops', 'shoes'],
    dresses: ['accessories', 'shoes'],
    outerwear: ['tops', 'bottoms'],
    accessories: ['dresses', 'tops', 'bottoms'],
    shoes: ['bottoms', 'dresses'],
  };
  const targets = map[product.category?.toLowerCase()] || [];
  return products
    .filter(p => targets.includes(p.category?.toLowerCase()))
    .slice(0, limit);
};

// Lightweight preference tracker held in-memory
let userPreferences = { categories: {}, tags: {}, priceRanges: {} };
const weights = { view: 1, addToCart: 3, addToWishlist: 2, purchase: 5, timeSpent: 0.1 };

const priceBucket = (price) => {
  if (!price && price !== 0) return 'unknown';
  if (price < 50) return 'budget';
  if (price < 100) return 'mid';
  return 'premium';
};

export const updateUserPreferences = (product, action, durationSec = 0) => {
  if (!product) return;
  const w = weights[action] || 1;
  if (product.category) {
    userPreferences.categories[product.category] = (userPreferences.categories[product.category] || 0) + w;
  }
  if (product.tags) {
    product.tags.forEach((t) => {
      userPreferences.tags[t] = (userPreferences.tags[t] || 0) + w;
    });
  }
  const bucket = priceBucket(product.price);
  userPreferences.priceRanges[bucket] = (userPreferences.priceRanges[bucket] || 0) + w;
  if (durationSec > 0) {
    const tw = durationSec * weights.timeSpent;
    if (product.category) userPreferences.categories[product.category] += tw;
    if (product.tags) product.tags.forEach((t) => { userPreferences.tags[t] += tw; });
  }
};

export const resetUserPreferences = () => {
  userPreferences = { categories: {}, tags: {}, priceRanges: {} };
};

export const getPersonalizedRecommendations = (limit = 8) => {
  const scored = products.map((p) => {
    let score = 0;
    if (p.category) score += userPreferences.categories[p.category] || 0;
    if (p.tags) score += p.tags.reduce((s, t) => s + (userPreferences.tags[t] || 0), 0);
    score += (userPreferences.priceRanges[priceBucket(p.price)] || 0);
    return { ...p, _score: score + Math.random() * 0.5 };
  });
  return scored.sort((a, b) => b._score - a._score).slice(0, limit).map(({ _score, ...rest }) => rest);
};

export const getTrendingProducts = (limit = 8) => {
  return products
    .map((p) => ({ ...p, _t: Math.random() }))
    .sort((a, b) => b._t - a._t)
    .slice(0, limit)
    .map(({ _t, ...rest }) => rest);
};

export const getSizeRecommendation = (product, userProfile) => {
  if (!product || !userProfile) {
    return {
      recommendedSize: 'M',
      confidence: 0.7,
      fitNote: 'Provide measurements for better accuracy.',
      sizingTips: [
        'If between sizes, size up',
        'Check the size chart',
        'Consider preferred fit',
      ],
    };
  }
  return {
    recommendedSize: userProfile?.preferredSize || 'M',
    confidence: 0.85,
    fitNote: 'Runs true to size.',
    sizingTips: [
      'If between sizes, size up',
      'This fabric has slight stretch',
      "Model is 5'9\" wearing size M",
    ],
  };
};
