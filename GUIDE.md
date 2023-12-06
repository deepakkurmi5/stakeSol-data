## Guides

### Run application

1. Node version should be v16.18.1

2. Created .env and add as we are doing in .env.example file.

3. Install dependancies using -> npm install

4. Run application for develoment -> npm run dev

### How to add more tokens 

 - First add address in constant (/constants/public-key.js file).
   Then export in global.js file.

 - After In schema add more token in model.helper.js file.

 - Go to units folder and add token in every fields.