import { useEffect } from "react";
import "./App.css";
import shooot from "shooot";

function App() {
    const get = async () => {
        await shooot.axios
            .get("/api/get/test/1", {
                params: {
                    testcase: 1,
                },
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    const post = async () => {
        await shooot.axios
            .post(
                "/api/post/test/1",
                {},
                {
                    params: {
                        testcase: 1,
                    },
                }
            )
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        shooot.setConfigs("apitest");
    }, []);

    return (
        <div style={{ padding: "5rem" }}>
            <button onClick={async () => await get()}>get</button>
            <button onClick={async () => await post()}>post</button>
        </div>
    );
}

export default App;
