import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';


export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const db = client.db("vinos");

        // Obtener el término de búsqueda del parámetro de consulta 'search'
        const searchQuery = req.query.search;

        // Construir la consulta para buscar vinos que contengan el término de búsqueda en el nombre
        const query = searchQuery ? { title: { $regex: searchQuery, $options: 'i' } } : {};

        const wines = await db
            .collection("lista_de_vinos")
            .find(query)
            .sort({ price: -1 })
            .toArray();

        // Construir una respuesta HTML con los resultados
        let htmlResponse = '<!DOCTYPE html>';
            htmlResponse += '<html lang="en">';
            htmlResponse += '<head>';
            htmlResponse += '<meta charset="UTF-8">';
            htmlResponse += '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
            htmlResponse += '<title>Resultados de búsqueda</title>';
            htmlResponse += '<style>';
            htmlResponse += `body {background: rgb(244,196,62); margin:0; padding:0; border:0; font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif}`
            htmlResponse += '.title {width: 100vw; margin-bottom: 50px; box-sizing: border-box; background: rgb(51,51,51); color: rgb(37,100,253); display: flex; justify-content: center; }';
            htmlResponse += '.main {margin: 0; padding: 0}';
            htmlResponse += '#results {display: flex; flex-wrap: wrap; justify-content: space-around;}';
            htmlResponse += '.wine { border-top-left-radius: 10px; background: rgb(255, 255, 255); padding: 10px; width: calc(25vw - 20px); height: 200px; overflow: hidden; margin: 5px; box-sizing: border-box; display: flex; position: relative}';
            htmlResponse += '.wine h2 {margin-right: 120px;}';
            htmlResponse += '.wine p {position: absolute;bottom:20px;}';
            htmlResponse += '.wine a {text-decoration: none; position: absolute; bottom:10px;}';
            htmlResponse += '.wine img {height: 100%; width: auto;margin-right: 10px}';
            htmlResponse += '@media (max-width: 1200px) {';
            htmlResponse += '    .wine {width: calc(50% - 20px); margin: 20px auto 0px; overflow: auto; box-sizing: border-box; }';                     
            htmlResponse += '    .wine h2 {font-size: 90%; margin-right: 10px; position: absolute; top: 5%; transform: translateX(-20%); margin-right: 10px;}';
            htmlResponse += '    .wine h4{position: absolute; top: 50%; transform: translateY(-50%); font-size: 70%}';
            htmlResponse += '    .wine a{margin-right: 10px; position: absolute; bottom: 20px; right: 10px; font-size: 80%}';
            htmlResponse += '    .wine img {height: 70%; width: auto;margin-top: 20px; margin-right: 12px;}';                    
            htmlResponse += '}';            
            htmlResponse += '@media (max-width: 450px) {';            
            htmlResponse += '    .title {margin-bottom: 10px;}';                     
            htmlResponse += '    .wine {width: 82vw; margin: 20px auto 0px; overflow: auto}';                     
            htmlResponse += '    .wine h2 {margin-right: 10px; position: absolute; top: 20%; transform: translateY(-50%); margin-right: 10px;}';
            htmlResponse += '    .wine h4{position: absolute; top: 50%; transform: translateY(-50%); font-size: 90%}';
            htmlResponse += '    .wine a{margin-right: 10px; position: absolute; bottom: 20px; right: 10px; font-size: 90%}';
            htmlResponse += '    .wine img {height: 70%; width: auto;margin-top: 20px; margin-right: 12px;}';
            htmlResponse += '    #results {display: flex; flex-direction: column;align-items: space-between;}';
            htmlResponse += '  }';
            htmlResponse += '</style>';
            htmlResponse += '</head>';
            htmlResponse += '<body>';
            htmlResponse += '<div class="title">'
            htmlResponse += '<h1>ChajaríWine</h1>'
            htmlResponse += '</div>'
            htmlResponse += '<section class="main">';
            htmlResponse += '<div id="results">';
            wines.forEach(wine => {
                htmlResponse += '<article class="wine result-item">';
                htmlResponse += '<div>';
                htmlResponse += `<img src="${wine.imageitem}" alt="${wine.name}"></img>`;
                htmlResponse += `</div>`;
                htmlResponse += `<div>`;
                htmlResponse += `<h2>${wine.name}</h2>`;
                htmlResponse += `<h4>Precio: $${wine.price}</h4>`;
                htmlResponse += `<a href="../items/${encodeURIComponent(wine._id.toString())}">Ver este producto</a>`;
                htmlResponse += '</div>';
                htmlResponse += '</article>';
            });
            htmlResponse += '</div>';
            htmlResponse += '</section>';
            htmlResponse += '</html>';

        // Enviar la respuesta HTML
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(htmlResponse);
    } catch (e) {
        console.error(e);
        // Manejar errores y enviar una respuesta de error
        res.status(500).send('<p>Error interno del servidor</p>');
    }
}

