// --------------
// DO NOT MODIFY!
// --------------

import { createServer } from "node:http"
import { randomUUID } from "node:crypto"

const candidates = generateCandidates()

const clients = new Map()

const srv = createServer((req, res) => {
  const url = new URL(req.url, "http://localhost/")
  const path = `${req.method} ${url.pathname}`

  switch (path) {
  case "GET /":
    const auth = req.headers.authorization
    if (!auth) {
      respond(res, 400, "text/plain", "Missing Authorization header")
      break
    }

    const matches = auth.match(/^Bearer (.+)$/)
    if (!matches) {
      respond(res, 400, "text/plain", "Bad Authorization header")
      break
    }

    const [ _, token ] = matches
    if (!token || !clients.has(token)) {
      respond(res, 401, "text/plain", "Unauthorized")
      break
    }

    const offsetParsed = parseInt(url.searchParams.get('offset'))
    const offset = offsetParsed ? offsetParsed : 0

    const limit = 10

    const body = []
    body.push("<?xml version=\"1.0\" encoding=\"UTF-8\"?>")
    body.push("<response>")
    body.push("<candidates>")

    for (let i = 0; i < limit; i++) {
      if (offset + i >= candidates.length) break
      const c = candidates[offset + i]

      body.push("<candidate>")
      body.push(`<application_date>${c[0]}</application_date>`)
      body.push(`<name>${c[1]}</name>`)
      body.push(`<last_position>${c[2]}</last_position>`)
      body.push("</candidate>")
    }

    body.push("</candidates>")
    body.push(`<total>${candidates.length}</total>`)
    body.push("</response>")

    respond(res, 200, "application/xml", body.join("\n"))
    break
  case "GET /auth":
    const key = url.searchParams.get("key")
    if (!key) {
      respond(res, 400, "text/plain", "Missing key query param")
      break
    } else if (key !== process.env.SECRET_KEY) {
      respond(res, 401, "text/plain", "Unauthorized")
      break
    }

    const uuid = randomUUID()
    clients.set(uuid, true)
    respond(res, 200, "text/plain", uuid)
    break
  }
})

srv.listen("8080")

function respond(res, status, type, body) {
  res.writeHead(status, {
    "Content-Type": type,
  })

  res.write(body + "\n")
  res.end()
}

function generateCandidates() {
  const initTS = 1718367364000

  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
    "Hernandez",
    "Lopez",
    "Gonzalez",
    "Wilson",
    "Anderson",
    "Thomas",
    "Taylor",
    "Moore",
    "Jackson",
    "Martin",
    "Lee",
    "Perez",
    "Thompson",
    "White",
    "Harris",
    "Sanchez",
    "Clark",
    "Ramirez",
    "Lewis",
    "Robinson",
    "Walker",
    "Young",
    "Allen",
    "King",
    "Wright",
    "Scott",
    "Torres",
  ]

  const firstNames = [
    "Liam",
    "Noah",
    "Oliver",
    "Elijah",
    "William",
    "James",
    "Benjamin",
    "Lucas",
    "Henry",
    "Alexander",
    "Mason",
    "Michael",
    "Ethan",
    "Daniel",
    "Jacob",
    "Logan",
    "Jackson",
    "Levi",
    "Sebastian",
    "Mateo",
    "Olivia",
    "Emma",
    "Ava",
    "Charlotte",
    "Sophia",
    "Amelia",
    "Isabella",
    "Mia",
    "Evelyn",
    "Harper",
    "Camila",
    "Gianna",
    "Abigail",
    "Luna",
    "Ella",
    "Elizabeth",
    "Sofia",
    "Emily",
    "Avery",
    "Mila",
    "Scarlett",
    "Eleanor",
    "Madison",
    "Layla",
    "Penelope",
    "Aria",
  ]

  const seniorities = [
    "Junior ",
    "",
    "Senior ",
    "Lead ",
  ]

  const titles = [
    "Full-Stack Developer",
    "Front-End Developer",
    "JavaScript Developer",
    "React Developer",
    "Svelte Developer",
    "PHP Developer",
    "Java Developer",
    "Go Developer",
    "Python Developer",
    ".NET Developer",
  ]

  const result = []
  for (let i = 0; i < 1000; i++) {
    const date = new Date(initTS - Math.floor(Math.random() * 14*24*3600*1000))

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const seniority = seniorities[Math.floor(Math.random() * seniorities.length)]
    const title = titles[Math.floor(Math.random() * titles.length)]

    result.push([ date.toISOString(), `${firstName} ${lastName}`, `${seniority}${title}` ])
  }
  return result
}
