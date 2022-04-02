const hre = require("hardhat");

async function main() {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy(".alps");
  await domainContract.deployed();
  console.log("Contract deployed to:", domainContract.address);
  console.log("Contract deployed by:", owner.address);

  const txn1 = await domainContract.registerForDomain("dooms", {
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await txn1.wait();

  const domainOwner = await domainContract.getDomainOwner("dooms");
  console.log("Owner of domain:", domainOwner);

  // const txn2 = await domainContract
  //   .connect(randomPerson)
  //   .setDomainRecord("spidey", "I am spiderman");
  // await txn2.wait();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
