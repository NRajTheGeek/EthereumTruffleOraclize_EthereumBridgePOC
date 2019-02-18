pragma solidity ^0.4.17;

import "./PaintingUtils.sol";

contract PaintingRegisteration is PaintingUtils{

    function setRegisterationLastDateInMinute(uint _minutes)  
    onlyOwner(msg.sender)
    nonNegativeCheck(_minutes)
    cantBeMoreThanDay(_minutes)
    alreadySetLastDate
    public 
    {
        uint secInMin = 1 minutes;
        uint date = now + (_minutes * secInMin);    
        require(date > now, "ivalid date, should be less");
        lastDate = date;
    }
     
    function getCurrentTime() public view returns (uint) {
        return now;
    }
    
    function registerYourSelf(string memory Name, string memory Email, string memory _paintingURL, string memory _paintingURLSHA256)
    ifNotLate
    nonNegativeCheck(msg.value)
    nonEmptyString(_paintingURL)
    nonEmptyString(_paintingURLSHA256)
    ifRegisteredSomething(msg.sender)
    ensureValidFee(msg.value)
    alreadyRegistered(_paintingURLSHA256)
    public 
    payable
    {
        Applicant memory applicant = Applicant(
            Name, 
            Email, 
            msg.sender, 
            _paintingURL, 
            _paintingURLSHA256, 
            0, 
            false
        );
        hashRegistered[bytes(_paintingURLSHA256)] = msg.sender;
        registeredApplicant[msg.sender] = applicant;
    }
    
    function registeredBy(string memory _paintingURLSHA256) 
    public
    nonEmptyString(_paintingURLSHA256)
    view 
    returns (address)
    {
        return hashRegistered[bytes(_paintingURLSHA256)];
    }
    
    function isRegisterationValid(address registererAddress) 
    public 
    addressNotBlank(registererAddress)
    view 
    returns (bool) 
    {
        Applicant memory applicant = registeredApplicant[registererAddress];
        return applicant.isPaintingValid;
    }
    
    function validateRegisteration(address registererAddress, string memory _paintingURLSHA256)
    public 
    onlyOwner(msg.sender)
    addressNotBlank(registererAddress)
    nonEmptyString(_paintingURLSHA256)
    isValidHashOfPainter(registererAddress, _paintingURLSHA256)
    {
        Applicant memory applicant = registeredApplicant[registererAddress];
        require(!applicant.isPaintingValid, "already validated");
        require(keccak256(applicant.paintingURLSHA256) == keccak256(_paintingURLSHA256), "not valid sha of url");
        
        applicant.isPaintingValid = true;
        registeredApplicant[registererAddress] = applicant;
    }
}