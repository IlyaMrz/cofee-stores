var Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.AIRTABLE_APIKEY }).base(process.env.AIRTABLE_BASEID);

const table = base("coffee-stores");

const getMinifiedRecord = (record) => {
    return {
        recordId: record.id,
        ...record.fields,
    };
};

const getMinifiedRecords = (records) => {
    return records.map((record) => getMinifiedRecord(record));
};

const findRecordByFilter = async (id) => {
    const findCoffeeStoreRecords = await table
        .select({
            filterByFormula: `id="${id}"`,
        })
        .firstPage();

    return getMinifiedRecords(findCoffeeStoreRecords);
};

export { table, getMinifiedRecords, findRecordByFilter };
