// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract MyContract {
    address private admin1;
    address private admin2;

    constructor() {
        admin1 = 0x3755e0C19065502bC1ED6a1a82aa3B71918591E7; //if u work on remix then change this
        admin2 = 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin1 || msg.sender == admin2, "Only admin can execute this");
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

// Doctor struct
    struct Doctor {
        string name;
        uint256 age;
    }

    // mapping with addr
    mapping(address => Doctor) private doctors;

    // Store the addresses of all registered doctors
    address[] public allDoctors;

    // Function to add a new doctor
    function addDoctor(address _address, string memory _name, uint256 _age) public onlyAdmin {
        doctors[_address] = Doctor(_name, _age);
        allDoctors.push(_address); // Add the doctor's address to the list
    }

    // get the details of a doctor by address and return the address
    function getDoctor(address _address) public view returns (address, string memory, uint256) {
        Doctor storage doctor = doctors[_address];
        require(bytes(doctor.name).length > 0, "Doctor not found");
        return (_address, doctor.name, doctor.age);
    }

    // show the list of all registered doctors
    function showOurDoctors() public view returns (Doctor[] memory) {
        Doctor[] memory doctorList = new Doctor[](allDoctors.length);

        for (uint256 i = 0; i < allDoctors.length; i++) {
            address doctorAddress = allDoctors[i];
            Doctor storage doctor = doctors[doctorAddress];
            doctorList[i] = doctor;
        }

        return doctorList;
    }

    // Patient struct 
    struct Patient {
        string name;
        uint256 age;
        string diseaseName;
        Prescription prescription; //new struct, kinda define chesa
        bool medicationDelivered;
        bool testRequested;
    }

    // Prescip struct
    struct Prescription {
        string medicationName;
        uint256 dosage;
        string instructions;
    }

    // mapping with address 
    mapping(address => Patient) private patients;

    // Function to add a new patient
    function addPatient(address _address, string memory _name, uint256 _age) public onlyAdmin {
        patients[_address] = Patient(_name, _age, "", Prescription("", 0, ""), false, false);
    }

    // get the details of a patient by address and return the address
    function getPatient(address _address) public view returns (address, string memory, uint256, string memory, Prescription memory, bool, bool) {
        Patient storage patient = patients[_address];
        require(bytes(patient.name).length > 0, "Patient not found");
        return (_address, patient.name, patient.age, patient.diseaseName, patient.prescription, patient.medicationDelivered, patient.testRequested);
    }

    // doctors to add detailed prescription
    function addPrescription(address _patientAddress, string memory _medicationName, uint256 _dosage, string memory _instructions) public onlyDoctor {
        Patient storage patient = patients[_patientAddress];
        require(bytes(patient.name).length > 0, "Patient not found");
        
        // Create a new Prescription struct 
        patient.prescription = Prescription(_medicationName, _dosage, _instructions);
        patient.testRequested = false; // Set testRequested to false when adding prescription
    }

    // Pharmacist struct 
    struct Pharmacist {
        string name;
        uint256 age;
        address[] patientsWithMedicationPending;
    }

    // mapping with address 
    mapping(address => Pharmacist) private pharmacists;

    // Function to add a new pharmacist
    function addPharmacist(address _address, string memory _name, uint256 _age) public onlyAdmin {
        pharmacists[_address] = Pharmacist(_name, _age, new address[](0));
    }

    // get the details of a pharmacist by address and return the address
    function getPharmacist(address _address) public view returns (address, string memory, uint256) {
        Pharmacist storage pharmacist = pharmacists[_address];
        require(bytes(pharmacist.name).length > 0, "Pharmacist not found");
        return (_address, pharmacist.name, pharmacist.age);
    }

    // pharmacists to mark medication as delivered
    function markMedicationDelivered(address _patientAddress) public onlyPharmacist {
        Patient storage patient = patients[_patientAddress];
        require(bytes(patient.name).length > 0, "Patient not found");
        patient.medicationDelivered = true;
    }

    // pharmacists to get a list of patients with medication pending
    function getPatientsWithMedicationPending() public view onlyPharmacist returns (address[] memory) {
        return pharmacists[msg.sender].patientsWithMedicationPending;
    }

    // Pathologist struct at the contract level
    struct Pathologist {
        string name;
        uint256 age;
    }

    // mapping with address 
    mapping(address => Pathologist) private pathologists;

    // Function to add a new pathologist
    function addPathologist(address _address, string memory _name, uint256 _age) public onlyAdmin {
        pathologists[_address] = Pathologist(_name, _age);
    }

    // get the details of a pathologist by address and return the address
    function getPathologist(address _address) public view returns (address, string memory, uint256) {
        Pathologist storage pathologist = pathologists[_address];
        require(bytes(pathologist.name).length > 0, "Pathologist not found");
        return (_address, pathologist.name, pathologist.age);
    }

    // doctors to request tests for patients
    function requestTest(address _patientAddress) public onlyDoctor {
        Patient storage patient = patients[_patientAddress];
        require(bytes(patient.name).length > 0, "Patient not found");
        patient.testRequested = true;
    }

    // pathologists to access patient details when a test is requested
    function accessPatientDetails(address _patientAddress) public onlyPathologist view returns (address, string memory, uint256, string memory, Prescription memory, bool, bool) {
        Patient storage patient = patients[_patientAddress];
        require(patient.testRequested, "Test not requested for this patient");
        return (_patientAddress, patient.name, patient.age, patient.diseaseName, patient.prescription, patient.medicationDelivered, patient.testRequested);
    }

}