const Crud = artifacts.require("Crud");

contract("Crud", () => {
    let crud = null;

    before(async () => {
        crud = await Crud.deployed();
    });

    it("Smart contract deployed", async () => {
        assert(crud.address != "");
    });

    it("Calling the create method", async () => {
        await crud.create("Jason");
        const result = await crud.read(1);
        assert(result[0].toNumber() == 1);
        assert(result[1] == "Jason");
    });

    it("Calling the update method", async () => {
        await crud.update(1, "Jason Graves");
        const result = await crud.read(1);
        assert(result[0].toNumber() == 1);
        assert(result[1] == "Jason Graves");
    });

    it("Calling the update method (revert)", async () => {
        try {
            await crud.update(2, "Bob Dobalina");
        } catch (ex) {
            assert(ex.message.includes("User not found."));
            return;
        }
        assert(false);
    });

    it("Calling the destroy method", async () => {
        await crud.destroy(1);
        try {
            const result = await crud.read(1);
        } catch (ex) {
            assert(ex.message.includes("User not found."));
            return;
        }
        assert(false);
    });
});
