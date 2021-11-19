var Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.AIRTABLE_APIKEY }).base(process.env.AIRTABLE_BASEID);

const table = base("coffee-stores");

console.log({ table });

const getMinifiedRecord = (record) => {
    return {
        recordId: record.id,
        ...record.fields,
    };
};

const getMinifiedRecords = (records) => {
    return records.map((record) => getMinifiedRecord(record));
};

export default async function createCoffeeStore(req, res) {
    const findCoffeeStoreRecords = await table
        .select({
            filterByFormula: `id="0"`, // ${id}
        })
        .firstPage();

    console.log({ findCoffeeStoreRecords });

    if (findCoffeeStoreRecords.length !== 0) {
        res.json(getMinifiedRecords(findCoffeeStoreRecords));
    } else {
        res.json({ m: "create a record" });
    }
}
