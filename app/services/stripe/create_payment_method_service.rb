class Stripe::CreatePaymentMethodService
  attr_accessor :card_number, :card_cvv, :card_month, :card_year

  def initialize(card_number, card_cvv, card_month, card_year)
    @card_number = card_number
    @card_cvv = card_cvv
    @card_month = card_month
    @card_year = card_year
  end

  def execute
    Stripe::PaymentMethod.create(
      {
        type: 'card',
        card: {
          number: @card_number,
          exp_month: @card_month,
          exp_year: @card_year,
          cvc: @card_cvv,
        },
      }
    )
  end

end
