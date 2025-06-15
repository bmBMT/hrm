const dayjs = require('dayjs');
const db = require("../../models");
const { default: document_templates } = require('../../templates/generator/document_templates');
const { generatePdfFromHbs } = require('../../templates/generator/generatePdfFromHbs');
require("dotenv").config();

exports.create = async (req, res) => {
  const {
    templateName,
    data
  } = req.body;

  try {
    const url = await generateContractPdf(data);
    const document = await db.pdfDocuments.create({
      type: templateName,
      employee_full_name: data.employee_full_name,
      position: data.position,
      department: data.department,
      url
    });

    res.status(201).json(document);
  } catch (error) {
    res.status(500).json('Error generating PDF: ' + error.message);
  }
};

exports.getAll = async (req, res) => {
  try {
    const data = await db.pdfDocuments.findAll();

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json('Error generating PDF: ' + error.message);
  }
};

const generateContractPdf = async (data) => {
  const company = await db.company.findByPk(1);

  const templateData = {
    ...data,
    start_day: dayjs(data.start_date).format('DD'),
    start_month: dayjs(data.start_date).format('MM'),
    start_year: dayjs(data.start_date).format('YYYY'),
    organization_name: company.companyName,
    workplace_address: company.streetAddress,
    employer_legal_address: company.streetAddress,
    employer_postal_address: company.streetAddress,
    employer_inn: company.inn,
    employer_kpp: company.kpp,
    employer_bank: company.bank,
    employer_account: company.account,
    employer_corr_account: company.corr_account,
    employer_bik: company.bik,
  }

  return await generatePdfFromHbs(document_templates.contract, templateData);
}