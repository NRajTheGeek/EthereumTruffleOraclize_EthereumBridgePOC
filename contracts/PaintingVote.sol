pragma solidity ^0.4.17;

import "./PaintingUtils.sol";
import "installed_contracts/oraclize-api/contracts/usingOraclize.sol";

contract PaintingVote is PaintingUtils, usingOraclize {
    
    function declareWinner() 
    private {
        highestVotes = _highestVotes;
        winnerPaintingSHA256 = _winnerPaintingSHA256;
        winnerDetails = _winnerDetails; 
        
        winnerDetails.applicantAddress.transfer(address(this).balance);
    }
    
    function __callback(bytes32 myid, string memory result, bytes memory proof) public {
        require(msg.sender == oraclize_cbAddress());
        
        // declare the winner and do the tx 
        declareWinner();
    }
    
    function setVotingDeadLine(uint startDateInMinute, uint endDateInMinutes) 
    public
    onlyOwner(msg.sender)
    payable
    {
        uint secInMin = 1 minutes;
        uint startDate = now + (startDateInMinute * secInMin);  
        uint endDate = now + (endDateInMinutes * secInMin);  
        require(startDate > now, "ivalid date, should be less");
        require(endDate > now && endDate > startDate, "ivalid date, should be less");
        
        
        votingStartDateInMinutes = startDate;
        votingEndDateInMinutes = endDate;
        
        uint paidToPerformOrcalize = msg.value;
        
        OAR = OraclizeAddrResolverI(0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475);
        // now from here also call an orcalize to check just after the voting deadline and 
        // declare the winner
        // and send all the ethere collected by the contract to the winner 
        
        if (oraclize_getPrice("WolframAlpha") > paidToPerformOrcalize) {
            emit LogNewOraclizeQuery("Oraclize query was NOT sent, please add some ETH to cover for the query fee!");
        } else {
            emit LogNewOraclizeQuery("Oraclize query was sent, standing by for the answer...");
            // increasing by 10 seconds
            oraclize_query((endDate + 10), "WolframAlpha", "random number between 0 and 9");
        }
    }

    // Fallback function
    function()
    public{
        revert();
    }
    
    function voteForPainting(address registererAddress, string memory _paintingURLSHA256) 
    public
    votingNotStartedYet
    votingDeadLineOver
    canVoteOnlyOnce(_paintingURLSHA256, msg.sender)
    alreadyVotedFor(_paintingURLSHA256, msg.sender)
    isValidHashOfPainter(registererAddress, _paintingURLSHA256)
    { 
        Applicant memory applicant = registeredApplicant[registererAddress];
        require(applicant.isPaintingValid, "painting not validated yet.");
        require(keccak256(applicant.paintingURLSHA256) == keccak256(_paintingURLSHA256), "not valid sha of url");
        
        votedFor[msg.sender] = bytes(_paintingURLSHA256);
        applicant.votesAttained += 1;
        registeredApplicant[registererAddress] = applicant;
        
        // checking and declaring winner
        checkOrDeclareWinner(applicant);
    }

    function whoIsWinner() 
    public
    view
    returns (
        string Name, 
        string Email, 
        address applicantAddress, 
        string paintingURL, 
        string paintingURLSHA256, 
        uint votesAttained, 
        bool isPaintingValid
    ) 
    {
        return (
            winnerDetails.Name,
            winnerDetails.Email,
            winnerDetails.applicantAddress,
            winnerDetails.paintingURL,
            winnerDetails.paintingURLSHA256,
            winnerDetails.votesAttained,
            winnerDetails.isPaintingValid
        );

    }
    
    function checkOrDeclareWinner(Applicant applicant) private {
        if(applicant.votesAttained > _highestVotes)   {
            _highestVotes = applicant.votesAttained;
            _winnerPaintingSHA256 = applicant.applicantAddress;
            _winnerDetails = applicant;
        } 
    }
}