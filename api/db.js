const mongoose = require('mongoose');

const connectionURL=`mongodb+srv://vvk17sharma:s1dDpQFsSlaVKMP2@cluster0.0ryelhv.mongodb.net/`

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
 
  // mongodb+srv://vvk17sharma:<password>@cluster0.0ryelhv.mongodb.net/
//s1dDpQFsSlaVKMP2