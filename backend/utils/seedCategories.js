const Category = require("../models/Category");

const defaultCategories = [
  { name: "Internet", icon: "Folders", description: "Internet and network related issues" },
  { name: "Email", icon: "Bell", description: "Email and communication issues" },
  { name: "Software", icon: "Settings", description: "Software installation and application issues" },
  { name: "Hardware", icon: "Monitor", description: "Computer, printer and device issues" },
  { name: "Security", icon: "Shield", description: "Account and security related issues" },
  { name: "Other", icon: "PencilLine", description: "Anything that does not fit above" },
];

// Creates default categories only when the collection is empty
const seedCategories = async () => {
  try {
    const count = await Category.countDocuments();

    if (count > 0) return;

    await Category.insertMany(defaultCategories);
    console.log("Default categories created");
  } catch (error) {
    console.log("Category seeding failed", error.message);
    throw error;
  }
};

module.exports = seedCategories;