const User = require("../models/user");

/**
 * Create user 
 */
exports.create = (req, res) => {

    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({ message: "Required field can not be empty" });
    }
    //Create user from req body
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        gender: req.body.gender,
        age: req.body.age,
        role: req.body.role
    });

    // save user
    user.save().then(data => {
        res.status(201).json(data);
    }).catch(err => {
        console.log(err.message);
        res.status(500).json({ message: err.error || "Some error occurred while creating new User." });
    });

};

/**
 * Udated user 
 * 
 */
 exports.update=(req,res)=>{
     
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json();
    }
    User.findByIdAndUpdate(req.params.id,req.body,{new :true}).then(data=>{
      if(!data){
          return res.status(404).json({ message: `User not found with id  ${req.params.id}`});
      }
      res.status(200).json(data);
    }).catch(err=>{
     console.log(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: `User not found with id  ${req.params.id}` });

        }
        res.status(500).json({ message: "error occurred while updating user with id : " + req.params.id });


    });
 };


/**
 * Find all Users
 */
exports.findAll = (req, res) => {
     var filter={};
    if(req.query.role){
        filter.role=req.query.role;
       }

    if(req.query.gender){
        filter.gender=req.query.gender;
      }


    User.find(filter).then(data => {
        res.status(200).json(data);
    }).catch(err => {
        console.log(err.message);
        res.status(500).json({ message: err.error || "Some error occurred while retrieving users." });
    });
};

/**
 * Method for find user by id 
 */

exports.findOne = (req, res) => {
    User.findById(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).json({ message: `User not found with id  ${req.params.id}` });
            }
            res.status(200).json(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({ message: `User not found with id  ${req.params.id}` });

            }
            res.status(500).json({ message: `error occurred while retrieving user with id :  ${req.params.id}` });
        });

};

/**
 * Delete a user with the specified id in the request
 */
 exports.delete=(req,res)=>{
  
    User.findByIdAndDelete(req.params.id).then(data => {
        if (!data) {
            return res.status(404).json({ message: `User not found with id  ${req.params.id}` });
        }
        res.status(204).json({ message: "User deleted successfully !"});
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: `User not found with id  ${req.params.id}` });
        }
        res.status(500).json({ message: `error occurred while retrieving user with id :  ${req.params.id}` });
    });

 };