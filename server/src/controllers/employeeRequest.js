const { getAuthUser } = require('../../config/authJwt');
const db = require("../../models");
require("dotenv").config();

exports.create = async (req, res) => {
	const {
		roleId,
		deadlineDate,
		comment,
		empId
	} = req.body;

	try {
		const newRequest = await db.employeeRequest.create({
			roleId,
			deadlineDate,
			comment,
			createdById: empId,
		});

		res.status(201).json(newRequest);
	} catch (err) {
		res.status(500).send(err);
	}
};

exports.getAll = async (req, res) => {
	const requests = await db.employeeRequest.findAll();

	res.status(200).json(requests);
};

exports.update = async (req, res) => {
	const id = req.params.id;
	const {
		roleId,
		deadlineDate,
		comment,
		empId
	} = req.body;

	try {
		const request = await db.employeeRequest.findByPk(id);
		if (!request) {
			return res.status(404).send("Request not found");
		}

		request.roleId = roleId;
		request.deadlineDate = deadlineDate;
		request.comment = comment;
		request.updatedById = empId;

		await request.save();

		res.status(200).json(request);
	} catch (err) {
		res.status(500).send(err);
	}
}

exports.delete = async (req, res) => {
	const id = req.params.id;

	try {
		const request = await db.employeeRequest.findByPk(id);
		if (!request) {
			return res.status(404).send("Request not found");
		}

		await request.destroy();

		res.status(200).send("Request deleted successfully");
	} catch (err) {
		res.status(500).send(err);
	}
};

exports.complete = async (req, res) => {
	const id = req.params.id;
	const token = req.cookies.jwt;
	const userId = getAuthUser(token);

	try {
		const request = await db.employeeRequest.findByPk(id);
		if (!request) {
			return res.status(404).send("Request not found");
		}

		request.status = "Completed";
		request.updatedById = userId;

		await request.save();

		res.status(200).json(request);
	} catch (err) {
		res.status(500).send(err);
	}
}

