## Quickstart

In order to run automation tests locally you’ll need these tools on your local machine:

- Git
- VS Code
- Node.js
- Docker Desktop - to run tests inside docker(optional)

## Installation

Clone the git project and install the npm dependencies

```sh
npm install
```

Install suported browsers dependencies

```sh
npx playwright install
```
## Run Tests

Run tests using npm scripts in package.json.
```sh
npm test
```
You can also run the tests inside Docker
```sh
docker build -t auto .
docker run auto npm test
```

NOTE: Tests are run using 4 browser instances in parallel and in headless mode by default. To see browser windows with test executing, set the env variable:
```sh
export HEADLESS=false
```

## Reporting

After test run the results can be found in /playwright-report folder. Just open index.html file to see execution steps and video files showing each test execution.
