var camera = [];
var C;
var N;
var V;


window.addEventListener("load", function () {
        //Variaveis que pegam as acoes dos botoes
        console.log("AE CARAIO");
        var input = document.getElementById('input');
        //var fileDisplayArea = document.getElementById('fileDisplayArea');

        var h1 = document.getElementById('h2');

       //EvtListeners pra fazer a leitura dos arquivo e colocar num array
       var aux = [];
       input.addEventListener('change', function(e, v) {
        var file = input.files[0];
        var reader = new FileReader();

        reader.onload = function(e) {
          if(file.name == "camera.cfg"){
            camera = (reader.result).split('\n');
                   // console.log(camera[0]); 

                   for(var k = 0; k < camera.length; k++){
                    var aux = [];
                    aux = camera[k].split(" ");

                    for(var i=0; i<aux.length;i++) aux[i] = +aux[i];

                      camera[k] = aux;
                    console.log(camera);
                        //Cria vetores da camera
                        //vetoresCam[k] = new Vector(camera[k][0], camera[k][1], camera[k][2]);
                      }
                      C = new Vector(camera[0][0], camera[0][1], camera[0][2]);
                      N = new Vector(camera[1][0], camera[1][1], camera[1][2]);
                      V = new Vector(camera[2][0], camera[2][1], camera[2][2]);
                      var ortV = V.gramSchimdt(N);
                      console.log(V);
                      console.log("hjhjh");
                      console.log(V);
                      console.log(vetoresCam); 

                    }else(console.log("File does not match!"));
                  }
                  reader.readAsText(file);
                  h1.innerHTML = "Voce carregou o arquivo: " +file.name;
                });
});