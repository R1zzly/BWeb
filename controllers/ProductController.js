const productModel = require('../models/productModel');

exports.create = async (req, res) => {
    if (!req.body.name && !req.body.price && !req.body.imageURL) {
        res.status(400).send({ message: "Content can not be empty!" });
    }

    const product = new productModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        imageURL: req.body.imageURL
    });

    await product.save().then(data => {
        res.send({
            message: "Product created successfully!!",
            product: data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user"
        });
    });
};



exports.findAll = async (req, res) => {
    try {
        const products = await productModel.find();
        res.render('shop', {product: products})
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};



exports.findOne = async (req, res) => {
    try {
        const product = await productModel.findOne({name: req.query.name}).exec();
        res.status(200).json(product);

    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};




exports.update = async (req, res) => {
    if (!req.body.newName && !req.body.newPrice && !req.body.newImageURL && !req.body.newDescription) {
        res.status(400).send({ message: "Content can not be empty!" });
    }

    const query = req.body.oldName;

    await productModel.findOneAndUpdate({name: query}, {
        name: req.body.newName,
        description: req.body.newDescription,
        price: req.body.newPrice,
        imageURL: req.body.newImageURL
    }).then(data => {
        console.log(data)
        if (!data) {
            res.status(404).send({message: `User not found.`});
        }else{
            res.send({ message: "User updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
};
