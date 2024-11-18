import "./App.css";
import shooot from "shooot";

function App() {
    const handler = async () => {
        await shooot.axios
            .get("https://project1.com/test", { params: { rp: 1, method: "get" } }, { pv1: 1, pv2: 2 })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    const posthandler = async () => {
        await shooot.axios
            .post("https://project1.com/test", { d1: 1, d2: 2, method: "post" }, {}, { pv1: 1, pv2: 2 })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    const puthandler = async () => {
        await shooot.axios
            .put("https://project1.com/test", { d1: 1, d2: 2, method: "put" }, {}, { pv1: 1, pv2: 2 })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    const patchhandler = async () => {
        await shooot.axios
            .patch("https://project1.com/test", { d1: 1, d2: 2, method: "patch" }, {}, { pv1: 1, pv2: 2 })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    const deletehandler = async () => {
        await shooot.axios
            .delete("https://project1.com/test", { params: { rp: 1, method: "delete" } }, { pv1: 1, pv2: 2 })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    const setconfig = async () => {
        await shooot.setConfigs("project1", 50000);
    };

    const goodGet = async () => {
        await shooot.axios
            .get("https://project1.com/api/eggs", {}, { eggId: 1 })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    const goodPost1 = async () => {
        await shooot.axios.post(
            "https://project1.com/",
            {
                data1: 1,
                data2: 2,
                data3: 3,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    };

    const goodPost2 = async () => {
        await shooot.axios.post(
            "https://project1.com/",
            {
                data1: 1,
                data2: 2,
                data3: 3,
            },
            {
                headers: {
                    "Content-Type": "text/plain",
                },
            }
        );
    };

    const goodPost3 = async () => {
        const data = {
            data1: 1,
            data2: 2,
            data3: 3,
        };

        const formData = new FormData();
        formData.append("hello", JSON.stringify(data));

        await shooot.axios.post("https://project1.com/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    };

    const goodPost4 = async () => {
        await shooot.axios.post(
            "https://project1.com/",
            {},
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
    };

    return (
        <>
            <div style={{ padding: "5rem" }}>
                <button onClick={async () => await handler()}>get</button>
                <button onClick={async () => await posthandler()}>post</button>
                <button onClick={async () => await puthandler()}>put</button>
                <button onClick={async () => await patchhandler()}>patch</button>
                <button onClick={async () => await deletehandler()}>delete</button>
                <button onClick={async () => await setconfig()}>config</button>
                <div style={{ marginTop: "3rem" }}>{}</div>
            </div>
            <div style={{ padding: "5rem" }}>
                <button onClick={async () => await goodGet()}>good get</button>
                <button onClick={async () => await goodPost1()}>good post1</button>
                <button onClick={async () => await goodPost2()}>good post2</button>
                <button onClick={async () => await goodPost3()}>good post3</button>
                <button onClick={async () => await goodPost4()}>good post4</button>
            </div>
        </>
    );
}

export default App;
