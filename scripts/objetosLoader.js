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
          if(file.name == "objetos"){
            div1.innerHTML = "Voce carregou o arquivo: " +file.name;
            objetos = (reader.result).split('\n');
            for(var k = 0; k < objetos.length; k++){
              var aux = [];
              aux = objetos[k].split(" ");
              for(var i=0; i<aux.length;i++) aux[i] = +aux[i];
                objetos[k] = aux;
              vetoresObj[k] = new Vector(objetos[k][1], objetos[k][2], objetos[k][3]);
            } 
            console.log(vetoresObj);
            objIndex++;
          }else(div1.innerHTML = "Objetos: File does not match!");
        }
        reader.readAsText(file);
      });
     });