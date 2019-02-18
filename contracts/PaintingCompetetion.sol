pragma solidity ^0.4.17;

import  "./PaintingRegisteration.sol";
import "./PaintingVote.sol";

contract PaintingCompetetion is PaintingRegisteration, PaintingVote {
    
    constructor() public {
        owner = msg.sender; 
    } 
    
    function getBalance() 
    public 
    view 
    returns(uint){
        return address(this).balance;
    } 
}