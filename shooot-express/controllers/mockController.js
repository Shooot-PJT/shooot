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

const getApiTestCases = (apiId) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT api_test_case_id, http_status_code FROM api_test_case WHERE api_id = "${apiId}"`;

        db.execute(query, (err, results) => {
            if (err) {
                console.error("[post, /mock/data, getApiTestCases]:", err);
                return reject("Database query error");
            }

            resolve(
                results.map((result) => ({
                    api_test_case_id: result.api_test_case_id,
                    http_status_code: result.http_status_code,
                }))
            );
        });
    });
};

const checkKeys = (src, target, keyword) => {
    console.log("[CheckKeys] keyword:", keyword);
    console.log("[CheckKeys] src:", JSON.stringify(src, null, 2));
    console.log("[CheckKeys] target:", JSON.stringify(target, null, 2));
    if (!src) {
        if (!target) {
            return true;
        } else {
            return false;
        }
    } else {
        if (!target) {
            return false;
        } else {
            const srcKeys = Object.keys(src).sort();
            const targetKeys = Object.keys(target).sort();

            if (srcKeys.length !== targetKeys.length) {
                return false;
            } else {
                let result = true;
                srcKeys.forEach((k, i) => {
                    if (k !== targetKeys[i]) result = false;
                });
                return result;
            }
        }
    }
};

const checkHeaders = (src, target) => {
    console.log("[CheckHeaders] keyword: headers");
    console.log("[CheckHeaders] src:", JSON.stringify(src, null, 2));
    console.log("[CheckHeaders] target:", JSON.stringify(target, null, 2));
    if (!target) {
        return true;
    } else {
        const srcKeys = Object.keys(src);
        const targetKeys = Object.keys(target);

        let result = true;
        targetKeys.forEach((k) => {
            if (!(k in srcKeys)) {
                result = false;
            }
        });
        return result;
    }
};

const getRequestContent = (testCase, src) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM api_test_case_request WHERE api_test_case_id = "${testCase.api_test_case_id}" ORDER BY api_test_request_id DESC LIMIT 1`;

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

            const paramsResult = checkKeys(src.content.params, target.content.params, "params");
            console.log(`[ParamsResult] ${paramsResult}\n`);
            const variablesResult = checkKeys(src.content.pathvariable, target.content.pathvariable, "variables");
            console.log(`[VariablesResult] ${variablesResult}\n`);
            const headersResult = checkHeaders(src.content.headers, target.content.headers, "headers");
            console.log(`[HeadersResult] ${headersResult}\n`);
            const formDataResult = checkKeys(src.content.body.formData, target.content.body.formData, "formData");
            console.log(`[FormDataResult] ${formDataResult}\n`);
            const rawResult = checkKeys(src.content.body.raw, target.content.body.raw, "raw");
            console.log(`[RawResult] ${rawResult}\n`);

            if (paramsResult && variablesResult && headersResult && formDataResult && rawResult) {
                console.log("[Response] target:", results[0]);
                resolve({
                    httpStatusCode: testCase.http_status_code,
                    exampleResponse: results[0].content.expectedResponse.example,
                });
            }
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
        if (src.content.body.formData.datas === null && src.content.body.formData.files === null)
            src.content.body.formData = null;
        if (src.content.body.raw.datas === null && src.content.body.raw.files === null) src.content.body.raw = null;

        console.log("[Request] endpoint:", endpoint);
        console.log("[Request] method:", method);
        console.log("[Request] headers:", headers);
        console.log("[Request] requestParameters:", requestParameters);
        console.log("[Request] pathVariables:", pathVariables);
        console.log("[Request] body:", body);
        console.log("[Request] formData:", body.formData);
        console.log("[Request] raw:", body.raw);
        console.log("[Request] src:", src);

        const apiId = await getApiId(method, endpoint);
        if (!apiId) return res.status(404).json({ message: "등록된 api 가 없습니다" });

        const testCases = await getApiTestCases(apiId);
        if (testCases.length === 0) return res.status(404).json({ message: "등록된 api test case 가 없습니다" });

        const results = await Promise.all(testCases.map((val) => getRequestContent(val, src)));
        if (!results.length) {
            return res.status(404).json({ message: "요청에 맞는 api test case 가 없습니다" });
        } else {
            console.log("[Response] results:", results);
            return res.status(200).json(results[0]);
        }
    } catch (error) {
        return res.status(500).json({ error: "Database query error" });
    }
};
