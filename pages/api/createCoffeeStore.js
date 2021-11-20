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
    const { id, name, neighborhood, address, imgUrl, voting } = req.body;
    if (id && name) {
        const findCoffeeStoreRecords = await table
            .select({
                filterByFormula: `id=${id}`,
            })
            .firstPage();

        if (findCoffeeStoreRecords.length !== 0) {
            res.json(getMinifiedRecords(findCoffeeStoreRecords));
        } else {
            const createRecords = await table.create([
                {
                    fields: {
                        id,
                        name,
                        address,
                        neighborhood,
                        voting,
                        imgUrl,
                    },
                },
            ]);
            const records = getMinifiedRecords(createRecords);
            res.json({ records });
        }
    } else {
        res.json({ message: "id or name missing" });
    }
}
