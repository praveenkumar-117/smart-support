const Category = require("../models/Category");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: 1 });

    return res.status(200).json({
      status: true,
      message: "Categories fetched successfully",
      categories,
    });
  } catch (error) {
    console.error("Category fetching failed:", error.message);

    return res.status(500).json({
      status: false,
      message: "Unable to fetch categories",
    });
  }
};

const createCategory = async (req, res) => {
  const { name, icon, description } = req.body;

  if (!name?.trim() || !icon?.trim() || !description?.trim()) {
    return res.status(400).json({
      status: false,
      message: "Category name, icon and description are required",
    });
  }

  try {
    const cleanName = name.trim();

    // strength 2 = case-insensitive ("Internet" and "internet" are the same)
    const existingCategory = await Category.findOne({ name: cleanName }).collation(
      { locale: "en", strength: 2 },
    );

    if (existingCategory) {
      return res.status(400).json({
        status: false,
        message: "Category already exists",
      });
    }

    const category = await Category.create({
      name: cleanName,
      icon: icon.trim(),
      description: description.trim(),
    });

    return res.status(201).json({
      status: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.error("Category creation failed:", error.message);

    return res.status(500).json({
      status: false,
      message: "Unable to create category",
    });
  }
};

module.exports = {
  getCategories,
  createCategory,
};