import knex from 'knex'

const db = knex({
  client: process.env.DB_TYPE,
  connection: {
    filename: process.env.DB_FILE,
  },
  useNullAsDefault: true,
})

const createTables = async () => {
  const likesTableExists = await db.schema.hasTable('likes')
  if (!likesTableExists) {
    await db.schema.createTable('likes', (table) => {
      table.increments('id').primary()
      table.string('objectId')
      table.string('userId')
      table.timestamps()
    })
  }
}

createTables()

export default db
