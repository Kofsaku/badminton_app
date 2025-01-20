class Stripe::CreatePaymentIntentService
  attr_accessor :payment_method_id, :amount, :application_fee_amount, :supplier_connect_account_id

  def initialize(payment_method_id, amount, application_fee_amount, supplier_connect_account_id)
    @payment_method_id = payment_method_id
    @amount = amount
    @application_fee_amount = application_fee_amount
    @supplier_connect_account_id = supplier_connect_account_id
  end

  def execute
    Stripe::PaymentIntent.create(
      {
        amount: @amount,
        currency: 'jpy',
        confirm: true, # Stripe::PaymentIntent.create後にStripe::PaymentIntent.confirm（オーソリ確認）まで自動で実行する
        capture_method: 'automatic', # オーソリ確認後にキャプチャーを自動的に行わない
        application_fee_amount: @application_fee_amount,
        automatic_payment_methods: {enabled: true, allow_redirects: "never"},
        # payment_method_options: {
        #   card: {
        #     request_three_d_secure: 'any' # 3Dセキュアを必ずリクエストする
        #   }
        # },
        payment_method: @payment_method_id,
        # return_url: @callback_url, # 3Dセキュア認証完了後にリダイレクトされるURL
        transfer_data:{
          destination: @supplier_connect_account_id
        },
        # radar_options: {session: radar_session},
        # metadata: {
        #   ip: http_id,
        #   user_agent: http_user_agent,
        #   referrer: http_user_referrer,
        #   user_id: user_id,
        #   buyer_type: class_name,
        #   product_id: product_id,
        # }
      }
    )
  end

end
