

const api = (ACCOUNT_ID: string):string => {
    return  `POST https://merchantapi.googleapis.com/datasources/v1/accounts/${ACCOUNT_ID}/dataSources`
}