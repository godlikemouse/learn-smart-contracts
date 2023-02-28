import "./App.css";
import Web3 from "web3";
import { useCallback, useState, useEffect } from "react";
import AdvancedStorage from "./contracts/AdvancedStorage.json";

function App() {
    const [allResult, setAllResult] = useState([]);
    const [getResult, setGetResult] = useState(null);
    const [lengthResult, setLengthResult] = useState(null);
    const [addValue, setAddValue] = useState(null);
    const [getValue, setGetValue] = useState(null);

    // convenience method for retrieving the web3 provider
    function getWeb3() {
        return new Promise((resolve, reject) => {
            if ("ethereum" in window) {
                window.ethereum
                    .enable()
                    .then(() => resolve(new Web3(window.ethereum)))
                    .catch((ex) => reject(ex));
            }

            if ("web3" in window) {
                return resolve(new Web3(window.web3.currentProvider));
            }

            resolve(
                new Web3(
                    `http://${process.env.REACT_APP_WEB3_HOST}:${process.env.REACT_APP_WEB3_PORT}`
                )
            );
        });
    }

    // method for retrieving the smart contract interface
    const getContract = useCallback(async () => {
        const web3 = await getWeb3();
        const deploymentKey = Object.keys(AdvancedStorage.networks)[0];
        return new web3.eth.Contract(
            AdvancedStorage.abi,
            AdvancedStorage.networks[deploymentKey].address
        );
    }, []);

    // method for retrieveing all available accounts
    async function getAccounts() {
        const web3 = await getWeb3();
        return await web3.eth.getAccounts();
    }

    // invokes the getAll method of the contract
    const invokeGetAll = useCallback(async () => {
        const contract = await getContract();
        const result = await contract.methods.getAll().call();
        if (result.length !== allResult.length) setAllResult(result);
        console.info("getAll", result);
    }, [allResult, getContract]);

    // inovkes the length method of the contract
    const invokeLength = useCallback(async () => {
        const contract = await getContract();
        const result = await contract.methods.length().call();
        setLengthResult(result);
        console.info("length", result);
    }, [getContract]);

    // invokes the get method of the contract
    async function invokeGet() {
        const contract = await getContract();
        const result = await contract.methods.get(getValue).call();
        setGetResult(result);
    }

    // invokes the add method of the contract
    async function invokeAdd() {
        const accounts = await getAccounts();
        const contract = await getContract();
        await contract.methods.add(addValue).send({ from: accounts[0] });
        invokeGetAll();
        invokeLength();
    }

    // call getAll and length on load
    useEffect(() => {
        invokeGetAll();
        invokeLength();
    }, [invokeGetAll, invokeLength]);

    return (
        <div className="App">
            <h1>Advanced Storage</h1>
            <div>
                Calling AdvancedStorage.getAll():{" "}
                <strong>[{allResult.join(",")}]</strong>
            </div>

            <div>Calling AdvancedStorage.length(): {lengthResult}</div>

            <div>
                Call AdvancedStorage.add(<i>value</i>):
                <input
                    type="text"
                    onChange={(e) => setAddValue(e.target.value)}
                    defaultValue={addValue}
                />
                <button onClick={() => invokeAdd()}>Add</button>
            </div>

            <div>
                Call AdvancedStorage.get(<i>position</i>):
                <input
                    type="text"
                    onChange={(e) => setGetValue(e.target.value)}
                    defaultValue={getValue}
                />
                <button onClick={() => invokeGet()}>Get</button> : {getResult}
            </div>
        </div>
    );
}

export default App;
