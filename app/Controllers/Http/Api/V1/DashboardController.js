'use strict';

const Database = use('Database');

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
      SELECT EXTRACT(MONTH FROM bc.date) AS short_month,
        TO_CHAR(bc.date::DATE, 'yyyy')::INTEGER AS short_year,
        COALESCE(SUM(CASE WHEN bcc.billing_cycles_type_id = 1 THEN bc.value ELSE 0 END), 0) AS revenue,
        COALESCE(SUM(CASE WHEN bcc.billing_cycles_type_id = 2 THEN bc.value ELSE 0 END)) AS expenses
      FROM billing_cycles bc
          INNER JOIN billing_cycles_categories bcc on bc.billing_cycles_category_id = bcc.id
      WHERE bc.date BETWEEN :startDate AND :endDate
      GROUP BY short_month, short_year
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
      SELECT SUM(i.value) AS value, it.name
      FROM investments i
        INNER JOIN investments_types it on i.investments_type_id = it.id
      WHERE i.date BETWEEN :startDate AND :endDate
      GROUP BY it.id
    `,
      { startDate, endDate }
    );
    return q.rows;
  }
}

module.exports = DashboardController;
