import http from "node:http";
import fs, {access, constants, writeFile} from "node:fs/promises";
    
try {
    await access('comedians.json', constants.R_OK | constants.W_OK);
    await access('client.json', constants.R_OK | constants.W_OK);
    
    http
    .createServer(async (req, res) => {
    if(req.method === "GET" && req.url === "/comedians") {
            try {
                const data = await fs.readFile('comedians.json', 'utf-8')
                res.writeHead(200, {
                    "Content-Type": "text/json; charset=utf-8",
                    "access-control-allow-origin": "*",
                })
                res.end(data);    
            } catch (error) {
                res.writeHead(200, {
                    "Content-Type": "text/pain; charset=utf-8"})
                res.end(`Ошибка сервера:${error}`)  
            }
            
        } else {
            res.writeHead(404);
            res.end("Not Found");
        }
        
    })
    .listen(8080)
    
    console.log("Сервер запущен по адресу: http://localhost:8080");
} catch (error) {
    const controller = new AbortController();
    const { signal } = controller;
    const data = new Uint8Array(Buffer.from([]));
    const promise = writeFile('client.json', data, { signal });

    // Abort the request before the promise settles.
    controller.abort();

    await promise;
    console.log(`Server error: ${error}`);
}
