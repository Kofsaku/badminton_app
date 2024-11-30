# db/seeds.rb

# シード実行前にデータベースをクリーンアップ
TournamentPlayer.destroy_all
TournamentDivision.destroy_all
TournamentCategory.destroy_all
Tournament.destroy_all
User.destroy_all

# 種目リスト
event_types = [
  "男子シングルス個人戦", "女子シングルス個人戦", "男子ダブルス個人戦", "女子ダブルス個人戦",
  "混合ダブルス個人戦", "男子トリプル個人戦", "女子トリプル個人戦", "混合トリプル個人戦",
  "男子ダブルス団体戦", "女子ダブルス団体戦", "混合ダブルス団体戦",
  "男子シングルス・ダブルス団体戦", "女子シングルス・ダブルス団体戦", "混合シングルス・ダブルス団体戦",
  "男子トリプル団体戦", "女子トリプル団体戦", "混合トリプル団体戦"
]

# 大会運営者ユーザーを作成（重複チェックを含む）
puts "Creating tournament organizer..."

organizer = User.find_or_create_by!(
  email: "organizer@example.com"
) do |user|
  user.full_name = "大会運営者 太郎"
  user.password = "password"
end

# プレイヤーユーザーをエントリー用に作成
puts "Creating players..."

players = 10.times.map do |i|
  User.find_or_create_by!(
    email: "player#{i + 1}@example.com"
  ) do |user|
    user.full_name = "プレイヤー#{i + 1} 太郎"
    user.password = "password"
  end
end

# 大会の作成（大会運営者に紐づける）
puts "Creating tournaments with events and divisions..."

5.times do |i|
  tournament = Tournament.create!(
    name: "大会#{i + 1}",
    event_date: Date.today + i.days,
    registeration_time: "10:00",
    organization_name: "バドミントン協会",
    user: organizer
  )

  # 大会にランダムな種目を追加
  event_types.sample(3).each do |event_name|
    event = TournamentCategory.create!(
      tournament: tournament,
      category_type: event_name,
      is_league: [true, false].sample,
      is_tournament: [true, false].sample,
      division_name_type: "部門"
    )

    # 部（ディビジョン）の追加
    if event.persisted?
      rand(1..3).times do
        TournamentDivision.create!(
          division: "Division #{rand(1..50)}",
          participants_limit: rand(4..16),
          pairs_limit: rand(2..8),
          trios_limit: rand(1..4),
          tournament_category_id: event.id
        )
      end
    else
      puts "Event creation failed for tournament: #{tournament.name}"
    end
  end
end

# プレイヤーのエントリー（大会と紐付け）
puts "Registering players in tournaments..."

tournaments = Tournament.all
players.each do |player|
  tournament = tournaments.sample
  TournamentPlayer.create!(
    user: player,
    tournament: tournament,
    status: "registered"
  )
end

puts "Seeding completed!"
