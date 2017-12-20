var trianObj = [];
var objIndex = 0;
var objetos = [];
var vertices = [];
var triangulos = [];

window.addEventListener("load", function () {
        //Variaveis que pegam as acoes dos botoes
        var input = document.getElementById('objeto');
        //var fileDisplayArea = document.getElementById('fileDisplayArea');

        var div1 = document.getElementById('objetodiv');

       //EvtListeners pra fazer a leitura dos arquivo e colocar num array
       var aux = [];
       input.addEventListener('change', function(e, v) {
        var file = input.files[0];
        var reader = new FileReader();

        reader.onload = function(e) {
          if(~file.name.indexOf(".byu")){
            div1.innerHTML = "Voce carregou o arquivo: " +file.name;
            
            var info = reader.result.split('\n').shift();
            info = info.split(' ');
            var qtdTri = parseInt(info[0]);
            var qtdVert = parseInt(info[1]);
            console.log("Tri: " + qtdTri +"\nVert: " + qtdVert);
            objetos = (reader.result).split('\n');
           
            for(var k = 1; k < qtdVert+1; k++){
              var aux = [];
              aux = objetos[k].split(" ");
              vertices[k-1] = aux;
              for(var i=0; i<aux.length;i++) aux[i] = +aux[i];
              vertices[k-1] = new Point3D(parseFloat(aux[0]), parseFloat(aux[1]), parseFloat(aux[2]));
            } 

            for(var k = qtdVert+1; k < qtdVert + qtdTri +1; k++){
              var aux = [];
              aux = objetos[k].split(" ");
              triangulos[k - qtdVert] = new Triangle(vertices[parseInt(aux[0])], vertices[parseInt(aux[1])], vertices[parseInt(aux[2])]);
              triangulos[k - qtdVert].calculateNormal;
            }
            console.log(vertices);
            console.log(triangulos);
            objIndex++;
          }else(div1.innerHTML = "Objetos: File does not match!");
        }
        reader.readAsText(file);
      });
     });