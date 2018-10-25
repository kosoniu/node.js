const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>List of the users</title></head>');
        res.write('<body><form action="/create-user" method="post"><input type="text" name="users"><button type="submit">SUBMIT</button></form></body>');
        res.write('</html>');
        return res.end();
    } else if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk)
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('users.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/users');
                return res.end();
            });
        });
    } else if (url === '/users'){
        res.write('<html>');
        res.write('<head><title>List of the users</title></head><body>');
        res.write('<ul>');
        res.write('<li>User 1</li>');
        res.write('<li>User 2</li>');
        res.write('<li>User 3</li>');
        res.write('<li>User 4</li>');
        res.write('<li>User 5</li>');
        res.write('</ul>');
        res.write('</body></html>');
        return res.end();
    }else{
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My First Page</title></head>');
        res.write('<body><h1>This is simple users page</h1></body>');
        res.write('</html>');
        res.end();
    }
};

module.exports = {
    requestHandler
}
