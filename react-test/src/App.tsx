import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import sw from "shooot";
import axios from "axios";

function App() {
    const settings = async () => {
        await sw.setConfigs("project1", 300);
        window.location.reload();
    };

    const hello = async () => {
        const data = await sw.axios.get("/express/project/search", undefined, {
            params: {
                projectName: "project1",
            },
        });
        console.log(data.data);
    };

    const test = async () => {
        await navigator.serviceWorker.ready.then((registration) => {
            if (navigator.serviceWorker.controller) {
                console.log("ok");
            } else {
                console.log("fail");
            }
        });
    };
    return (
        <div>
            <button onClick={async () => await settings()}>config</button>
            <button onClick={async () => await hello()}>test</button>
            <button onClick={async () => await test()}>bye</button>
        </div>
    );
}

export default App;
