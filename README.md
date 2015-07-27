# Setup
After cloning this repository, follow the instructions below to setup Phourus locally.

1. Install NodeJS 0.12.* (or nvm for easy Node version management)
2. Install MariaSQL
3. Import /api/db/phourus-dev.sql into MariaSQL for test data
4. Run `npm install` to install NodeJS dependencies
5. Run `npm start` to start Express server
6. Navigate to http://localhost:3000 to view local version

```bash
# Start web server at http://localhost:3000
npm start

# Begin building (will watch for changes)
npm run build

# Run tests
npm test
```

# Dependencies
All dependencies can be found in package.json, but are listed here for usage

HIGH LEVEL
- **express** for serving static assets and rendering React isomorphically
- **sequelize** ORM for SQL
- **mariasql** as the MariaSQL/Sequelize adapter
- **LESS** for CSS transpilation
- **convict** for configuration management

BUILD
- **gulp** for task management/build process
- **browserify** for packaging Node app for the browser
- **babel** for ES6 transpilation and JSX support

EXPRESS
- **express-jwt** for JSON Web Token support
- **body-parser** for handling POST/PUT data in JSON format

CLIENT
- **react-router** for React routing
- **reflux** for React/flux architecture
- **react-quill** for rich text editing
- **react-infinite-scroll** for the infinite scroll feature on the Stream page
- **localStorage** for storing JSON Web Tokens client-side
- **moment** for date formatting
- **numeral** for number formatting

CDN
- **FontAwesome** for icons
- **Google Fonts** for custom fonts
- **Google Maps** for maps
- **MarkerClusterer** for map marker clustering
- **Google Analytics** for analytics
- **d3/c3** for chart components and visualizations

TESTING
- **jest**

# Contributing
Commit only to the `dev` branch. Tests not required.

# Requirements
- [Stream Page](/docs/requirements/stream.md)
- [Editor Page](/docs/requirements/editor.md)
- [Account Page](/docs/requirements/account.md)
- [Profile Page](/docs/requirements/profile.md)
- [Admin Page](/docs/requirements/admin.md)
- [Authentication](/docs/requirements/authentication.md)

# API
[Click here for REST API details](/docs/api.md)

# Deploy
Ensure EB environment exists
Ensure RDS Instance grants access
- Check assigned Security Group allows from EC2 IP
eb create app-name -c cname
eb deploy
aws deploy push --application-name phourus-staging --s3-location s3://phourus-staging/deployments
PHOURUS_PORT=8081 PHOURUS_DB_HOST=staging.c27rpgejeaxu.us-west-2.rds.amazonaws.com PHOURUS_DB_PORT=3306 PHOURUS_DB_NAME=staging PHOURUS_DB_USER=phourus PHOURUS_APP_URL=http://phourus-staging-p9upkev2uc.elasticbeanstalk.com/ PHOURUS_DB_PASS=

PHOURUS_PORT=8081 PHOURUS_DB_HOST=phourus.c27rpgejeaxu.us-west-2.rds.amazonaws.com PHOURUS_DB_PORT=3306 PHOURUS_DB_NAME=phourus PHOURUS_DB_USER=phourus PHOURUS_APP_URL=http://phourus.elasticbeanstalk.com/ PHOURUS_DB_PASS=

# DB Dump & Deploy
```bash
mysqldump -u root -p phourus-dev > phourus-dev.sql

# Deploy
mysql -u root -p -h hostname phourus < phourus.sql

mysql -u phourus -p -h staging.c27rpgejeaxu.us-west-2.rds.amazonaws.com staging < phourus-dev.sql
mysql -u phourus -p -h phourus.c27rpgejeaxu.us-west-2.rds.amazonaws.com phourus < phourus-dev.sql
```
