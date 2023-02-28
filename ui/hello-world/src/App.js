import "./App.css";
import Web3 from "web3";
import { useState, useEffect } from "react";

function App() {
    const [result, setResult] = useState(null);

    useEffect(() => {
        const contractABI = [
            {
                inputs: [],
                name: "hello",
                outputs: [
                    {
                        internalType: "string",
                        name: "",
                        type: "string",
                    },
                ],
                stateMutability: "pure",
                type: "function",
                constant: true,
            },
        ];

        const web3 = new Web3(
            `http://${process.env.REACT_APP_WEB3_HOST}:${process.env.REACT_APP_WEB3_PORT}`
        );

        const helloWorld = new web3.eth.Contract(
            contractABI,
            process.env.REACT_APP_WEB3_CONTRACT_ADDRESS
        );

        helloWorld.methods
            .hello()
            .call()
            .then((r) => setResult(r));
    }, []);

    return (
        <div className="App">
            <h1>Hello World Contract</h1>
            <div>
                Calling HelloWorld.hello(): <strong>{result}</strong>
            </div>
        </div>
    );
}

export default App;
