import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import MedicineTrackerABI from "/workspace/SCM-Starter/artifacts/contracts/MedicineIntakeTracker.sol/MedicineTrackerABI.json";

const contractAddress = "0x9D7f74d0C41E726EC95884E0e97Fa6129e3b5E99";

export default function Home() {
    const [medicines, setMedicines] = useState([]);
    const [newMedicine, setNewMedicine] = useState("");
    const [intakeTime, setIntakeTime] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        loadMedicines();
    }, []);

    async function loadMedicines() {
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, MedicineTrackerABI, signer);
            const data = await contract.getIntakes();
            console.log("Medicines:", data); // Log fetched data for debugging
            setMedicines(data); // Update state with fetched data
        } catch (error) {
            console.error("Error loading medicines:", error);
            setError(error.message); // Update state with error message
        }
    }

    async function addMedicine() {
        try {
            if (!newMedicine || !intakeTime) return;
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, MedicineTrackerABI, signer);
            const transaction = await contract.addIntake(newMedicine, intakeTime);
            await transaction.wait();
            await loadMedicines(); // Ensure medicines are reloaded after adding
        } catch (error) {
            console.error("Error adding medicine:", error);
            setError(error.message);
        }
    }

    async function handleGetMedicines() {
        try {
            await loadMedicines();
        } catch (error) {
            console.error("Error getting medicines:", error);
        }
    }

    return (
        <div>
            <h1>Medicine Intake Tracker</h1>
            <input 
                type="text" 
                value={newMedicine} 
                onChange={(e) => setNewMedicine(e.target.value)} 
                placeholder="Medicine Name" 
            />
            <input 
                type="text" 
                value={intakeTime} 
                onChange={(e) => setIntakeTime(e.target.value)} 
                placeholder="Intake Time (timestamp)" 
            />
            <button onClick={addMedicine}>Add Medicine</button>
            <button onClick={handleGetMedicines}>Get Medicines</button>
            {/* {error && <p>Error: {error}</p>}
            <ul>
                {medicines.map((medicine, index) => (
                    <li key={index}>{medicine.medicineName} at {new Date(medicine.intakeTime * 1000).toLocaleString()}</li>
                ))}
            </ul> */}
        </div>
    );
}
