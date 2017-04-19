var mongoose = require('mongoose');
var UserModel = mongoose.model('UserModel');

var chalk = require('chalk');
var app = require('../app');

exports.showAll = function(req, res) {
    UserModel.find({}, function(err, userObj) {
        console.log(userObj);
        res.send(userObj)
    });
};

exports.insert = function(req, res) {
    var newuser = new UserModel();
    newuser.name = req.body.Name;
    newuser.email = req.body.Email;
    newuser.dob = req.body.DOB;
    newuser.age = req.body.Age;
    newuser.department = req.body.Department;
    newuser.gender = req.body.Gender;
    newuser.save(function(err, savedUser) {
        if (err) {
            res.status(400);
            res.send(err);
        } else {
            UserModel.find({}, function(err, userObj) {
                res.send(userObj)
            });
        }
    });
};

exports.update = function(req, res) {
    UserModel.update({ email: req.body.Email }, {
            $set: {
                name: req.body.Name,
                email: req.body.Email,
                dob: req.body.DOB,
                gender: req.body.Gender,
                age: req.body.Age,
                department: req.body.Department
            }
        }, { multi: false },
        function(err, obj) {
            if (err) {
                console.log("err");
                console.log(JSON.stringify(err));
                res.send("err");
            } else {
                UserModel.find({}, function(err, userObj) {
                    res.send(userObj)
                });
            }
        });
};

exports.delete = function(req, res) {
    UserModel.remove({ name: req.body.name }, function(err, obj) {
        if (err) {
            console.log("err");
            console.log(JSON.stringify(err));
            res.send("err");
        } else {
            UserModel.find({}, function(err, userObj) {
                res.send(userObj)
            });
        }
    });
}