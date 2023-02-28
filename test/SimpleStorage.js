const SimpleStorage = artifacts.require("SimpleStorage");

contract("SimpleStorage", () => {
    let simpleStorage = null;

    before(async () => {
        simpleStorage = await SimpleStorage.deployed();
    });

    it("Simple storage contract deployed", async () => {
        assert(SimpleStorage.address != "");
    });

    it("Calling the get function", async () => {
        const result = await simpleStorage.get();
        assert(result == "mydata");
    });

    it("Calling the set function", async () => {
        await simpleStorage.set("hello");
        const result = await simpleStorage.get();
        assert(result == "hello");
    });
});
