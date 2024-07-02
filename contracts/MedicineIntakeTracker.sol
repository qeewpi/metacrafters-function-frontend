// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicineIntakeTracker {
    struct MedicineIntake {
        string medicineName;
        uint256 intakeTime;
    }

    MedicineIntake[] private intakes;

    function addIntake(string memory medicineName, uint256 intakeTime) public {
        intakes.push(MedicineIntake(medicineName, intakeTime));
    }

    function getIntakes() public view returns (MedicineIntake[] memory) {
        return intakes;
    }
}
