var camera = [];
var C;
var N;
var V;
var U;
var cam;


window.addEventListener("load", function () {
        //Variaveis que pegam as acoes dos botoes
        var input = document.getElementById('camera');
        //var fileDisplayArea = document.getElementById('fileDisplayArea');

        var h1 = document.getElementById('cameradiv');

       //EvtListeners pra fazer a leitura dos arquivo e colocar num array
       var aux = [];
       input.addEventListener('change', function(e, v) {
        var file = input.files[0];
        var reader = new FileReader();

        reader.onload = function(e) {
          if(~file.name.indexOf(".cfg")){
            h1.innerHTML = "Camera: Voce carregou o arquivo: " +file.name;
            camera = (reader.result).split('\n');
                   // console.log(camera[0]); 

                   for(var k = 0; k < camera.length; k++){
                    var aux = [];
                    aux = camera[k].split(" ");

                    for(var i=0; i<aux.length;i++) aux[i] = +aux[i];

                      camera[k] = aux;

                        //Cria vetores da camera
                        //vetoresCam[k] = new Vector(camera[k][0], camera[k][1], camera[k][2]);
                      }
                      console.log(camera);
                      C = new Vector(parseFloat(camera[0][0]), parseFloat(camera[0][1]), parseFloat(camera[0][2]));
                      N = new Vector(parseFloat(camera[1][0]), parseFloat(camera[1][1]), parseFloat(camera[1][2]));
                      V = new Vector(parseFloat(camera[2][0]), parseFloat(camera[2][1]), parseFloat(camera[2][2]));
                      console.log(V);
                      V = V.gramSchimdt(N);
                      U = V.crossProduct(N);

                     

                      U.normalize;
                      V.normalize;
                      N.normalize;
                      alfa = [];
                      aux = [];
                      alfa[0] = aux;
                      alfa[1] = aux;
                      alfa[2] = aux;
                      alfa[0][0] = U.x;
                      alfa[0][1] = U.y;
                      alfa[0][2] = U.z;

                      alfa[1][0] = V.x;
                      alfa[1][1] = V.y;
                      alfa[1][2] = V.z;

                      alfa[2][0] = N.x;
                      alfa[2][1] = N.y;
                      alfa[2][2] = N.z;

                      cam = new Cam(C, parseFloat(camera[3][0]),parseFloat(camera[3][1]), parseFloat(camera[3][2]), alfa) 
                      console.log("DEBUG CAM: N, V, U, Alfa");
                      console.log(N);
                      console.log(V);
                      console.log(U);
                      console.log(cam);




                    }else(h1.innerHTML = "Camera: File does not match!");
                  }
                  reader.readAsText(file);
                  
                });
     });