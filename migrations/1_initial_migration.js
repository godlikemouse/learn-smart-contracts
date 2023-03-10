const SimpleSmartContract = artifacts.require("SimpleSmartContract");
const HelloWorld = artifacts.require("HelloWorld");
const SimpleStorage = artifacts.require("SimpleStorage");
const AdvancedStorage = artifacts.require("AdvancedStorage");
const Crud = artifacts.require("Crud");
const MappingPayable = artifacts.require("MappingPayable");

module.exports = function (deployer) {
    deployer.deploy(SimpleSmartContract);
    deployer.deploy(HelloWorld);
    deployer.deploy(SimpleStorage);
    deployer.deploy(AdvancedStorage);
    deployer.deploy(Crud);
    deployer.deploy(MappingPayable);
};
