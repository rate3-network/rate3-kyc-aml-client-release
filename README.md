# Rate3 KYC/AML Frontend

### Getting started
``npm install`` - install node modules


### Environment variables

You can use different environment variables.

`.env.stage` - development mode config
`.env.prod` - build config

To access values inside application call `console.log(process.env)`.


### Scripts

``npm start`` - start application in development mode

``npm build`` - build application into `/dist` directory

``npm build:clean`` - remove prev `/dist` and build application

``npm serve`` - serve `/dist` directory. Requires build application before run

``npm lint:js`` - run eslint

``npm lint:css`` - run stylelint

``npm lint:all`` - run eslint and stylelint concurrently

``npm test`` - run jest

``npm test:coverage`` - jest coverage

``npm test:watch`` - jest in watch mode

``npm analyze`` - analyze webpack bundle
