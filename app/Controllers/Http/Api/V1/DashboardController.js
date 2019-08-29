'use strict';

const Database = use('Database');

class DashboardController {
  async general() {
    const q = await Database.raw(`
      SELECT
        COALESCE(SUM(CASE WHEN bcc.billing_cycles_type_id = 1 THEN bc.value ELSE 0 END), 0) AS revenue,
        COALESCE(SUM(CASE WHEN bcc.billing_cycles_type_id = 2 THEN bc.value ELSE 0 END), 0) AS expenses,
        (COALESCE(SUM(CASE WHEN bcc.billing_cycles_type_id = 1 THEN bc.value ELSE 0 END), 0) -
        (
          (SELECT COALESCE(SUM(i.value), 0) AS investments FROM investments i) +
          COALESCE(SUM(CASE WHEN bcc.billing_cycles_type_id = 2 THEN bc.value ELSE 0 END), 0))
        ) AS net_revenue,
        (SELECT COALESCE(SUM(i.value), 0) AS investments FROM investments i) AS investments
      FROM billing_cycles bc
        INNER JOIN billing_cycles_categories bcc on bc.billing_cycles_category_id = bcc.id
  `);
    return q.rows[0];
  }

  async generalWithMonths() {
    const q = await Database.raw(
      `
      SELECT TRIM(TO_CHAR(bc.date::DATE, 'Month')) AS short_month,
        TO_CHAR(bc.date::DATE, 'yyyy')::INTEGER AS short_year,
        COALESCE(SUM(CASE WHEN bcc.billing_cycles_type_id = 1 THEN bc.value ELSE 0 END), 0) AS revenue,
        COALESCE(SUM(CASE WHEN bcc.billing_cycles_type_id = 2 THEN bc.value ELSE 0 END)) AS expenses
      FROM billing_cycles bc
          INNER JOIN billing_cycles_categories bcc on bc.billing_cycles_category_id = bcc.id
      WHERE bc.date BETWEEN ? AND ?
      GROUP BY short_month, short_year
      ORDER BY short_year DESC, short_month DESC
    `,
      [`${new Date().getFullYear()}-01-01`, `${new Date().getFullYear()}-12-31`]
    );
    return q.rows;
  }

  async generalInvestments() {
    const q = await Database.raw(`
      SELECT SUM(i.value) AS value, it.name
      FROM investments i
        INNER JOIN investments_types it on i.investments_type_id = it.id
      GROUP BY it.id
    `);
    return q.rows;
  }
}

module.exports = DashboardController;
