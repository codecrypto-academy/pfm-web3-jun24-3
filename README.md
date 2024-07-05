# TFM W3ETH G3

## Pre-Requisites

🟡 Node version 20
``` 
nvm install 20
nvm use 20
```

## BACK

curl -L https://foundry.paradigm.xyz | bash



## FRONT

```sh
cd front
npm install 
```

Note for Devs: At that point was needed downgrade ethers to that version

#### 🚂 Starting the front:

```sh
npm start
```


## TBD
General ReadMe
TBD

## DEPLOYMENT
Al the information related to front and back deployment could be find ind **README** file inside each corresponding folder


## UTILS
In the `./utils` directory, there is a script `generate_abi.js` that processes the contract name (without the `.sol` extension) to generate the ABI from Foundry's output directory. Ensure you build the foundry project beforehand. Then, move this generated json to `front/src/abi` directory.

To execute the `.js` scripts enter to that directory:
```bash
cd utils
```

execute the script
```bash
node generate_abi.js <contract_name_without_sol_extension>
```




