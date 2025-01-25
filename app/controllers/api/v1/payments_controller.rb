class Api::V1::PaymentsController < ApplicationController

  def charge
    begin
      card_number = params[:card_number]
      card_cvv = params[:card_cvv]
      card_month = params[:card_month]
      card_year = params[:card_year]
      amount = 1000
      application_fee_amount = 10

      # supplier_connect_account_id = ENV['STIPE_CONNECTED_ACCOUNT']
      # payment_method = Stripe::CreatePaymentMethodService.new(card_number, card_cvv, card_month, card_year).execute
      # payment_intent = Stripe::CreatePaymentIntentService.new(payment_method.id, amount, application_fee_amount, supplier_connect_account_id).execute
      # render json: { status: payment_intent.status }

      render json: { status: :ok }
    rescue => e
      render json: { error: e.message }, status: 200
    end
  end

end

