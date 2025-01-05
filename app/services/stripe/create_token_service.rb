class Stripe::CreateTokenService
  attr_accessor :card_number, :card_cvv, :card_month, :card_year, :card_name

  def initialize(card_number, card_cvv, card_month, card_year, card_name)
    @card_number = card_number
    @card_cvv = card_cvv
    @card_month = card_month
    @card_year = card_year
    @card_name = card_name
  end

  def execute
      Stripe::Token.create({
                             card: {
                               number: @card_number,
                               name: @card_name,
                               exp_month: @card_month,
                               exp_year: @card_year,
                               cvc: @card_cvv,
                             },
                           })
  end

end
