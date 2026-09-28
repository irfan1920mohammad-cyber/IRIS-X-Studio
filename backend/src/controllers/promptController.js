const mockPrompts = require('../data/mockPrompts');

// Helper to mask premium content for public consumption
const sanitizeForPublic = (prompt) => {
  if (!prompt) return null;
  const copy = { ...prompt };
  if (copy.isPremium) {
    copy.promptContent = '[PREMIUM CONTENT - UNLOCK TO ACCESS]';
    copy.isLocked = true;
  } else {
    copy.isLocked = false;
  }
  return copy;
};

// GET /api/prompts
const listPrompts = (req, res) => {
  let results = mockPrompts.filter(p => p.isPublished);
  const { category, search, tag, isPremium, sort } = req.query;

  if (category) {
    results = results.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (tag) {
    results = results.filter(p => p.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
  }

  if (typeof isPremium !== 'undefined') {
    const premiumBool = isPremium === 'true';
    results = results.filter(p => p.isPremium === premiumBool);
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  if (sort === 'popular') {
    results.sort((a, b) => b.downloadsCount - a.downloadsCount);
  } else if (sort === 'views') {
    results.sort((a, b) => b.viewsCount - a.viewsCount);
  } else {
    results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  const sanitized = results.map(sanitizeForPublic);

  res.status(200).json({
    success: true,
    total: sanitized.length,
    data: sanitized
  });
};

// GET /api/prompts/featured
const getFeaturedPrompts = (req, res) => {
  const featured = mockPrompts
    .filter(p => p.isPublished && p.isFeatured)
    .map(sanitizeForPublic);

  res.status(200).json({
    success: true,
    total: featured.length,
    data: featured
  });
};

// GET /api/prompts/categories
const getCategories = (req, res) => {
  const categoriesMap = {};
  mockPrompts.filter(p => p.isPublished).forEach(p => {
    categoriesMap[p.category] = (categoriesMap[p.category] || 0) + 1;
  });

  const categories = Object.keys(categoriesMap).map(name => ({
    name: name,
    count: categoriesMap[name]
  }));

  res.status(200).json({
    success: true,
    data: categories
  });
};

// GET /api/prompts/:id
const getPromptById = (req, res) => {
  const { id } = req.params;
  const prompt = mockPrompts.find(p => p.id === id || p.slug === id);

  if (!prompt || !prompt.isPublished) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      error: 'Prompt with ID ' + id + ' not found'
    });
  }

  prompt.viewsCount += 1;

  res.status(200).json({
    success: true,
    data: sanitizeForPublic(prompt)
  });
};

// GET /api/prompts/:id/preview
const getPromptPreview = (req, res) => {
  const { id } = req.params;
  const prompt = mockPrompts.find(p => p.id === id || p.slug === id);

  if (!prompt) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      error: 'Prompt with ID ' + id + ' not found'
    });
  }

  res.status(200).json({
    success: true,
    data: {
      id: prompt.id,
      title: prompt.title,
      category: prompt.category,
      previewImageUrl: prompt.previewImageUrl,
      sampleOutput: 'High-fidelity preview rendered with ' + prompt.category + ' engine.'
    }
  });
};

module.exports = {
  listPrompts,
  getFeaturedPrompts,
  getCategories,
  getPromptById,
  getPromptPreview
};
