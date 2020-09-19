const puppeteer = require('puppeteer');
const fs = require('fs');
 
(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com/earth/');

    const imgList = await page.evaluate(() => {
        // toda essa informacao sera executada no browser
        // pegar todas as imagens que estao na parte de posts
            const nodeList = document.querySelectorAll('article img');

        // transformar o NodeList em array
            const imgArray = [...nodeList];

        // transformar os nodes (elementos html) em objetos JS
            const imgList = imgArray.map( ({src}) => ({
                src
            }));

        // colocar fora da funcao
        return imgList
    });

    // escrever dados em um arquivo local (json)
    fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err => {
        if(err){
            throw new Error('something went wrong');
            
            console.log('well done!');
        }
    });

    // await page.screenshot({path: 'earth.png'});
 
    await browser.close();
})();