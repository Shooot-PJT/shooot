import React from "react";
import "./App.css";
import shooot from "shooot";

function App() {
    const handler = async () => {
        await shooot.axios
            .get("https://pikachu.com/test", { params: { rp: 1, method: "get" } }, { pv1: 1, pv2: 2 })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    const posthandler = async () => {
        await shooot.axios
            .post("https://pikachu.com/test", { d1: 1, d2: 2, method: "post" }, {}, { pv1: 1, pv2: 2 })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    const puthandler = async () => {
        await shooot.axios
            .put("https://pikachu.com/test", { d1: 1, d2: 2, method: "put" }, {}, { pv1: 1, pv2: 2 })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    const patchhandler = async () => {
        await shooot.axios
            .patch("https://pikachu.com/test", { d1: 1, d2: 2, method: "patch" }, {}, { pv1: 1, pv2: 2 })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    const deletehandler = async () => {
        await shooot.axios
            .delete("https://pikachu.com/test", { params: { rp: 1, method: "delete" } }, { pv1: 1, pv2: 2 })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    const setconfig = async () => {
        await shooot.setConfigs("pikachu", 50000);
    };
    return (
        <div style={{ padding: "5rem" }}>
            <button onClick={async () => await handler()}>get</button>
            <button onClick={async () => await posthandler()}>post</button>
            <button onClick={async () => await puthandler()}>put</button>
            <button onClick={async () => await patchhandler()}>patch</button>
            <button onClick={async () => await deletehandler()}>delete</button>
            <button onClick={async () => await setconfig()}>config</button>
            <div style={{ marginTop: "3rem" }}>{}</div>
        </div>
    );
}

export default App;
