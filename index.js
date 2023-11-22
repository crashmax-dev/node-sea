async function bootstrap(userId = 1) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
  const user = await response.json()
  return `Hello, ${user.name}!`
}

bootstrap(process.argv[2])
  .then((res) => console.log(res))
  .catch(() => console.log('Failed to fetch user'))
