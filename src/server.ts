import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import seedSuperAdmin from "./app/DB";

const main = async () => {
  try {
    await mongoose.connect(config.databaseUrl as string);

    seedSuperAdmin();

    app.listen(config.port, () => {
      console.log(`🚀 App is running on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

main();
