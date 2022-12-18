const db = require("../models");
const Room = db.rooms;
const Op = db.Sequelize.Op;

// Create and Save a new Room
exports.create = (req, res) => {
    // Validate request
    if (!req.body.category) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }

    // Create a Room
    const obj = {
        category: req.body.category,
        max_count: req.body.max_count,
        image: req.body.image,
        price: req.body.price,
        description: req.body.description,
        hotel_id: req.body.hotel_id,
    };

    // Save Room in the database
    Room.create(obj)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Seat.",
            });
        });
};

// Retrieve all Rooms from the database.
exports.findAll = (req, res) => {
    if (req.query.hasOwnProperty(`category`) && !req.query.category) {
        res.status(404).send({
            message: `Cannot find Hotels with empty name.`,
        });
        return;
    }

    const hotel_id = req.query.hotel_id;
    var condition = hotel_id ? { hotel_id: { [Op.like]: `%${hotel_id}%` } } : null;

    Room.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Hotels.",
            });
        });
};

// Find a single Room with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Room.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Seat with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Seat with id=" + id,
            });
        });
};

// Update a Room by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Room.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Seat was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Seat with id=${id}. Maybe Seat was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Seat with id=" + id,
            });
        });
};

// Delete a Room with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Room.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Seat was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Seat with id=${id}. Maybe Seat was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Seat with id=" + id,
            });
        });
};

// Delete all Room from the database.
exports.deleteAll = (req, res) => {
    Room.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({ message: `${nums} Seats were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Seats.",
            });
        });
};

// Find Hotel by hotels
exports.findAllByHotels = (req, res) => {
    const hotel_id = req.params.hotel_id;

    Room.findAll({ where: { hotel_id: hotel_id } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Hotels.",
            });
        });
};
