var fs = require('fs');
var _ = require('lodash');
var data = fs.readFileSync(process.argv[2], 'utf8');
data = data.split('\r');

var DateToJSON = [];
// console.log('date: ', data[0]);
// console.log('@@start');

// 每一行
// var col = data[1]
_.each(data, function (col) {
  //計算每一行日期投資報酬率最高的
  var result = [];
  col = col.split(',');
  _.each(col, function (first, idx_i) {
    _.each(col, function (second, idx_j) {
      if (idx_i !== 0 && idx_j !== 0 && idx_i < idx_j) {
        // console.log('-------------------\n');
        // console.log('cauculating....')
        // console.log(data[0].split(',')[idx_j], second);
        // console.log(data[0].split(',')[idx_i], first);
        var rate = (first - second) / second;
        // console.log('rate:', rate)
        // console.log('-------------------\n');
        result.push({
          startDate: data[0].split(',')[idx_j],
          endDate: data[0].split(',')[idx_i],
          rate: (rate) ? rate : 0,
        });
      }
    });
  });
  // console.log(result);

  console.log('\n*************',col[0].replace('\n',''),'*************\n');
  var sortresult = _.orderBy(result,['rate'],['desc']);
  console.log('最高:',sortresult[0]);
  console.log('次高:',sortresult[1]);
  console.log('第三高:',sortresult[2]);
  console.log('最低:',sortresult[sortresult.length-1]);
  console.log('次低:',sortresult[sortresult.length-2]);
  console.log('第三低:',sortresult[sortresult.length-3]);
  DateToJSON.push({
    stockName: col[0].replace('\n',''),
    1:sortresult[0],
    2:sortresult[1],
    3:sortresult[2],
    last1:sortresult[sortresult.length-1],
    last2:sortresult[sortresult.length-2],
    last3:sortresult[sortresult.length-3]
  });
});

fs.writeFileSync('result.json', JSON.stringify(DateToJSON));