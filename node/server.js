const express = require('express')
const faker = require('faker')
const app = express()
const port = 3000

const config = {
  host: 'db',
  user: 'user',
  password: 'pass',
  database: 'full_db',
}

const mysql = require('mysql')

const connection = mysql.createConnection(config)
console.log(connection)

app.get('/', (req, res) => {

  const name = faker.name.findName()
  console.log(name)
  connection.query(`INSERT INTO people (nome) VALUES ('${name}')`)
  connection.query(`SELECT nome FROM people`, (error, results, fields) => {
    console.log(results, fields, error)
    res.send(`
      <h1>Full cycle Rocks! Course FullCycle - Run refresh F5.</h1>
      <ul>
        ${results.map(result => `<li>${result.nome}</li>`).join('')}
      </ul>
    `)
  })
})

app.listen(port, () => {
  console.log('Up port in:', port);
})