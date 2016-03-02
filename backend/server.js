var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var env = require('dotenv').load();
var cors = require('cors');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/meanhacknight');

var Watchlist = mongoose.model('Watchlist', { owner: String, repo: String });
// var item = new Watchlist({ owner: 'npm', repo: 'npm'});
//   item.save(function (err) {
//     if (err) return handleError(err);
//     Watchlist.find({}, function(err, items) {
//       var itemMap = {};

//       items.forEach(function(item) {
//         itemMap[item._id] = item;
//       });

//     });
//   });


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 8080; // set our port
var router = express.Router(); // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({
    message: 'root response',
  });
});

router.post('/watchlist/:owner/:repo', function(req, res) {
  var item = new Watchlist({ owner: req.params.owner, repo: req.params.repo});
  item.save(function (err) {
    if (err) return handleError(err);
    Watchlist.find({}, function(err, items) {
      var itemMap = {};

      items.forEach(function(item) {
        itemMap[item._id] = item;
      });

      res.send(itemMap);
    });
  });
});

router.get('/watchlist', function(req, res) {
  Watchlist.find({}, function(err, items) {
    var itemMap = {};

    items.forEach(function(item) {
      itemMap[item._id] = item;
    });

    res.send(itemMap);
  });
});

router.route('/watchlist/:id')
  .delete(function(req, res) {
    // insert into mongo
    console.log(req.params.id);
    Watchlist.remove({ _id: req.params.id }, function(err) {
      if (!err) {
        Watchlist.find({}, function(err, items) {
          var itemMap = {};

          items.forEach(function(item) {
            itemMap[item._id] = item;
          });

          res.send(itemMap);
        });
      }
      else {
        res.json({message: 'could not delete'});
      }
    });
  });


// prefix calls with '/api'
app.use('/api', router);

app.listen(port);
console.log('Server running at http://localhost:' + port + '/api');
