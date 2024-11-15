const db = require("../config/database");

const getApiId = (method, endpoint) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT api_id FROM api WHERE method = "${method}" and url = "${endpoint}"`;

        db.execute(query, (err, results) => {
            if (err) {
                console.error("[post, /mock/data, getApiId]:", err);
                return reject("Database query error");
            }

            resolve(results[0]?.api_id || null);
        });
    });
};

const getApiTestCaseIds = (apiId) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT api_test_case_id FROM api_test_case WHERE api_id = "${apiId}"`;

        db.execute(query, (err, results) => {
            if (err) {
                console.error("[post, /mock/data, getApiTestCaseIds]:", err);
                return reject("Database query error");
            }

            resolve(results.map((result) => result.api_test_case_id));
        });
    });
};

const getRequestContent = (testCaseId) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM api_test_case_request WHERE api_test_case_id = "${testCaseId}" ORDER BY api_test_request_id DESC LIMIT 1`;

        db.execute(query, (err, results) => {
            if (err) {
                console.error("[post, /mock/data, getRequestContent]:", err);
                return reject("Database query error");
            }

            const target = {
                content: {
                    params: results[0].content.params,
                    pathvariable: results[0].content.pathvariable,
                    headers: results[0].content.headers,
                    body: results[0].content.body,
                },
            };
            console.log("[Response] target:", target);

            resolve(target);
        });
    });
};

exports.mockData = async (req, res) => {
    try {
        const { endpoint, method, headers, requestParameters, pathVariables, body } = req.body;
        const src = {
            content: {
                params: requestParameters,
                pathvariable: pathVariables,
                headers: headers,
                body: body,
            },
        };
        console.log("[Request] endpoint:", endpoint);
        console.log("[Request] method:", method);
        console.log("[Request] headers:", headers);
        console.log("[Request] requestParameters:", requestParameters);
        console.log("[Request] pathVariables:", pathVariables);
        console.log("[Request] body:", body);
        console.log("[Request] src:", src);

        const apiId = await getApiId(method, endpoint);
        if (!apiId) return res.status(404).json({ message: "등록된 api 가 없습니다" });

        const testCaseIds = await getApiTestCaseIds(apiId);
        if (testCaseIds.length === 0) return res.status(404).json({ message: "등록된 api test case 가 없습니다" });

        const results = await Promise.all(testCaseIds.map((id) => getRequestContent(id)));
        const response = { results: results.map((content) => ({ content })) };
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ error: "Database query error" });
    }
};
