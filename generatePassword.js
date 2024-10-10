const bcrypt = require("bcrypt");
async function hashPassword(plainTextPassword) {
  const hash = await bcrypt.hash(plainTextPassword, 10);
  console.log(`mot de passe pour ${plainTextPassword} :`, hash);
}
hashPassword("demo1");
hashPassword("demo2");
