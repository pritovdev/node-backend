const bcrypt = require('bcrypt');

async function hashPasword() {
  const myPassword = 'ajsd-sde$sad2232';
  const hash = await bcrypt.hash(myPassword, 10);
  console.log(hash)
}

hashPasword();

async function verifyPassword() {
  const myPassword = 'ajsd-sde$sad2232';
  const hashedPassword = '$2b$10$8GKDGvFMtaH16RhJl4hb9Ocgg8B4cOxBN/2JkmJ.eEkTxRUfy8oOC'

  const isMatch = await bcrypt.compare(myPassword, hashedPassword);

  console.log(isMatch);
}

verifyPassword();