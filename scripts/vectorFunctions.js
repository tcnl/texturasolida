var canvas =  document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');
var id = ctx.createImageData(1,1); // only do this once per page
var d  = id.data;                        // only do this once per page
d[0]   = 0;
d[1]   = 0;
d[2]   = 0;
ctx.putImageData( id, 100, 100 ); 

function Cam (c ,d, hx, hy, alfa, u, v, n){
  this.u = u;
  this.v = v;
  this.n = n;
  this.c = c;
  this.d = d;
  this.hx = hx;
  this.hy = hy;
  this.alfa = alfa;
}
function Vector (x, y, z){

  //construtor de vector
  this.x = x;
  this.y = y;
  this.z = z;

  //metodo que calcula a norma de um vetor
  this.norma = function(){
    var scalarProd = this.scalarProduct(this);
    var norma = Math.sqrt(scalarProd);
    return norma;
  };

  //metodo que calcula o produto escalar
  this.scalarProduct = function(v){
    var result = this.x*v.x + this.y*v.y + this.z*v.z;
    return result;
  };

  //metodo que faz a normalização do vetor
  this.normalize = function(){
    var norma = this.norma();
    var normX = this.x / norma;
    var normY = this.y / norma;
    var normZ = this.z / norma;
    return (new Vector(normX, normY, normZ));
  }

  //metodo que calcula o produto vetorial
  this.vectorProduct = function(v){
    var pX = this.y*v.z - this.z*v.y;
    var pY = this.z*v.x - this.x*v.z;
    var pZ = this.x*v.y - this.y*v.x;
    return (new Vector(pX, pY, pZ));
  };

  this.multi = function(p){
    return new Vector(this.x*p, this.y*p, this.z*p);
  }

  this.OrtogonalProjection = function (v){
    var p = (v.scalarProduct(this)) / (this.scalarProduct(this));
    var vt = new Vector(this.x, this.y, this.z);
    vt = vt.multi(p);
    return vt;
  };

  this.sub = function(v){
    var x = this.x - v.x;
    var y = this.y - v.y;
    var z = this.z - v.z;

    return new Vector (x, y, z);
  }

  this.GramSchimdt = function(v){
    var u = v.OrtogonalProjection(this);
    var w = v.sub(u);
    return w;
  };

  this.clone = function () {
  return new Vector(this.x, this.y, this.z);
};

}

function Point3D (x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.normal = new Vector(0, 0, 0);
}

Point3D.prototype.sum = function(p) {
  var x = this.x + p.x;
  var y = this.y + p.y;
  var z = this.z + p.z;

  return new Point3D(x, y, z);
};

Point3D.prototype.sub = function(p) {
  var x = this.x - p.x;
  var y = this.y - p.y;
  var z = this.z - p.z;

  return new Point3D(x, y, z);
};

Point3D.prototype.toBase = function(matrix) {
  var x = (matrix[0][0] * this.x) + (matrix[0][1] * this.y) + (matrix[0][2] * this.z);
  var y = (matrix[1][0] * this.x) + (matrix[1][1] * this.y) + (matrix[1][2] * this.z);
  var z = (matrix[2][0] * this.x) + (matrix[2][1] * this.y) + (matrix[2][2] * this.z);
  //console.log("x: " + x, "\ny: "+y);
  return new Point3D(x, y, z);
};

Point3D.prototype.clone = function() {
  return new Point3D(this.x, this.y, this.z);
};

Point3D.prototype.toView = function(cam) {
  var view = this.clone();
  var v = view.sub(cam.c);
  return v.toBase(cam.alfa);
};

Point3D.prototype.getScreenPoint = function(cam) {
  var x = (cam.d/cam.hx) * (this.x/this.z);
  var y = (cam.d/cam.hy) * (this.y/this.z);
  var a = new Point2D(x, y);
   var r = new Point2D(((a.x + 1) * (600 / 2)), ((1 - a.y) * (500 / 2)));
   r.x = Math.round(r.x);
   r.y = Math.round(r.y);
   r.normal = this.normal.clone();
   return r;
  //return new Point3D (x, y, this.z);

};

Point3D.prototype.constantScalarProduct = function(k) {
  var x = this.x * k;
  var y = this.y * k;
  var z = this.z * k;

  return new Point3D(x, y, z);
};

function Point2D (x, y) {
  this.x = x;
  this.y = y;
  this.normal = new Vector(0, 0, 0);
};

Point2D.prototype.clone = function() {
  return new Point2D(this.x, this.y);
};

function Triangle(p1, p2, p3) {
  this.p1 = p1;
  this.p2 = p2;
  this.p3 = p3;
  this.normal = new Vector(0, 0, 0);
  this.calculateNormal();
}

Triangle.prototype.sort = function() {
  if(this.p1.y > this.p2.y) {
    var a = this.p2.clone();
    this.p2 = this.p1;
    this.p1 = this.p2;
  }
  if(this.p2.y > this.p3.y) {
    var a = this.p2.clone();
    this.p2 = this.p3;
    this.p3 = a;
  }
  if (this.p1.y > this.p2.y) {
    var a = this.p1.clone();
    this.p1 = this.p2;
    this.p2 = a;
  }
};
Triangle.prototype.isTriangle = function(){
        return (this.normal.x != 0 || this.normal.y != 0 || this.normal.z != 0);
    };

Triangle.prototype.calculateNormal = function() {
        var v = new Vector(this.p2.x - this.p1.x, this.p2.y - this.p1.y, this.p2.z - this.p1.z); 
        var u = new Vector(this.p3.x - this.p1.x, this.p3.y - this.p2.y, this.p3.z - this.p1.z); 
        var w = v.vectorProduct(u);
        this.normal = w;
        if(this.isTriangle()){
            this.normal = w.normalize();
        }
    };

Triangle.prototype.getViewTriangle = function(cam){
  var p1 = this.p1.toView(cam);
  var p2 = this.p2.toView(cam);
  var p3 = this.p3.toView(cam);

  return new Triangle(p1, p2, p3);
}

Triangle.prototype.getScreenTriangle = function(cam) {
  var p1 = this.p1.getScreenPoint(cam);
  var p2 = this.p2.getScreenPoint(cam);
  var p3 = this.p3.getScreenPoint(cam);

  return new Triangle(p1, p2, p3);
};

Triangle.prototype.getBaricentricalPoint3D = function(cb) {
  var a = this.p1.clone();
  var b = this.p2.clone();
  var c = this.p3.clone();

  a = a.scalarProduct(cb.alpha);
  b = b.scalarProduct(cb.beta);
  c = c.scalarProduct(cb.gama);

  return new Point3D(a.x +b.x + c.x, a.y + b.y + c.y, a.z + b.z + c.z);
};

Triangle.prototype.getBaricentricalVector = function(cb) {
  var a = this.p1.normal.clone();
  var b = this.p2.normal.clone();
  var c = this.p3.normal.clone();
  a = a.scalarProduct(cb.alpha);
  b = b.scalarProduct(cb.beta);
  c = c.scalarProduct(cb.gama);

  a.sum(b);
  a.sum(c);

  return new Vector(a.x, a.y, a.z);
};
