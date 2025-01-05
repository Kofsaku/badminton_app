class Stripe::CreateChargeService
  attr_accessor :payment_token_id, :amount

  def initialize(payment_token_id, amount)
    @payment_token_id = payment_token_id
    @amount = amount
  end

  def execute
      Stripe::Charge.create({
                              amount: @amount.round(),
                              currency: 'jpy',
                              source: @payment_token_id,
                              # application_fee_amount: application_fee_amount, #commission fees
                            })
  end

end
