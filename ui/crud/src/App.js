import "./App.css";
import Web3 from "web3";
import { useState } from "react";
import Crud from "./contracts/Crud.json";

function App() {
    const [readResult, setReadResult] = useState(null);
    const [name, setName] = useState(null);
    const [id, setId] = useState(null);

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
    async function getContract() {
        const web3 = await getWeb3();
        const deploymentKey = Object.keys(Crud.networks)[0];
        return new web3.eth.Contract(
            Crud.abi,
            Crud.networks[deploymentKey].address
        );
    }

    // method for retrieveing all available accounts
    async function getAccounts() {
        const web3 = await getWeb3();
        return await web3.eth.getAccounts();
    }

    // invokes the read method of the contract
    async function invokeRead() {
        const contract = await getContract();
        try {
            const result = await contract.methods.read(id).call();
            setReadResult(result);
        } catch (ex) {
            setReadResult(null);
        }
    }

    // invokes the create method of the contract
    async function invokeCreate() {
        const contract = await getContract();
        const accounts = await getAccounts();
        await contract.methods.create(name).send({
            from: accounts[0],
        });
    }

    // invokes the update method of the contract
    async function invokeUpdate() {
        const contract = await getContract();
        const accounts = await getAccounts();
        await contract.methods.update(id, name).send({
            from: accounts[0],
        });
    }

    // invokes the destroy method of the contract
    async function invokeDestroy() {
        const contract = await getContract();
        const accounts = await getAccounts();
        await contract.methods.destroy(id).send({
            from: accounts[0],
        });
    }

    return (
        <div className="App">
            <h1>CRUD</h1>

            <div>
                Calling Crud.create(<i>name</i>):
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    defaultValue={name}
                />
                <button onClick={() => invokeCreate()}>Create</button>
            </div>

            <div>
                Calling Crud.read(<i>id</i>):
                <input
                    type="text"
                    onChange={(e) => setId(parseInt(e.target.value))}
                    defaultValue={id}
                    placeholder="ID"
                />
                <button onClick={() => invokeRead()}>Read</button>{" "}
                <strong>
                    {readResult ? `${readResult[0]}:${readResult[1]}` : ""}
                </strong>
            </div>

            <div>
                Call Crud.update(<i>value</i>):
                <input
                    type="text"
                    onChange={(e) => setId(parseInt(e.target.value))}
                    defaultValue={id}
                    placeholder="ID"
                />
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    defaultValue={name}
                    placeholder="Name"
                />
                <button onClick={() => invokeUpdate()}>Update</button>
            </div>

            <div>
                Call Crud.destroy(<i>id</i>):
                <input
                    type="text"
                    onChange={(e) => setId(parseInt(e.target.value))}
                />
                <button onClick={() => invokeDestroy()}>Destroy</button>
            </div>
        </div>
    );
}

export default App;
