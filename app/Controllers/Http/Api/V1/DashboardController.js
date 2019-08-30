'use strict';

const Database = use('Database');
const PDFMake = use('pdfmake');
const getStream = use('get-stream');

class DashboardController {
  async general({ request }) {
    const query = request.all();

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    const startDate = query.start_date || `${year}-${month}-01`;
    const endDate = query.end_date || `${year}-${month}-${today.getDate()}`;

    const q = await Database.raw(
      `
      SELECT COALESCE(SUM(CASE WHEN bcc.billing_cycles_type_id = 1 THEN bc.value ELSE 0 END), 0) AS revenue,
        COALESCE(SUM(CASE WHEN bcc.billing_cycles_type_id = 2 THEN bc.value ELSE 0 END), 0) AS expenses,
        (
          COALESCE(SUM(CASE WHEN bcc.billing_cycles_type_id = 1 THEN bc.value ELSE 0 END), 0) -
          (
            (SELECT COALESCE(SUM(i.value), 0) AS investments FROM investments i WHERE i.date BETWEEN :startDate AND :endDate) +
            COALESCE(SUM(CASE WHEN bcc.billing_cycles_type_id = 2 THEN bc.value ELSE 0 END), 0)
          )
        ) AS net_revenue,
        (SELECT COALESCE(SUM(i.value), 0) AS investments FROM investments i WHERE i.date BETWEEN :startDate AND :endDate) AS investments
      FROM billing_cycles bc
        INNER JOIN billing_cycles_categories bcc on bc.billing_cycles_category_id = bcc.id
      WHERE
        bc.date BETWEEN :startDate AND :endDate;
  `,
      { startDate, endDate }
    );
    return q.rows[0];
  }

  async generalWithMonths({ request }) {
    const query = request.all();

    const year = new Date().getFullYear();
    const startDate = query.start_date || `${year}-01-01`;
    const endDate = query.end_date || `${year}-12-31`;

    const q = await Database.raw(
      `
      SELECT
        EXTRACT(MONTH FROM bc.date) AS short_month,
        TO_CHAR(bc.date::DATE, 'Mon') AS month_label,
        TO_CHAR(bc.date::DATE, 'yyyy')::INTEGER AS short_year,
        COALESCE(SUM(CASE WHEN bcc.billing_cycles_type_id = 1 THEN bc.value ELSE 0 END), 0) AS revenue,
        COALESCE(SUM(CASE WHEN bcc.billing_cycles_type_id = 2 THEN bc.value ELSE 0 END)) AS expenses
      FROM billing_cycles bc
        INNER JOIN billing_cycles_categories bcc on bc.billing_cycles_category_id = bcc.id
      WHERE bc.date BETWEEN :startDate AND :endDate
      GROUP BY short_month, short_year, month_label
      ORDER BY short_year DESC, short_month
    `,
      { startDate, endDate }
    );
    return q.rows;
  }

  async generalInvestments({ request }) {
    const query = request.all();

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    const startDate = query.start_date || `${year}-${month}-01`;
    const endDate = query.end_date || `${year}-${month}-${today.getDate()}`;

    const q = await Database.raw(
      `
      SELECT SUM(i.value) AS value, it.name, it.color
      FROM investments i
        INNER JOIN investments_types it on i.investments_type_id = it.id
      WHERE i.date BETWEEN :startDate AND :endDate
      GROUP BY it.id
    `,
      { startDate, endDate }
    );
    return q.rows;
  }

  async generalPdf({ request, response }) {
    const query = request.all();

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    const startDate = query.start_date || `${year}-${month}-01`;
    const endDate = query.end_date || `${year}-${month}-${today.getDate()}`;

    const q = await Database.raw(
      `
      SELECT
        bc.description,
        bcc.name AS category,
        bct.name AS type,
        TO_CHAR(bc.date, 'dd/mm/yyyy') AS date,
        CONCAT('R$ ', bc.value) AS value
      FROM billing_cycles bc
        INNER JOIN billing_cycles_categories bcc on bc.billing_cycles_category_id = bcc.id
        INNER JOIN billing_cycles_types bct on bcc.billing_cycles_type_id = bct.id
      WHERE
        bc.date BETWEEN :startDate AND :endDate ORDER BY bc.date
    `,
      { startDate, endDate }
    );

    const queryTotal = await Database.raw(
      `
      SELECT (
        COALESCE(SUM(CASE WHEN bct.name = 'Receitas' THEN bc.value ELSE 0 END), 0) -
        COALESCE(SUM(CASE WHEN bct.name = 'Despesas' THEN bc.value ELSE 0 END), 0)
      ) AS total
      FROM billing_cycles bc
        INNER JOIN billing_cycles_categories bcc on bc.billing_cycles_category_id = bcc.id
        INNER JOIN billing_cycles_types bct on bcc.billing_cycles_type_id = bct.id
      WHERE bc.date BETWEEN :startDate AND :endDate
      `,
      { startDate, endDate }
    );

    let body = [];

    if (q.rows && q.rows.length > 0) {
      q.rows.forEach(billingCycle => {
        let billingCycleValue = billingCycle.value;
        if (billingCycle.type === 'Despesas') {
          billingCycleValue = `- ${billingCycle.value}`;
        }

        body.push([
          { text: billingCycle.description, style: 'tableColumnText' },
          { text: billingCycle.type, style: 'tableColumnText' },
          { text: billingCycle.category, style: 'tableColumnText' },
          { text: billingCycle.date, style: 'tableColumnText' },
          { text: billingCycleValue, style: 'tableColumnValue' }
        ]);
      });
    }

    const pdfConfig = {
      info: {
        title: 'Relatório FinancesApp',
        author: 'Leonardo Brito Bittencourt - www.leonardobrito.com.br',
        subject: 'Relatório FinancesApp'
      },
      defaultStyle: { font: 'Helvetica' },
      content: [
        { text: 'Relatório FinancesApp', style: 'title', margin: [30, 30, 30, 30, 30] },
        {
          layout: 'lightHorizontalLines',
          table: {
            headerRows: 1,
            widths: ['*', 60, 100, 55, 70],
            body: [
              [
                { text: 'Descrição', style: 'tableHeaderText' },
                { text: 'Tipo', style: 'tableHeaderText' },
                { text: 'Categoria', style: 'tableHeaderText' },
                { text: 'Data', style: 'tableHeaderText' },
                { text: 'Valor (R$)', style: 'tableHeaderRight' }
              ],
              ...body
            ]
          }
        },
        {
          layout: 'lightHorizontalLines',
          table: {
            headerRows: 1,
            widths: ['*', 70],
            body: [
              [
                { text: 'SubTotal', style: 'tableColumnText' },
                { text: `R$ ${queryTotal.rows[0].total}`, style: 'tableColumnValue' }
              ]
            ]
          }
        }
      ],
      styles: {
        title: { fontSize: 18, bold: true, alignment: 'center' },
        tableHeaderText: { fontSize: 10, bold: true, alignment: 'left' },
        tableHeaderRight: { fontSize: 10, bold: true, alignment: 'right' },
        tableColumnText: { fontSize: 10 },
        tableColumnValue: { fontSize: 10, alignment: 'right' }
      },
      footer: function(currentPage, pageCount) {
        return {
          margin: 10,
          columns: [
            {
              width: 50,
              text: ''
            },
            {
              width: '*',
              fontSize: 9,
              text: `FinancesApp \u00A9 ${new Date().getFullYear()} - Todos os direitos reservados`,
              alignment: 'center'
            },
            {
              width: 50,
              fontSize: 9,
              text: `${currentPage.toString()} de ${pageCount}`,
              alignment: 'left'
            }
          ]
        };
      }
    };

    const fonts = {
      Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique'
      }
    };

    const Printer = new PDFMake(fonts);
    const doc = Printer.createPdfKitDocument(pdfConfig);
    doc.end();

    const fileContent = await getStream.buffer(doc);
    return response.send(fileContent);
  }
}

module.exports = DashboardController;
