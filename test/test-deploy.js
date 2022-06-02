const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

// describe("SimpleStorage", () => {})

describe("SimpleStorage", function () {
    // let simpleStorageFactory
    // let simpleStorage
    let simpleStorageFactory, simpleStorage
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should start with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        assert.equal(currentValue.toString(), expectedValue)
    })

    it("Should update when we call store", async function () {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)
        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
    })

    it("Should add the person with the favorite number", async function () {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.addPerson("John", "7")
        await transactionResponse.wait(1)
        const currentValue = await simpleStorage.nameToFavoriteNumber("John")
        assert.equal(currentValue.toString(), expectedValue)
    })
})
