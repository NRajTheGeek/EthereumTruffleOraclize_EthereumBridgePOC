pragma solidity ^0.4.17;


contract PaintingUtils{
    
    uint public registerationFee = 100000000000000000; // 10 ^ 17 = 0.1 etheres
    uint public lastDate;
    address public owner;
    
    
    uint public highestVotes;
    address public winnerPaintingSHA256;
    Applicant public winnerDetails;
    
    uint internal _highestVotes;
    address internal _winnerPaintingSHA256;
    Applicant internal _winnerDetails;
    
    
    uint public votingStartDateInMinutes;
    uint public votingEndDateInMinutes;
    
    
    struct Applicant {
        string Name;
        string Email;
        address applicantAddress;
        string paintingURL;
        string paintingURLSHA256;
        uint votesAttained;
        bool isPaintingValid;
    }
    
    // mapping (address => Applicant) public winnerDetails;
    mapping (address => bytes) public votedFor;
    mapping (bytes => address) hashRegistered;
    mapping (address => Applicant) public registeredApplicant;
    

    event LogNewOraclizeQuery(string msg);
    
    modifier onlyOwner(address sender) {
        require(sender == owner, "unauthorized!");
        _;
    }
    
    modifier votingDeadLineOver() {
        require(now < votingEndDateInMinutes, "voting date over");
        _;
    }
    
    modifier votingNotStartedYet() {
        require(now > votingStartDateInMinutes, "voting Not Started Yet");
        _;
    }
    
    modifier alreadyVotedFor(string memory _paintingURLSHA256, address voter) {
        require(keccak256(votedFor[voter]) != keccak256(bytes(_paintingURLSHA256)), "already voted for");
        _;
    }
    
    modifier canVoteOnlyOnce(string memory _paintingURLSHA256, address voter) {
        require(votedFor[voter].length == 0, "can vote only once");
        _;
    }
    
    modifier addressNotBlank(address checkAdd) {
        require(checkAdd != address(0), "address null");
        _;
    }
    
    modifier nonNegativeCheck(uint _lastDate) {
        require(_lastDate > 0, "invalid uint value.");
        _;
    }
    
    modifier ensureValidFee(uint _feeInWei)
    {
        require(_feeInWei == registerationFee, "invalid fee In Wei given. required 100000000000000000 wei");
        _;
    }
    
    modifier nonEmptyString(string memory _paintingURL) {
        require(bytes(_paintingURL).length > 0, "_paintingURL can not be blank");
        _;
    }
    
    modifier ifRegisteredSomething(address registeredFor) {
        Applicant memory applicant = registeredApplicant[registeredFor];
        require(bytes(applicant.paintingURLSHA256).length == 0, "you have already registered.");
        _;
    }
    
    modifier alreadyRegistered(string memory _paintingURLSHA256){
        require(hashRegistered[bytes(_paintingURLSHA256)] == address(0), "already registered");
        _;
    }
    
    modifier ifNotLate() {
        require(lastDate > now, "registeration over, sorry");
        _;
    }
    
    modifier moreThanToday(uint _lastDateinDays) {
        require(_lastDateinDays > now, "should be more than today.");
        _;
    } 
    
    modifier cantBeMoreThanDay(uint _minutes){
        require(_minutes <= 1440, "minutes can  not exceed 1440");
        _;
    }
    
    modifier alreadySetLastDate {
        require(lastDate == 0, "last date already set.");
        _;
    }
    
    modifier isValidHashOfPainter(address _applicantAddress, string memory _paintingURLSHA256) {
        require(hashRegistered[bytes(_paintingURLSHA256)] == _applicantAddress, "not allowed to modify false hash");
        _;
    }
}