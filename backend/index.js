const connectToMongo = require("./db");
const express = require('express')
const cors = require('cors')
const multer = require('multer')
const upload = multer({ dest: 'backend/productImages' })


connectToMongo();

const app = express()
const port = 4002

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Aagaman!')
})

// app.use('/auth/login',require('./routes/auth/login'))
// app.use('/auth/signup', require('./routes/auth/signup'))

app.use('/auth',require('./routes/auth'));
app.use('/admin/auth',require('./routes/adminAuth'));
app.use('/productControl',require('./routes/products'));
app.use('/cart',require('./routes/cart'));
app.use('/order',require('./routes/orders'));
app.use('/backend/productImages',express.static('backend/productImages'));
app.use('/search',require('./routes/search'));


app.listen(port, () => {
  console.log(`All-trade-cn app listening on port ${port}`)
})