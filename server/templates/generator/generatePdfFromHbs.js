import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import handlebars from 'handlebars';
import puppeteer from 'puppeteer';
import dayjs from 'dayjs';
import 'dayjs/locale/ru.js';

dayjs.locale('ru');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function generatePdfFromHbs(
	templateName,
	data
) {
	const templatePath = join(__dirname, 'templates', `${templateName}.hbs`);

	const tamplateData = {
		...data,
		currentYear: dayjs().format('YYYY'),
		currentDay: dayjs().format('DD'),
		currentMonth: dayjs().format('MMMM'),
	}

	try {
		const templateHtml = await readFile(templatePath, 'utf8');
		const html = handlebars.compile(templateHtml)(tamplateData);

		const browser = await puppeteer.launch({
			args: ['--no-sandbox', '--disable-setuid-sandbox'],
			executablePath: '/usr/bin/chromium-browser',
			ignoreDefaultArgs: ["--disable-extensions"],
		});

		const page = await browser.newPage();
		await page.goto(`file://${templatePath}`);
		await page.setContent(html, { waitUntil: 'networkidle0' });

		const pathPdf = `static/pdf/${dayjs().format('DD.MM.YYYY_HH:mm')}_ww.pdf`;
		await page.pdf({
			path: pathPdf,
			format: 'A4',
			printBackground: true,
			displayHeaderFooter: true,
			footerTemplate: "<div style=\"text-align: left;width: 297mm;font-size: 10px;\"><span style=\"margin-left: 1.5cm\"><span class=\"pageNumber\"></span> / <span class=\"totalPages\"></span></span></div>",
		});
		await browser.close();

		return pathPdf;
	} catch (error) {
		console.error('Ошибка при генерации PDF:', error);
		throw error;
	}
}