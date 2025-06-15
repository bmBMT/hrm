const controller = require("../controllers/documents_pdf");

module.exports = (router) => {
  router.route("/documents_pdf").post(controller.create);
  router.route("/documents_pdf").get(controller.getAll);
};
