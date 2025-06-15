const controller = require("../controllers/employeeRequest");
const { requireAuth } = require("../../config/authJwt");

module.exports = (router) => {
	router.post('/employee-requests', requireAuth, controller.create);
	router.get('/employee-requests', requireAuth, controller.getAll);
	router.patch('/employee-requests/:id', requireAuth, controller.update);
	router.delete('/employee-requests/:id', requireAuth, controller.delete);
	router.patch('/employee-requests/complete/:id', requireAuth, controller.complete);
};
