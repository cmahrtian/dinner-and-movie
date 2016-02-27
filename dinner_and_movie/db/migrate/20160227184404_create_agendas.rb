class CreateAgendas < ActiveRecord::Migration
  def change
    create_table :agendas do |t|
      t.string :trip_name

      t.timestamps null: false
    end
  end
end
