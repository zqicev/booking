exports.reserve = async (req, res) => {
    let dbQuery = req.dbQuery;

    const { event_id, user_id } = req.body;

    const eventExists = await dbQuery('SELECT * FROM events WHERE id = $1', [event_id]);
    if (eventExists.rowCount === 0) {
        return res.status(400).send('Event does not exist');
    }

    const isReserved = await dbQuery('SELECT * FROM bookings WHERE event_id = $1 AND user_id = $2', [event_id, user_id]);
    if (isReserved.rowCount > 0) {
        return res.status(400).send('User already reserved this event');
    }

    await dbQuery('INSERT INTO bookings (event_id, user_id) VALUES ($1, $2)', [event_id, user_id]);
    return res.status(200).send('Event reserved successfully');
}