# ``Stake Sol Data Backend``

 Stake Sol Data Backend using to store stake sol data using sdk librarys in db
 
##  ```Application Configrations``` - 

* Node version should be v16.18.1

* Created .env and add as we are doing in .env.example file.

## ```Run Application``` - 
```js
 npm install
```

```js
 npm run dev
```


## ```Folder structure```

```
├── GUIDE.md
├── README.md
├── api
│   └── index.js
├── app.js
├── bin
│   └── www.js
├── config.js
├── constants
│   ├── global.js
│   └── public-key.js
├── cronjob
│   └── index.js
├── db
│   └── index.js
├── helpers
│   └── index.js
├── models
│   ├── apy-lst.model.js
│   ├── lst.historical.model.js
│   ├── lst.model.js
│   ├── model.helper.js
│   ├── score-lst.model.js
│   ├── staking.historical.model.js
│   ├── staking.model.js
│   ├── totalStaked-lst.model.js
│   ├── totalStakedUsd-lst.model.js
│   └── truePrice-lst.model.js
├── package-lock.json
├── package.json
├── public
│   └── favicon.ico
├── resources
│   ├── index.js
│   ├── lido-parse.js
│   ├── marinade-parse.js
│   └── stake-pool-parse.js
└── utils
    ├── apy-utils.js
    ├── global.js
    ├── historical.js
    ├── processor.js
    ├── response.js
    ├── staking.js
    ├── store-cronjob.js
    ├── token-prices.js
    └── util-helper.js
```

## ``How to add more tokens``

 - First add address in constant (/constants/public-key.js file).
   Then export in global.js file.

 - After In schema add more token in model.helper.js file.

 - Go to units folder and add token in every fields.