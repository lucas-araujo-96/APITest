const keygen = require(`keypair`);
const fs = require(`fs`);

const keys = keygen();
fs.writeFileSync(`private.key`, keys.private);
fs.writeFileSync(`public.key`, keys.public);