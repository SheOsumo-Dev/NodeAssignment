
const requestHandler = (req,res) =>{
    const url = req.url;
    const method = req.method;

    if(url === '/'){
        res.write('<html>');
        res.write('<head><title>First Node JS Assignment</title></head>')
        res.write('<body></body>');
        res.write('<h1>Hello Channel Welcome to My Guys</h1>');
        res.write('<h2>Please Click the Button to View My Subscriber</h2>');
        res.write('<form action="/users" method="POST"><button type = "submit">View Subscriber</button></form>');
        res.write('<h2>Want to be my Subscriber? Register Now and Receive Many extraspecaacular advantage</h2>');
        res.write('<form action="/createusers" method="POST"><input type = "text" name = "username"><button type = "submit">Register</button></form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    if(url === '/users' && method === 'POST' ){
        res.write('<html>');
        res.write('<head><title>First Node JS Assignment</title></head>')
        res.write('<body></body>');
        res.write('<h1>TOP 5 Daily Subscriber</h1>');
        res.write('<ul><li>1. Von Gweyn</li></ul>');
        res.write('<ul><li>2. Pipaw Batang Bata</li></ul>');
        res.write('<ul><li>3. Jiems Reyd</li></ul>');
        res.write('<ul><li>4. Kuya Kim Allan</li></ul>');
        res.write('<ul><li>5. Susej</li></ul>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    if(url === '/createusers' && method === 'POST' ){
        const body = [];
        req.on('data', (chunk) =>{
            body.push(chunk);
        }); 
        return req.on('end', () =>{
            const parsebody = Buffer.concat(body).toString();
            const message = parsebody.split('=')[1];
            console.log(message);
            res.statusCode = 302;
            res.setHeader('Location', '/'); 
            return res.end();
        });        
    }
};

module.exports = requestHandler;
