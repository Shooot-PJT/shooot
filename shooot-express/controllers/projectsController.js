const db = require("../config/database");

const urlToRegex = (url) => {
    const regexPattern = url.replace(/{(\w+)}/g, (_, key) => `(?<${key}>[^/]+)`);
    return `^${regexPattern}$`;
};

const getApis = (projectName) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT api_id, method, url FROM api WHERE api_domain_id in (SELECT api_domain_id FROM domain WHERE project_id = (SELECT project_id FROM project WHERE english_name = "${projectName}"))`;

        db.execute(query, (err, results) => {
            if (err) {
                console.error("[get, /projects/domains/apis, getApis]:", err);
                return reject("Database query error");
            }
            resolve(
                results.map((result) => ({ apiId: result.api_id, method: result.method, url: urlToRegex(result.url) }))
            );
        });
    });
};

const getContent = (api_test_case_id) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM api_test_case_request WHERE api_test_case_id = "${api_test_case_id}" ORDER BY api_test_request_id DESC LIMIT 1`;

        db.execute(query, (err, results) => {
            if (err) {
                console.error("[get, /projects/domains/apis/testcases/content, getContent]:", err);
                return reject("Database query error");
            }
            resolve(results[0].content.expectedResponse.example);
        });
    });
};

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

exports.searchApisUrls = async (req, res) => {
    const { projectName } = req.query;

    const apis = await getApis(projectName);
    if (!apis.length) {
        return res.status(404).json({ message: "등록된 api 가 없습니다" });
    } else {
        return res.status(200).json({ apis: apis });
    }
};

exports.searchTestCase = async (req, res) => {
    const { apiId, testcase } = req.query;
    const query = `SELECT * FROM api_test_case WHERE api_id = "${apiId}"`;

    db.execute(query, async (err, results) => {
        if (err) {
            console.error("[get, /projects/domains/apis/testcases]:", err);
            return res.status(500).json({ error: "Database query error" });
        }

        if (!results.length) {
            return res.status(404).json({ message: "등록된 test case 가 없습니다" });
        } else {
            results.sort((r1, r2) => r1.http_status_code - r2.http_status_code);
            if (testcase > 0) {
                if (testcase > results.length) {
                    return res.status(400).json({ message: "등록된 test case 내에서만 mocking 이 가능합니다" });
                } else {
                    const content = await getContent(results[testcase - 1].api_test_case_id);
                    return res.status(results[testcase - 1].http_status_code).json(content);
                }
            } else {
                if (results[0].http_status_code === 200) {
                    const content = await getContent(results[0].api_test_case_id);
                    return res.status(results[0].http_status_code).json(content);
                } else {
                    return res.status(400).json({ message: "200 에 대한 test case 를 등록해주세요" });
                }
            }
        }
    });
};
