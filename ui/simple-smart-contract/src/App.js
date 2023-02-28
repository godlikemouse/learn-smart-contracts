import "./App.css";
import Web3 from "web3";
import { useState, useEffect } from "react";

function App() {
    const [isInitialized, setIsInitialized] = useState(false);
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const web3 = new Web3(
            `http://${process.env.REACT_APP_WEB3_HOST}:${process.env.REACT_APP_WEB3_PORT}`
        );

        web3.eth.getAccounts().then((acc) => {
            setAccounts(acc);
            setIsInitialized(true);
        });
    }, [isInitialized]);

    return (
        <div className="App">
            <h1>Simple Smart Contract - Listing Accounts</h1>
            <b>Accounts:</b>
            <ul>
                {accounts.map((acc, idx) => (
                    <li key={idx}>
                        {idx}: {acc}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
