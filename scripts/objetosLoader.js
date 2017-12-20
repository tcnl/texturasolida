var trianObj = [];
var objIndex = 0;
var objetos = [];

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
            console.log(info);
            objetos = (reader.result).split('\n');
            for(var k = 1; k < objetos.length; k++){
              var aux = [];
              aux = objetos[k].split(" ");
              for(var i=0; i<aux.length;i++) aux[i] = +aux[i];
                objetos[k] = aux;
              trianObj[k] = new Triangle(objetos[k][1], objetos[k][2], objetos[k][3]);
            } 
            console.log(trianObj);
            objIndex++;
          }else(div1.innerHTML = "Objetos: File does not match!");
        }
        reader.readAsText(file);
      });
     });