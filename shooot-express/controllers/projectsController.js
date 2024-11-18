const db = require("../config/database");

exports.searchProject = (req, res) => {
    const { projectName } = req.query;
    const query = `SELECT * FROM project WHERE english_name = "${projectName}"`;

    db.execute(query, (err, results) => {
        if (err) {
            console.error("[get, /projects/search]:", err);
            return res.status(500).json({ error: "Database query error" });
        }

        if (results.length) {
            return res.status(200).json({ canUse: "AVAILABLE" });
        } else {
            return res.status(401).json({ canUse: "UNAVAILABLE" });
        }
    });
};
