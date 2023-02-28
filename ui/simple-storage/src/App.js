import "./App.css";
import Web3 from "web3";
import { useCallback, useState, useEffect } from "react";

function App() {
    const [result, setResult] = useState(null);
    const [value, setValue] = useState("");

    const contractABI = [
        {
            inputs: [],
            name: "data",
            outputs: [
                {
                    internalType: "string",
                    name: "",
                    type: "string",
                },
            ],
            stateMutability: "view",
            type: "function",
            constant: true,
        },
        {
            inputs: [
                {
                    internalType: "string",
                    name: "_data",
                    type: "string",
                },
            ],
            name: "set",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [],
            name: "get",
            outputs: [
                {
                    internalType: "string",
                    name: "",
                    type: "string",
                },
            ],
            stateMutability: "view",
            type: "function",
            constant: true,
        },
    ];

    const web3 = new Web3(
        `http://${process.env.REACT_APP_WEB3_HOST}:${process.env.REACT_APP_WEB3_PORT}`
    );

    async function getAccounts() {
        return await web3.eth.getAccounts();
    }

    const simpleStorage = new web3.eth.Contract(
        contractABI,
        process.env.REACT_APP_WEB3_CONTRACT_ADDRESS
    );

    const invokeGet = useCallback(async () => {
        simpleStorage.methods
            .get()
            .call()
            .then((r) => setResult(r));
    }, [simpleStorage.methods]);

    async function invokeSet() {
        const accounts = await getAccounts();
        await simpleStorage.methods.set(value).send({ from: accounts[0] });
        invokeGet();
    }

    useEffect(() => {
        invokeGet();
    }, [invokeGet]);

    return (
        <div className="App">
            <h1>Simple Storage</h1>
            <div>
                Calling SimpleStorage.get(): <strong>{result}</strong>
            </div>

            <div>
                Call SimpleStorage.set():{" "}
                <input
                    type="text"
                    onChange={(e) => setValue(e.target.value)}
                    defaultValue={value}
                />{" "}
                <button onClick={() => invokeSet()}>Set</button>
            </div>
        </div>
    );
}

export default App;
