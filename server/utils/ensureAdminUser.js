import User from "../models/User.js";

const ensureAdminUser = async () => {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@mystore.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const adminName = process.env.ADMIN_NAME || "Store Admin";

  const existingAdmin = await User.findOne({ email: adminEmail });

  if (!existingAdmin) {
    await User.create({
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      role: "admin",
    });
    console.log(`Default admin created for ${adminEmail}`);
    return;
  }

  if (existingAdmin.role !== "admin") {
    existingAdmin.role = "admin";
    await existingAdmin.save();
    console.log(`Existing user promoted to admin for ${adminEmail}`);
  }
};

export default ensureAdminUser;
