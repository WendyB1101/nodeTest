/*
 Navicat Premium Dump Script

 Source Server         : my-node-project
 Source Server Type    : MongoDB
 Source Server Version : 80206 (8.2.6)
 Source Host           : localhost:27017
 Source Schema         : my-node-project

 Target Server Type    : MongoDB
 Target Server Version : 80206 (8.2.6)
 File Encoding         : 65001

 Date: 19/03/2026 21:34:13
*/


// ----------------------------
// Collection structure for users
// ----------------------------
db.getCollection("users").drop();
db.createCollection("users");
db.getCollection("users").createIndex({
    email: Int32("1")
}, {
    name: "email_1",
    background: true,
    unique: true
});

// ----------------------------
// Documents of users
// ----------------------------
db.getCollection("users").insert([ {
    _id: ObjectId("69bc393d0a66878d35a7ac5a"),
    fullName: "John Doe",
    birthDate: ISODate("1990-01-01T00:00:00.000Z"),
    email: "john@example.com",
    password: "$2b$10$QzIrc66Dxdl4Iu7PTK9see/Bc/ZqQ0EqMH7JH09fjfRndoubcafn6",
    role: "user",
    status: true,
    __v: Int32("0")
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("69bc3a5d0a66878d35a7ac5e"),
    fullName: "Regular User",
    birthDate: ISODate("1995-05-05T00:00:00.000Z"),
    email: "user@example.com",
    password: "$2b$10$gyGqc0LXdGRbzgqlWe5atuEnX67Y26TizPCvydDKyjGp8QvbY2xUi",
    role: "user",
    status: true,
    __v: Int32("0")
} ]);
