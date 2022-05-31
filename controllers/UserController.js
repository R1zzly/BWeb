// const UserModel = require("../models/USER");
// const passport = require("passport");
// const bcrypt = require('bcrypt');
//
// module.exports.getUsers = async (req,res)=> {
//     try {
//         const user = await UserModel.find();
//         res.json(user);
//     } catch(error) {
//         res.json(user);
//     }
// }
//
// module.exports.register = async (req, res)=> {
//     const body = req.body;
//
//     if (!(body.email && body.password)) {
//         return  res.status(201).render('results', {
//             info: `Data not formatted properly`
//         });
//     }
//
//     const user = new UserModel(body);
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(user.password, salt);
//     console.log(user);
//     user.save().then((doc) => res.status(201).render('results', {
//         info: `User registered successfully by email ${user.email}`
//     }));
// };
//
//
// // module.exports.login = async (req, res) => {
// //     const body = req.body;
// //
// //     const user = await UserModel.findOne({ email: body.email });
// //     if (user) {
// //         const validPassword = await bcrypt.compare(body.password, user.password);
// //         if (validPassword) {
// //             res.status(201).render('results', {
// //                 info: `User logged successfully by email ${user.email}.
// //                 Welcome ${user.firstName} ${user.lastName}`
// //             });
// //         } else {
// //             res.status(201).render('results', {
// //                 info: `Email or password is incorrect`
// //             });
// //         }
// //     } else {
// //         res.status(201).render('results', {
// //             info: `User does not exist`
// //         });
// //     }
// // }
