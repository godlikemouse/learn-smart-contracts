import "./App.css";
import Web3 from "web3";
import { useCallback, useState, useEffect } from "react";
import MappingPayable from "./contracts/MappingPayable.json";

function App() {
    const [depositAmount, setDepositAmount] = useState(0);
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const [senderAddress, setSenderAddress] = useState(null);
    const [accounts, setAccounts] = useState(null);
    const [balanceOfAddress, setBalanceOfAddress] = useState(null);
    const [balanceOfResult, setBalanceOfResult] = useState(null);
    const [balanceResult, setBalanceResult] = useState(null);

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
        const deploymentKey = Object.keys(MappingPayable.networks)[0];
        return new web3.eth.Contract(
            MappingPayable.abi,
            MappingPayable.networks[deploymentKey].address
        );
    }

    // method for retrieveing all available accounts
    const initializeAccounts = useCallback(async () => {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);
        if (!senderAddress) {
            setSenderAddress(accounts[0]);
        }
        if (!balanceOfAddress) {
            setBalanceOfAddress(accounts[0]);
        }
    }, []);

    // invokes the read method of the contract
    async function invokeDeposit() {
        const contract = await getContract();
        const web3 = await getWeb3();
        try {
            const result = await contract.methods.deposit().send({
                value: web3.utils.toWei(String(depositAmount), "ether"),
                from: senderAddress,
            });
            console.info("invokeDeposit", result);
        } catch (ex) {
            console.error("invokeDeposit:", ex);
        }
    }

    // invokes the create method of the contract
    async function invokeBalanceOf() {
        const contract = await getContract();
        try {
            const result = await contract.methods
                .balanceOf(balanceOfAddress)
                .call({ from: senderAddress });
            setBalanceOfResult(result);
        } catch (ex) {
            console.error("invokeBalanceOf", ex);
            setBalanceOfResult(null);
        }
    }

    // invokes the update method of the contract
    async function invokeBalance() {
        const contract = await getContract();
        try {
            const result = await contract.methods
                .balance()
                .call({ from: senderAddress });
            setBalanceResult(result);
        } catch (ex) {
            console.error("invokeBalance:", ex);
            setBalanceResult(null);
        }
    }

    async function invokeWithraw() {
        const contract = await getContract();
        const web3 = await getWeb3();
        try {
            const result = await contract.methods
                .withdraw(web3.utils.toWei(String(withdrawAmount), "ether"))
                .send({
                    from: senderAddress,
                });
            console.info("invokeWithdraw:", result);
        } catch (ex) {
            console.error("invokeWithdraw:", ex);
        }
    }

    useEffect(() => {
        initializeAccounts();
    }, [initializeAccounts]);

    return (
        <div className="App">
            <h1>Mapping Payable</h1>

            <div>
                Sender:{" "}
                <select
                    onChange={(e) => setSenderAddress(e.target.value)}
                    defaultValue={senderAddress}
                >
                    {(accounts ?? []).map((acc, idx) => (
                        <option value={acc} key={`sender-${idx}`}>
                            {acc}
                        </option>
                    ))}
                </select>
            </div>

            <p>
                <i>
                    All amounts are in Ether (1 Ether = 1000000000000000000 Wei)
                </i>
            </p>

            <div>
                Call MappingPayable.deposit(<i>amount</i>):{" "}
                <input
                    type="number"
                    defaultValue={depositAmount}
                    onChange={(e) => setDepositAmount(parseInt(e.target.value))}
                />
                <button onClick={() => invokeDeposit()}>Deposit</button>
            </div>

            <div>
                Call MappingPayable.balanceOf(<i>address</i>):{" "}
                <select
                    onChange={(e) => setBalanceOfAddress(e.target.value)}
                    defaultValue={balanceOfAddress}
                >
                    {(accounts ?? []).map((acc, idx) => (
                        <option value={acc} key={`balance-of-${idx}`}>
                            {acc}
                        </option>
                    ))}
                </select>
                <button onClick={() => invokeBalanceOf()}>Balance Of</button> :{" "}
                <strong>{balanceOfResult?.toString()}</strong>
            </div>

            <div>
                Call MappingPayable.balance():{" "}
                <button onClick={() => invokeBalance()}>Balance</button> :{" "}
                <strong>{balanceResult?.toString()}</strong>
            </div>

            <div>
                Call MappingPayable.withdraw(<i>amount</i>):{" "}
                <input
                    type="number"
                    defaultValue={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                />
                <button onClick={() => invokeWithraw()}>Withdraw</button>
            </div>
        </div>
    );
}

export default App;
