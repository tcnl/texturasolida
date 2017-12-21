var zbuffer;

function inicializarZbuffer(){
  zbuffer = [];
  for (var i = 0; i < widht; i++){
    zbuffer[i] = [];
    for (var j = 0; j < height; j++){
      zbuffer[i][j] = Infinity;
    }
  }
}
