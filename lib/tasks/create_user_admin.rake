namespace :create_admin do
  desc "create acc role Admin"
  task create: :environment do
    user = User.find_or_initialize_by(email: 'admin@mail.com')
    user.password = 'admin@123'
    user.password_confirmation = 'admin@123'
    user.save!

    if user.profile.present?
      user.profile.update(role: 'Admin')
    else
      user.create_profile(role: 'Admin')
    end

    puts "User with email #{user.email} and role Admin has been created"
  end
end
