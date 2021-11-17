var Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.AIRTABLE_APIKEY }).base(process.env.AIRTABLE_BASEID);

const table = base("coffee-stores");

console.log({ table });

export default function createCoffeeStore(req, res) {
    if (req.method === "POST") {
        res.json({ m: "hi there" });
    } else {
        res.json({ m: "get" });
    }
}
