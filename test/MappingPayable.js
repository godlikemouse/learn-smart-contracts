const MappingPayable = artifacts.require("MappingPayable");

contract("MappingPayable", () => {
    let mappingPayable = null;
    let accounts = null;
    let primaryAccount = null;
    let secondaryAccount = null;
    let tirtiaryAccount = null;

    before(async () => {
        mappingPayable = await MappingPayable.deployed();
        accounts = await web3.eth.getAccounts();
        [primaryAccount, secondaryAccount, tirtiaryAccount] = accounts;
    });

    it("Smart contract deployed", async () => {
        assert(mappingPayable.address != "");
    });

    it("Read initial balance (0)", async () => {
        const balance = await mappingPayable.balanceOf(primaryAccount);
        assert(balance.toNumber() == 0);
    });

    it("Send 2 Eth to default account.", async () => {
        await mappingPayable.deposit({
            value: web3.utils.toWei("2", "ether"),
            from: primaryAccount,
        });
        const balance = await mappingPayable.balanceOf(primaryAccount);
        assert(balance.toString() == web3.utils.toWei("2", "ether"));
    });

    it("Read contract total balance (2 Eth).", async () => {
        const balance = await mappingPayable.balance();
        assert(balance.toString() == web3.utils.toWei("2", "ether"));
    });

    it("Send 1 Eth to secondary account.", async () => {
        await mappingPayable.deposit({
            value: web3.utils.toWei("1", "ether"),
            from: secondaryAccount,
        });
        const balance = await mappingPayable.balanceOf(accounts[1]);
        assert(balance.toString() == web3.utils.toWei("1", "ether"));
    });

    it("Send 1 Eth to tirtiary account.", async () => {
        await mappingPayable.deposit({
            value: web3.utils.toWei("1", "ether"),
            from: tirtiaryAccount,
        });
        const balance = await mappingPayable.balanceOf(accounts[2]);
        assert(balance.toString() == web3.utils.toWei("1", "ether"));
    });

    it("Read contract total balance (4 Eth).", async () => {
        const balance = await mappingPayable.balance();
        assert(balance.toString() == web3.utils.toWei("4", "ether"));
    });

    it("Withdraw the primary account (1 Eth)", async () => {
        await mappingPayable.withdraw(web3.utils.toWei("1", "ether"), {
            from: primaryAccount,
        });
        const balance = await mappingPayable.balanceOf(primaryAccount);
        assert(balance.toString() == web3.utils.toWei("1", "ether"));
    });
});
