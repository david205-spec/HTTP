let provider;
let signer;
let contract;

const abi = [
    "function batches(uint256) view returns (uint256 batchId,string medicineName,string manufacturerDetails,uint256 manufacturingDate,uint256 expiryDate,string handlingRequirements,string storageConditions,string status,address currentOwner)"
];

async function connectWallet() {

    if (!window.ethereum) {
        alert("MetaMask not installed");
        return;
    }

    await window.ethereum.request({
        method: "eth_requestAccounts"
    });

    provider = new ethers.providers.Web3Provider(window.ethereum);

    signer = provider.getSigner();

    const address = await signer.getAddress();

    document.getElementById("wallet").innerText =
        "Connected: " + address;
}

async function loadContract() {

    try {

        const address =
            document.getElementById("contractAddress").value.trim();

        contract = new ethers.Contract(address, abi, signer);

        document.getElementById("status").innerText =
            "Contract Loaded";

        console.log(contract);

    } catch (error) {

        console.error(error);

        alert("Failed to load contract");
    }
}

async function verifyProduct() {

    try {

        const tokenId =
            document.getElementById("verifyTokenId").value;

        const result =
            await contract.batches(tokenId);

        console.log(result);

        document.getElementById("verifyResult").innerText =
            "Medicine: " + result.medicineName +
            " | Status: " + result.status;

    } catch (error) {

        console.error(error);

        alert("Verification failed");
    }
}
