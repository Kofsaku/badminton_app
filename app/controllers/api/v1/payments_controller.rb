class Api::V1::PaymentsController < ApplicationController

  def charge
    begin
      card_number = params[:card_number]
      card_cvv = params[:card_cvv]
      card_month = params[:card_month]
      card_year = params[:card_year]
      card_name = 'Taro Yamada'
      amount = 1000
      token = Stripe::CreateTokenService.new(card_number, card_cvv, card_month, card_year,card_name).execute
      charge = Stripe::CreateChargeService.new(token.id, amount).execute
      render json: { status: charge.captured }
    rescue => e
      render json: { error: e.message }, status: 200
    end
  end

end

