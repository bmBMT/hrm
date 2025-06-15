const role = require('./role');

module.exports = (sequelize, Sequelize) => {
	return sequelize.define(
		"employeeRequest",
		{
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			roleId: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			deadlineDate: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			comment: {
				type: Sequelize.STRING,
				defaultValue: null,
				allowNull: true,
			},
			status: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: "Pending",
				validate: {
					isIn: [["Pending", "Completed", "Expired"]],
				},
			},
			createdById: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			updatedById: {
				type: Sequelize.INTEGER,
				defaultValue: null,
				allowNull: true,
			}
		},
		{
			sequelize,
			freezeTableName: true,
			timestamps: true,
		}
	);
};
