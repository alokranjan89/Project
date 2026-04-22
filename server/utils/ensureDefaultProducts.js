import Product from "../models/product.js";
import User from "../models/User.js";
import defaultProducts from "../data/defaultProducts.js";

const ensureDefaultProducts = async () => {
  const existingProductsCount = await Product.countDocuments();

  if (existingProductsCount > 0) {
    return;
  }

  const adminUser = await User.findOne({ role: "admin" });

  const productsToCreate = defaultProducts.map((product) => ({
    ...product,
    user: adminUser?._id,
  }));

  await Product.insertMany(productsToCreate);
  console.log(`Seeded ${productsToCreate.length} default products`);
};

export default ensureDefaultProducts;
