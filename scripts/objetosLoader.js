var trianObj = [];
var objIndex = 0;
var objetos = [];
var vertices = [];
var triangulos = [];

var triangulosTela=[];
var triangulosVista=[];

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

        var a = new Point3D(1, 2, 3);
        var b = new Point3D(4, 5, 6);
        var c = new Point3D(9, 8, 11);
        var tri = new Triangle(a, b, c);
        console.log("DEBUG");
        console.log(tri);
        tri = tri.getViewTriangle(cam);
        console.log(tri);
        tri = tri.getScreenTriangle(cam);
        console.log(tri);

        reader.onload = function(e) {
          if(~file.name.indexOf(".byu")){
            div1.innerHTML = "Voce carregou o arquivo: " +file.name;
            
            var info = reader.result.split('\n').shift();
            info = info.split(' ');
            var qtdTri = parseInt(info[0]);
            var qtdVert = parseInt(info[1]);
            console.log("Tri: " + qtdTri +"\nVert: " + qtdVert);
            objetos = (reader.result).split('\n');
           
           //PREENCHER ARRAY DE VERTICES E CRIAR PONTOS
            for(var k = 1; k < qtdVert+1; k++){
              var aux = [];
              aux = objetos[k].split(" ");
              vertices[k-1] = aux;
              for(var i=0; i<aux.length;i++) aux[i] = +aux[i];
              vertices[k-1] = new Point3D(parseFloat(aux[0]), parseFloat(aux[1]), parseFloat(aux[2]));
            } 

            //PREENCHER ARRAY DE TRIANGULOS E CRIAR OS TRIANGULOS DE TELA
            for(var k = qtdVert+1; k < qtdVert + qtdTri +1; k++){
              var aux = [];
              aux = objetos[k].split(" ");
              var triangle = new Triangle(vertices[parseInt(aux[0])], vertices[parseInt(aux[1])], vertices[parseInt(aux[2])]);
              var viewTriangle = triangle.getViewTriangle(cam);
              var screenTriangle = triangle.getScreenTriangle(cam);
              triangulos[k - qtdVert] = triangle;
              triangulos[k - qtdVert].calculateNormal();
              triangulosTela[k - qtdVert] = screenTriangle;
              triangulosVista[k - qtdVert] = viewTriangle;
            }

            //console.log(vertices);
           // console.log(triangulos);
            console.log(cam);
            console.log(triangulos[1].normal);
            console.log(triangulosVista);
            console.log(triangulosTela);
          }else(div1.innerHTML = "Objetos: File does not match!");
        }
        reader.readAsText(file);
      });
     });