const AdvancedStorage = artifacts.require("AdvancedStorage");

contract("AdvancedStorage", () => {
    let advancedStorage = null;

    before(async () => {
        advancedStorage = await AdvancedStorage.deployed();
    });

    it("Advanced storage contract deployed", async () => {
        assert(advancedStorage.address != "");
    });

    it("Calling the getAll function", async () => {
        const result = await advancedStorage.getAll();
        assert(result.length == 0);
    });

    it("Calling the add function", async () => {
        await advancedStorage.add(10);
        const result = await advancedStorage.get(0);
        assert(result.toNumber() == 10);
    });

    it("Calling the ids accessor directly", async () => {
        const result = await advancedStorage.ids(0);
        assert(result.toNumber() == 10);
    });

    it("Calling the get function", async () => {
        const result = await advancedStorage.get(0);
        assert(result.toNumber() == 10);
    });

    it("Calling the length function", async () => {
        const result = await advancedStorage.length();
        assert(result == 1);
    });

    it("Calling the getAll function (deep equal)", async () => {
        const result = await advancedStorage.getAll();
        const ids = result.map((id) => id.toNumber());
        assert.deepEqual(ids, [10]);
    });
});
