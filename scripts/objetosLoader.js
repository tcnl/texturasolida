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
      }
      reader.readAsText(file);
      h1.innerHTML = "Voce carregou o arquivo: " +file.name;
    });
});