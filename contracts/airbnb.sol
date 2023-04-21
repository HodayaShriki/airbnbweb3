// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;


contract Airbnb {
        struct Renter {
         uint balance;
     }
    
    mapping (address => Renter) public renters;
    address payable public owner;
    uint public ownerBalance;
    
    event RentPaid(address indexed renter, uint amount);
    
    constructor() {
        owner = payable(msg.sender);
    }
    
    function payForRent() public payable {
        require(msg.value >= 1 ether, "Insufficient amount");
        
        renters[msg.sender].balance -= 1 ether;
       
        ownerBalance += 1 ether;
       
        emit RentPaid(msg.sender, 1 ether);
    } 
}
