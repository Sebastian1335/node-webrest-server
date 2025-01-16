import fs from 'fs';
import http from 'http'


const server = http.createServer((req, res) => {
    console.log(req.url);

    // res.writeHead(200, {'content-type': 'text/html'})
    // res.write(`<h1>hola ${req.url} Mundo</h1>`)
    // res.end()
    // const data = {name: 'John Doe', age: 30, city: 'New York'}
    // res.writeHead(200, {"content-type": 'application/json'})
    // res.end(JSON.stringify(data))
    if(req.url === '/'){
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8')
        res.writeHead(200, {"content-type": 'text/html'})
        res.end(htmlFile)
        return 
    }
    if(req.url?.endsWith('.js')){
        res.writeHead(200, {'content-type': 'application/javascript'})
    } else if(req.url?.endsWith('.css')){
        res.writeHead(200, {'content-type': 'text/css'})
    }
    const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8')
    res.end(responseContent)
})


server.listen(8080, () => {
    console.log('Sever name running on 8080');
})