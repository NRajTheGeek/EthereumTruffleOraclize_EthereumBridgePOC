# EthereumTruffleOraclize_EthereumBridgePOC

* _Pre-requisites:_
  to be edited...
  


### ganache-cli init command:

```ganache-cli -l 8000000000000 -p 9545 -e 1000000000000000```

### ethereum bridge init command

```node bridge -a 9 -H 127.0.0.1 -p 9545 --dev```

##### Problem: 

```

ABC is Art Gallery Company which announces their 1st Annual Online Painting
Competition.
Artists from around the world are called upon to make online submissions for their
paintings to be showcased.
They are looking for an Ethereum developer who can build a decentralized application.
Here is the application flow.
Stage 1 – Registration of Artist on to the Online Painting Competition Platform.
Artists will register with the following details
 Name
 Email Id
 Painting URL
Note – Artist will submit the Painting URL and has to pay the entry fee to register for the
competition (0.1 ETH). There will be a dead line for the registration of the Competition.
Stage 2 – Certify the painting
The gallery will validate the painting and would certify the paining.
Only paintings that were certified as valid by the gallery would enter the
competition.
Stage 3 – Vote for the Artists
When the Registration deadline is over, people can vote to the Painting that they like.
Note – There will be deadline for the voting.
Stage 4 – Declaring the Winner
Once the Voting deadline is crossed.
All the Ether that is collected as an Entry Fee (from all the registrations) will
automatically goes to the Artist whose painting has the highest votes.
Build a Node JS application
 Build a Node JS application that can fulfill the requirement above.
 For step 2, the person certifying will not manage his Ethereum account / Key pair
( No meta mask, there will only be one key pair at the gallery level ). The person

certifying would perform an action on the UI and that would trigger an API call (
EX: hostname.com/api/certify ). On the start of the node application, create a key
pair on the server side and use the private key to sign the “certify” request. use
web3.js in the backend to interact with Ethereum for this specific step.

Additional Information
 Check-in the code and any development artifacts in a GIT repository and share
the link to the repo.
 Add documentation architecture, details needed for us to clone the repo and run
the application.
 If things are not clear or ambiguous, feel free to make certain assumptions and
list down the assumptions you have made along the way.
 Optional: If you can send us the link to the running application that would be a
plus.
```
##### Assumptions

    All of the last dates are kept in minutes for easy tests and recreation of situations.

##### Plan Of Attack:

The most important and major issue in this was to build and deploy a smart contract that will and should fire a funcionality in our case the function of declaring a winner at a certain point in time which after crossing the last date of voting will declare a winner which is a problem as smart contracts are not designed to be able run them self automatically atleast not in ethereum. 

###### so then how we will solve this??

Well we have an Orcalize library to the rescue. This library allows us to call a functionality out side of our smart contract on or not on a specific time in future.

But for this we will be very much in need of a special type of ethereum node that can support the orcalize library. We could have gone with Ethereum Infura, but lets save that thing for some future production grade work. For now for our this POC lets say we want to use the local environment and hence we are using the 

Ethereum-bridge,
trufffle, and
ganache-cli

for this purpose.
