// SPDX-License-Identifier: MIT

// pragma solidity 0.8.7;
pragma solidity >=0.8.0 <0.9.0;

contract SimpleStorage {
    struct User {
        string userId;
        uint256 points;
    }

    mapping(string => User) users;
    uint public numUsers;
    string[] userIds;
    mapping(uint256 => uint256) public userIdToPoints;

    function addUser(string memory userId, uint points) public {
        if (bytes(users[userId].userId).length == 0) {
            users[userId] = User(userId, points);
            numUsers++;
            userIds.push(userId);
        } else {
            users[userId].points = points;
        }
    }

    function getUsers() public view returns (User[] memory) {
        User[] memory allUsers = new User[](numUsers);
        uint index = 0;
        for (uint i = 0; i < numUsers; i++) {
            User storage user = users[userIds[i]];
            allUsers[index] = user;
            index++;
        }
        return allUsers;
    }

    function getUser(string memory userId) public view returns (uint256) {
        return users[userId].points;
    }

    function updateUserPoints(
        string memory userId,
        uint256 points
    ) public returns (bool) {
        // Check if user exists
        if (users[userId].points == 0) {
            // User does not exist, return false
            return false;
        } else {
            // Update user points and return true
            users[userId].points = points;
            return true;
        }
    }
}
