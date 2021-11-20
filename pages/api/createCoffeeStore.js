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
            filterByFormula: `id="3"`, // ${id}
        })
        .firstPage();

    console.log({ findCoffeeStoreRecords });

    if (findCoffeeStoreRecords.length !== 0) {
        res.json(getMinifiedRecords(findCoffeeStoreRecords));
    } else {
        const createRecords = await table.create([
            {
                fields: {
                    id: "3",
                    name: "4 second",
                    address: "addMY venue   ",
                    neighborhood: "some  4",
                    voting: 3,
                    imgUrl: "4 url",
                },
            },
        ]);
        const records = getMinifiedRecords(createRecords);
        res.json({ records });
    }
}
