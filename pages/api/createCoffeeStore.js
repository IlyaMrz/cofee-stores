import { table, getMinifiedRecords, findRecordByFilter } from "../../lib/airtable";

export default async function createCoffeeStore(req, res) {
    const { id, name, neighborhood, address, imgUrl, voting } = req.body;
    if (id) {
        const records = await findRecordByFilter(id);

        if (records.length !== 0) {
            res.json(records);
        } else {
            if (name) {
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
                res.json(records);
            } else {
                res.status(400);
                res.json({ message: "name is missing" });
            }
        }
    } else {
        res.status(400);
        res.json({ message: "id missing" });
    }
}
