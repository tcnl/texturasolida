var iluminacao = [];
var P1;
var ka;
var Ia;
var kd;
var Od;
var ks;
var Il;
var n;

window.addEventListener("load", function () {
        //Variaveis que pegam as acoes dos botoes
        var input = document.getElementById('iluminacao');
        //var fileDisplayArea = document.getElementById('fileDisplayArea');

        var div3 = document.getElementById('iluminacaodiv');

       //EvtListeners pra fazer a leitura dos arquivo e colocar num array
       var aux = [];
       input.addEventListener('change', function(e, v) {
        var file = input.files[0];
        var reader = new FileReader();

        reader.onload = function(e) {
         if(file.name == "iluminacao.txt"){
          div3.innerHTML = "Iluminacao: Voce carregou o arquivo: " +file.name;
          iluminacao = (reader.result).split('\n');

          for(var k = 0; k < iluminacao.length; k++){
           var aux = [];
           aux = iluminacao[k].split(" ");

           for(var i=0; i<aux.length;i++) aux[i] = +aux[i];

             iluminacao[k] = aux;


         }
         P1 = new Vector(iluminacao[0][0], iluminacao[0][1], iluminacao[0][2]);
         ka = iluminacao[1][0];
         Ia = new Vector(iluminacao[2][0], iluminacao[2][1], iluminacao[2][2]);
         kd = iluminacao[3][0];
         Od = new Vector(iluminacao[4][0], iluminacao[4][1], iluminacao[4][2]);
         ks = iluminacao[5][0];
         Il = iluminacao[6];
         n = iluminacao[7];
       }else(div3.innerHTML = "Iluminacao: File does not match!");
     }
     reader.readAsText(file);

   });
     });