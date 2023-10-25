// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract MyContract {
    address private admin1;
    address private admin2;
    address private admin3;

    constructor() {
        admin1 = 0x3755e0C19065502bC1ED6a1a82aa3B71918591E7;
        admin2 = 0x4c8b12BCAF4EA660279d81E038C196c5bf8C0d3f;
        admin3 = 0xE7271d962e2F8e6c5C19b1a2fB0e77c6057c3812;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin1 || msg.sender == admin2 || msg.sender == admin3, "Only admin can execute this");
        _;
    }

    modifier onlyDoctor(){
        require(doctors[msg.sender].age != 0, "Doctor doesn't exist");
        _;
    }

    modifier onlyPatient(){
        require(patients[msg.sender].age != 0, "Patient doesn't exist");
        _;
    }

    modifier onlyPharmacist(){
        require(pharmacists[msg.sender].age != 0, "Pharmacist doesn't exist");
        _;
    }

    modifier onlyPathologist(){
        require(pathologists[msg.sender].age != 0, "Pathologist doesn't exist");
        _;
    }

// Define a Doctor struct at the contract level
    struct Doctor {
        string name;
        uint256 age;
    }

    struct Doctors {
        address newdocaddress;
        string name;
        uint256 age;        
    }

    // Define a mapping with address as the key and Doctor as the value
    mapping(address => Doctor) private doctors;

    // Store the addresses of all registered doctors
    address[] public allDoctors;

    // Function to add a new doctor
    function addDoctor(address _address, string memory _name, uint256 _age) public onlyAdmin {
        doctors[_address] = Doctor(_name, _age);
        allDoctors.push(_address); // Add the doctor's address to the list
    }

    // Function to get the details of a doctor by address and return the address
    function getDoctor(address _address) public view returns (address, string memory, uint256) {
        Doctor storage doctor = doctors[_address];
        require(bytes(doctor.name).length > 0, "Doctor not found");
        return (_address, doctor.name, doctor.age);
    }

    // Function to show a decorated list of all registered doctors
    function showOurDoctors() public view returns (Doctors[] memory) {
    uint256 doctorCount = allDoctors.length;
    Doctors[] memory doctorsss = new Doctors[](doctorCount);

    for (uint256 i = 0; i < doctorCount; i++) {
        address doctorAddress = allDoctors[i];
        Doctor storage doctor = doctors[doctorAddress];

        doctorsss[i] = Doctors({
            newdocaddress: doctorAddress,
            name: doctor.name,
            age: doctor.age
        });
    }

    return doctorsss;
}


    // Add a function to remove a doctor by address
    function removeDoctor(address _address) public onlyAdmin {
        // Check if the doctor exists
        require(doctors[_address].age != 0, "Doctor doesn't exist");

        // Delete the doctor from the mapping
        delete doctors[_address];

        // Find and remove the doctor's address from the allDoctors array
        for (uint256 i = 0; i < allDoctors.length; i++) {
            if (allDoctors[i] == _address) {
                // Shift elements to fill the gap and reduce the array length
                for (uint256 j = i; j < allDoctors.length - 1; j++) {
                    allDoctors[j] = allDoctors[j + 1];
                }
                allDoctors.pop();
                break; // Exit the loop after removing the doctor
            }
        }
    }

    // Define a Patient struct at the contract level
    struct Patient {
        string name;
        uint256 age;
        string diseaseName;
        Prescription prescription;
        bool medicationDelivered;
        bool testRequested;
        string sampleCollected;
        string testType;
        string observations;
    }

    // Prescip struct
    struct Prescription {
        string medicationName;
        uint256 dosage;
        string instructions;
    }

    // Define a mapping with address as the key and Patient as the value
    mapping(address => Patient) private patients;

    // Store the addresses of all registered patients
    address[] public allPatients;

    // Function to add a new patient
    function addPatient(
        address _address,
        string memory _name,
        uint256 _age,
        string memory _diseaseName,
        string memory _medicationName,
        uint256 _dosage,
        string memory _instructions,
        string memory _sampleCollected,
        string memory _testType,
        string memory _observations
    ) public onlyAdmin {
        patients[_address] = Patient(
            _name,
            _age,
            _diseaseName,
            Prescription(_medicationName, _dosage, _instructions),
            false,
            false,
            _sampleCollected,
            _testType,
            _observations
        );
        allPatients.push(_address); // Add the patient's address to the list
    }

    // Function to get the details of a patient by address and return the address
    function getPatient(address _address) public view returns (address, string memory, uint256, string memory, Prescription memory, bool, bool, string memory, string memory, string memory) {
        Patient storage patient = patients[_address];
        require(bytes(patient.name).length > 0, "Patient not found");
        return (
            _address,
            patient.name,
            patient.age,
            patient.diseaseName,
            patient.prescription,
            patient.medicationDelivered,
            patient.testRequested,
            patient.sampleCollected,
            patient.testType,
            patient.observations
        );
    }

    struct Patients {
        address patientAddress;
        string name;
        uint256 age;
        string sampleCollected; 
        string testType;
        string observations;
        string medicationName;
        uint256 dosage;
        string instructions;
    }


    function showOurPatients() public view returns (Patients[] memory) {
        uint256 patientCount = allPatients.length;
        Patients[] memory patientList = new Patients[](patientCount);

        for (uint256 i = 0; i < patientCount; i++) {
            address patientAddress = allPatients[i];
            Patient storage patient = patients[patientAddress];

            patientList[i] = Patients({
                patientAddress: patientAddress,
                name: patient.name,
                age: patient.age,
                sampleCollected: patient.sampleCollected,
                testType: patient.testType,
                observations: patient.observations,
                medicationName: patient.prescription.medicationName,
                dosage: patient.prescription.dosage,
                instructions: patient.prescription.instructions
            });
        }

        return patientList;
    }


    // Add a function to remove a patient by address
    function removePatient(address _address) public onlyAdmin {
        // Check if the patient exists
        require(patients[_address].age != 0, "Patient doesn't exist");

        // Delete the patient from the mapping
        delete patients[_address];

        // Find and remove the patient's address from the allPatients array
        for (uint256 i = 0; i < allPatients.length; i++) {
            if (allPatients[i] == _address) {
                // Shift elements to fill the gap and reduce the array length
                for (uint256 j = i; j < allPatients.length - 1; j++) {
                    allPatients[j] = allPatients[j + 1];
                }
                allPatients.pop();
                break; // Exit the loop after removing the patient
            }
        }
    }
    // Function for doctors to add detailed prescription
    function addPrescription(address _patientAddress, string memory _medicationName, uint256 _dosage, string memory _instructions) public onlyDoctor {
        Patient storage patient = patients[_patientAddress];
        require(bytes(patient.name).length > 0, "Patient not found");
        
        // Create a new Prescription struct with detailed information
        patient.prescription = Prescription(_medicationName, _dosage, _instructions);
        patient.testRequested = false; // Set testRequested to false when adding prescription
    }

    // Define a Pharmacist struct at the contract level
        struct Pharmacist {
        string name;
        uint256 age;
    }

    // Define a mapping with address as the key and Pharmacist as the value
    mapping(address => Pharmacist) private pharmacists;

    // Store the addresses of all registered pharmacists
    address[] public allPharmacists;

    // Function to add a new pharmacist
    function addPharmacist(address _address, string memory _name, uint256 _age) public onlyAdmin {
        pharmacists[_address] = Pharmacist(_name, _age);
        allPharmacists.push(_address); // Add the pharmacist's address to the list
    }

    // Function to get the details of a pharmacist by address and return the address
    function getPharmacist(address _address) public view returns (address, string memory, uint256) {
        Pharmacist storage pharmacist = pharmacists[_address];
        require(bytes(pharmacist.name).length > 0, "Pharmacist not found");
        return (_address, pharmacist.name, pharmacist.age);
    }

    // Function for pharmacists to mark medication as delivered
    function markMedicationDelivered(address _patientAddress) public onlyPharmacist {
        Patient storage patient = patients[_patientAddress];
        require(bytes(patient.name).length > 0, "Patient not found");
        patient.medicationDelivered = true;
    }

    struct Pharmacists {
    address pharmacistAddress;
    string name;
    uint256 age;
}

    // Function to show a decorated list of all registered pharmacists
    function showOurPharmacists() public view returns (Pharmacists[] memory) {
        uint256 pharmacistCount = allPharmacists.length;
        Pharmacists[] memory pharmacistList = new Pharmacists[](pharmacistCount);

        for (uint256 i = 0; i < pharmacistCount; i++) {
            address pharmacistAddress = allPharmacists[i];
            Pharmacist storage pharmacist = pharmacists[pharmacistAddress];

            pharmacistList[i] = Pharmacists({
                pharmacistAddress: pharmacistAddress,
                name: pharmacist.name,
                age: pharmacist.age
            });
        }

        return pharmacistList;
    }

    // Add a function to remove a pharmacist by address
    function removePharmacist(address _address) public onlyAdmin {
        // Check if the pharmacist exists
        require(pharmacists[_address].age != 0, "Pharmacist doesn't exist");

        // Delete the pharmacist from the mapping
        delete pharmacists[_address];

        // Find and remove the pharmacist's address from the allPharmacists array
        for (uint256 i = 0; i < allPharmacists.length; i++) {
            if (allPharmacists[i] == _address) {
                // Shift elements to fill the gap and reduce the array length
                for (uint256 j = i; j < allPharmacists.length - 1; j++) {
                    allPharmacists[j] = allPharmacists[j + 1];
                }
                allPharmacists.pop();
                break; // Exit the loop after removing the pharmacist
            }
        }
    }


    // Define a Pathologist struct at the contract level
        struct Pathologist {
        string name;
        uint256 age;
    }

    // Define a mapping with address as the key and Pathologist as the value
    mapping(address => Pathologist) private pathologists;

    // Store the addresses of all registered pathologists
    address[] public allPathologists;

    // Function to add a new pathologist
    function addPathologist(address _address, string memory _name, uint256 _age) public onlyAdmin {
        pathologists[_address] = Pathologist(_name, _age);
        allPathologists.push(_address); // Add the pathologist's address to the list
    }

    // Function to get the details of a pathologist by address and return the address
    function getPathologist(address _address) public view returns (address, string memory, uint256) {
        Pathologist storage pathologist = pathologists[_address];
        require(bytes(pathologist.name).length > 0, "Pathologist not found");
        return (_address, pathologist.name, pathologist.age);
    }

    struct Pathologists {
    address pathologistAddress;
    string name;
    uint256 age;
}

    // Function to show a decorated list of all registered pathologists
    function showOurPathologists() public view returns (Pathologists[] memory) {
        uint256 pathologistCount = allPathologists.length;
        Pathologists[] memory pathologistList = new Pathologists[](pathologistCount);

        for (uint256 i = 0; i < pathologistCount; i++) {
            address pathologistAddress = allPathologists[i];
            Pathologist storage pathologist = pathologists[pathologistAddress];

            pathologistList[i] = Pathologists({
                pathologistAddress: pathologistAddress,
                name: pathologist.name,
                age: pathologist.age
            });
        }

        return pathologistList;
    }

    

    // Add a function to remove a pathologist by address
    function removePathologist(address _address) public onlyAdmin {
        // Check if the pathologist exists
        require(pathologists[_address].age != 0, "Pathologist doesn't exist");

        // Delete the pathologist from the mapping
        delete pathologists[_address];

        // Find and remove the pathologist's address from the allPathologists array
        for (uint256 i = 0; i < allPathologists.length; i++) {
            if (allPathologists[i] == _address) {
                // Shift elements to fill the gap and reduce the array length
                for (uint256 j = i; j < allPathologists.length - 1; j++) {
                    allPathologists[j] = allPathologists[j + 1];
                }
                allPathologists.pop();
                break; // Exit the loop after removing the pathologist
            }
        }
    }

    // Function for doctors to request tests for patients
    function requestTest(address _patientAddress, string memory _testName) public onlyDoctor {
        Patient storage patient = patients[_patientAddress];
        require(bytes(patient.name).length > 0, "Patient not found");
        patient.testRequested = true;
        patient.testType = _testName;
    }

    // Function to retrieve details of all patients with testRequested as true
    function getRequestedPatients() public view returns (Patients[] memory) {
    uint256 requestedPatientCount = 0;
    uint256 patientCount = allPatients.length;

    // Count the number of patients with testRequested as true
    for (uint256 i = 0; i < patientCount; i++) {
        address patientAddress = allPatients[i];
        Patient storage patient = patients[patientAddress];
        if (patient.testRequested) {
            requestedPatientCount++;
        }
    }

    Patients[] memory requestedPatients = new Patients[](requestedPatientCount);
    uint256 requestedIndex = 0;

    // Populate the requestedPatients array with patient details
    for (uint256 i = 0; i < patientCount; i++) {
        address patientAddress = allPatients[i];
        Patient storage patient = patients[patientAddress];
        if (patient.testRequested) {
            requestedPatients[requestedIndex] = Patients({
                patientAddress: patientAddress,
                name: patient.name,
                age: patient.age,
                sampleCollected: patient.sampleCollected,
                testType: patient.testType,
                observations: patient.observations,
                medicationName: patient.prescription.medicationName,
                dosage: patient.prescription.dosage,
                instructions: patient.prescription.instructions
            });
            requestedIndex++;
        }
    }

    return requestedPatients;
}


    // Function for pathologists to access patient details based on index
    function accessPatientDetails(address _patientAddress) public onlyPathologist view returns (address, string memory, uint256, string memory, Prescription memory, bool, bool) {
        Patient storage patient = patients[_patientAddress];
        require(patient.testRequested, "Test not requested for this patient");
        return (_patientAddress, patient.name, patient.age, patient.diseaseName, patient.prescription, patient.medicationDelivered, patient.testRequested);
    }



    // Function for pathologists to add observations for patients
    function addObservations(address _patientAddress, string memory _sampleCollected, string memory _observations) public onlyPathologist {
        Patient storage patient = patients[_patientAddress];
        require(bytes(patient.name).length > 0, "Patient not found");
        require(patient.testRequested, "Test not requested for this patient");

        // Update patient information with observations
        patient.sampleCollected = _sampleCollected;
        patient.observations = _observations;
    }
    function getPatientsWithMedicationNotDelivered() public view returns (Patients[] memory) {
        uint256 notDeliveredPatientCount = 0;
        uint256 patientCount = allPatients.length;

        // Count the number of patients with medicationDelivered as false
        for (uint256 i = 0; i < patientCount; i++) {
            address patientAddress = allPatients[i];
            Patient storage patient = patients[patientAddress];
            if (!patient.medicationDelivered) {
                notDeliveredPatientCount++;
            }
        }

        Patients[] memory notDeliveredPatients = new Patients[](notDeliveredPatientCount);
        uint256 notDeliveredIndex = 0;

        // Populate the notDeliveredPatients array with patient details
        for (uint256 i = 0; i < patientCount; i++) {
            address patientAddress = allPatients[i];
            Patient storage patient = patients[patientAddress];
            if (!patient.medicationDelivered) {
                notDeliveredPatients[notDeliveredIndex] = Patients({
                    patientAddress: patientAddress,
                    name: patient.name,
                    age: patient.age,
                    sampleCollected: patient.sampleCollected,
                    testType: patient.testType,
                    observations: patient.observations,
                    medicationName: patient.prescription.medicationName,
                    dosage: patient.prescription.dosage,
                    instructions: patient.prescription.instructions
                });
                notDeliveredIndex++;
            }
        }

        return notDeliveredPatients;
    }

    function showPatientDetails(address _patientAddress) onlyPatient public view returns (Patients memory)  {
    Patient storage patient = patients[_patientAddress];
    require(bytes(patient.name).length > 0, "Patient not found");

    Patients memory patientDetails;
    patientDetails.patientAddress = _patientAddress;
    patientDetails.name = patient.name;
    patientDetails.age = patient.age;
    patientDetails.sampleCollected = patient.sampleCollected;
    patientDetails.testType = patient.testType;
    patientDetails.observations = patient.observations;
    patientDetails.medicationName = patient.prescription.medicationName;
    patientDetails.dosage = patient.prescription.dosage;
    patientDetails.instructions = patient.prescription.instructions;

    return patientDetails;
}



}