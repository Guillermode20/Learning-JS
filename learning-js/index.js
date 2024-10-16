// Live Currency Converter
// This program will convert a given amount of one currency to another currency using the latest exchange rates
// API provided completely for free, updated daily, by Fawaz Ahmed
// https://github.com/fawazahmed0/exchange-api

const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter the currency you would like to convert from: ', (convertFrom) => {
    rl.question('Enter the currency you would like to convert to: ', (convertTo) => {
        rl.question('Enter the amount you would like to convert: ', (amount) => {
            console.log(`Converting ${amount} ${convertFrom} to ${convertTo}...`);

            axios.get(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${convertFrom}.json`)
                .then(response => {
                    const data = response.data;
                    const rates = data[convertFrom.toLowerCase()];
                    const exchangeRate = rates[convertTo.toLowerCase()];
                    if (!exchangeRate) {
                        console.error(`Error: ${convertTo} is not a valid currency.`);
                        rl.close();
                        return;
                    }
                    const convertedAmount = amount * exchangeRate;
                    const convertedAmountRounded = Math.round(convertedAmount * 100) / 100;

                    const convertFromUpperCase = convertFrom.toUpperCase();
                    const convertToUpperCase = convertTo.toUpperCase();

                    console.log(`${amount} ${convertFromUpperCase} is equal to ${convertedAmountRounded} ${convertToUpperCase}`);
                    rl.close();

                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    rl.close();
                });
        });
    });
});

