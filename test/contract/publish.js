const { Publisher } = require("@pact-foundation/pact");
const dotenv = require("dotenv");
dotenv.config();

const opts = {
    pactBroker: process.env.PACT_BROKER_BASE_URL,
    pactBrokerToken: process.env.PACT_BROKER_TOKEN,
    pactFilesOrDirs: ['./test/contract/pacts/animalshelterfront-animalshelterback.json']
};

new Publisher(opts).publishPacts();