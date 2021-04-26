// 네이버 검색 API예제는 블로그를 비롯 전문자료까지 호출방법이 동일하므로 blog검색만 대표로 예제를 올렸습니다.
// 네이버 검색 Open API 예제 - 블로그 검색
var express = require('express');
var axios = require('axios');
var app = express();
var client_id = 'zi7p6L6pecPgRkFLMKhn';
var client_secret = 'xen5pAxoTE';
var cors = require('cors')
app.use(cors());

app.get('/', function(req, res) {
    res.send('API root')
  })

app.get('/search/blog', function (req, res) {
    console.log(req.query);
    var api_url = `https://openapi.naver.com/v1/search/blog?query=${req.query.query}`;
    var options = {
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
    axios.get(api_url, options).then( respone => {
        if(respone.status === 200){
            // res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            // res.end(body);
            // console.log(respone.data)
            res.send(respone.data)
        }
    } ).catch( err => {
        console.error(err);
    } )
    
});

app.get('/search/news', function (req, res) {
    console.log(req.query);
    var api_url = 'https://openapi.naver.com/v1/search/news?query=' + encodeURI(req.query.query);
    var options = {
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret, 'Access-Control-Allow-Origin': '*'}
    };
    axios.get(api_url, options).then( respone => {
        if(respone.status === 200){
            // res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            // res.end(body);
            // console.log(respone.data)
            res.send(respone.data)
        }
    } ).catch( err => {
        console.error(err);
    } )
    
});

module.exports = {
    path: '/api',
    handler: app
}