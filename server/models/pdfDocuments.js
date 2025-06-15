module.exports = (sequelize, Sequelize) => {
	return sequelize.define(
		"pdfDocuments",
		{
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			type: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					isIn: [["contract"]],
				},
			},
			employee_full_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			position: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			department: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			url: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			freezeTableName: true,
			timestamps: true,
		}
	);
};
