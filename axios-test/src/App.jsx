import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import axios, { Axios } from "axios";

function App() {
    useEffect(() => {
        const customAxios = {};
        const methods = ["get", "post", "put", "patch", "delete"];

        /**
         * Custom GET request
         * @param {string} url - The URL to request
         * @param {object | undefined} pathVariables - The Path Variables and should be ordered
         * @param {import('axios').AxiosRequestConfig<any>} [config] - Optional Axios request configuration
         */
        customAxios.get = async function (url, pathVariables, config) {
            let to = url;
            Object.keys(pathVariables).forEach((k) => (to += `/${pathVariables[k]}`));
            console.log(to);
            axios(to, config);
        };

        Object.keys(axios).forEach((v) => {
            if (!methods.includes(v)) {
                customAxios[v] = axios[v];
            }
        });

        /*methods.forEach((method) => {
            customAxios[method] = async function (...args) {
                const paths = args.pop(); // 마지막 매개변수로 paths를 받음
                console.log(paths);
                console.log(args);

                // 원래 axios 메서드를 호출
                return await axios[method](...args);
            };
        });*/

        axios.delete();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
