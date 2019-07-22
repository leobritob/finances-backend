'use strict'

/**
 * Resourceful controller for interacting with billingcycles
 */
class BillingCycleController {
  /**
   * Show a list of all billingcycles.
   * GET billingcycles
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new billingcycle.
   * GET billingcycles/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new billingcycle.
   * POST billingcycles
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single billingcycle.
   * GET billingcycles/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing billingcycle.
   * GET billingcycles/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update billingcycle details.
   * PUT or PATCH billingcycles/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a billingcycle with id.
   * DELETE billingcycles/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = BillingCycleController
