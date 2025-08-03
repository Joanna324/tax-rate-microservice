# Microservice A: State Tax Rate Calculator
This microservice calculates the tax amount based on a given US state and a amount subtotal. It is meant to be used by another microservice or frontend app via HTTP POST requests.

Communication Contract
I commit to communicating clearly and responding promptly to all question or concerns. I am generally available and most responsive between 3:30 PM-1:00 PM PST, Monday through Friday. If any issues accessing or using the microservice, please reach out immediately via Discord.

http://localhost:3033/calculatetax
Repo:  https://github.com/Joanna324/tax-rate-microservice.git

To run locally needed/ Setup:

1. Node.js version 18 or higher installed.
2. Clone the repo:
   git clone  https://github.com/Joanna324/tax-rate-microservice.git
3. Install dependencies:
   npm install
4. Start the microservice:
   npm start

---

How to Request Data:
1. Send the subtotal and state vis Https
    Content-Type: `application/json`
    Required fields:
    `state`: Two-letter US state code string (EX:"CA")
    `subtotal`: A number <greater than 0> (EX: "100.00")

Example Call:

json
{
  "state": "CA",
  "subtotal": 100.00
}

Example Call:

fetch('http://localhost:3033/calculatetax', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ state: 'TX', subtotal: 10.99 })});

How to RECEIVE Data:

The microservice responds with a JSON object with the tax amount.The response will always be a JSON object.
If a valid request is sent, then the service will send:

tax_amount: a number- rounded to 2 decimal places

Example:
{
  "tax_amount": 0.90
}

Example Call:

fetch('http://localhost:3005/calculatetax', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ state: 'TX', subtotal: 10.99 })})
  .then(res => res.json())       
  .then(data => {console.log(data.tax_amount);});

