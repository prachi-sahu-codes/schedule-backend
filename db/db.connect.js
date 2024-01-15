const mongoose = require('mongoose')

const mongoURI = process.env.MONGODB;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB')
})
.catch((error) => {
  console.log('Error connecting to MongoDB:', error)
})
