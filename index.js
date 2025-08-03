const express = require('express');
const app = express();
const PORT = 3033;
const fs = require('fs');


app.use(express.json());

// function that receives State and returns state tax rate
function getStateRate(state) {
    const stateUpperCase = state.toUpperCase();
    if (!(stateUpperCase in stateRates)) {
        return null;      // state, not found or incorrect.
    }
     return stateRates[stateUpperCase];
}


//json file with tax rates.
const stateRates = JSON.parse(fs.readFileSync('statetaxRate.json', 'utf-8'));


app.post('/calculatetax', (req, res) => {
    const { state, subtotal } = req.body;

//state
  if (!state || typeof state !== 'string' || state.length !== 2) {
    return res.status(400).json({ error: 'State can only be 2-letters' });
}

  // subtotal
  if (typeof subtotal !== 'number' || isNaN(subtotal) || subtotal < 0) {
    return res.status(400).json({ error: 'Subtotal cannot be negative' });
}


  const base_rate = getStateRate(state);

  if (base_rate === null) {
    return res.status(404).json({ error: 'State not found' });
  }

  //caculate tax rate and round 2 deci. places
  const tax_amount = parseFloat((subtotal * base_rate).toFixed(2));
  res.json({ tax_amount });
});



app.listen(PORT, () => {
  console.log(`Server is available on http://localhost:${PORT}`);
});
