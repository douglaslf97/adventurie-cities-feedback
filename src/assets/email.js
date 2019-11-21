module.exports = (message) => {  

  return `
  <!DOCTYPE html>
  <html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <style>     
      *, *::before, *::after{
        box-sizing: border-box;
        padding: 0;
        margin: 0;
      }               
    </style>
  </head>
  
  <body>  
    <a href="http://www.adventurecities.com.br/">
      <img width="500px" height="auto" src="cid:adventure" />
    </a>
    <div style="margin-top: 10px">
      ${message}
    </div>
    <a style="display: inline-flex; line-height: 30px; text-decoration: none; color: #222" href="https://www.facebook.com/adventurecitiesgame/">
      <img width="30px" height="30px" src="cid:facebook" />
      Adventurecitiesgame/
    </a>
    <a style="display: inline-flex; line-height: 30px; text-decoration: none; color: #222" href="https://www.instagram.com/adventure.cities/">
      <img width="30px" height="30px" src="cid:instagram" />      
      @Adventure.cities/         
    </a>  
  </body>  
  </html>`
}