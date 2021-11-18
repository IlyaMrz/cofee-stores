var Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.AIRTABLE_APIKEY }).base(process.env.AIRTABLE_BASEID);

const table = base("coffee-stores");

console.log({ table });

export default async function createCoffeeStore(req, res) {
    const findCoffeeStoreRecords = await table
        .select({
            filterByFormula: `id="0"`, // ${id}
        })
        .firstPage();

    console.log({ findCoffeeStoreRecords });

    if (findCoffeeStoreRecords.length !== 0) {
        res.json(findCoffeeStoreRecords);
    } else {
        res.json({ m: "create a record" });
    }
}
