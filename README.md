# Single executable applications

> Node.js supports the creation of [single executable applications](https://github.com/nodejs/single-executable) by allowing the injection of a blob prepared by Node.js, which can contain a bundled script, into the node binary. During start up, the program checks if anything has been injected. If the blob is found, it executes the script in the blob. Otherwise Node.js operates as it normally does.

> [!NOTE]
> The single executable application feature currently only supports running a single embedded script using the [CommonJS](https://nodejs.org/api/modules.html#modules-commonjs-modules) module system.

> [!WARNING]
> This guide to work in Linux, if you need to build an application for another platform (Windows, macOS), you should [read this](https://nodejs.org/api/single-executable-applications.html).

1. Create a JavaScript file:

```js
// index.js
console.log(`Hello, ${process.argv[2]}!`)
```

2. Create a configuration file building a blob that can be injected into the single executable application:

```json
// sea-config.json
{
  "main": "index.js",
  "output": "sea-prep.blob"
}
```

3. Generate the blob to be injected:

```bash
node --experimental-sea-config sea-config.json
```

4. Create a copy of the node executable and name it according to your needs:

```bash
cp $(command -v node) bin
```

5. Inject the blob into the copied binary by running postject with the following options:

```bash
npx postject bin NODE_SEA_BLOB sea-prep.blob --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2
```

6. Run the binary:

```bash
./bin world
Hello, world!
```
