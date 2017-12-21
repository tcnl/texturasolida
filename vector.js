<<<<<<< HEAD
function Vector (x, y, z){

	//construtor de vector
	this.x = x;
	this.y = y;
	this.z = z;

	//metodo que calcula a norma de um vetor
	this.norma = function(){
		var scalarProd = this.scalarProduct(this);
		var norma = Math.sqrt(scalarProduct);
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
		return r;
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

}

=======
function Vector (x, y, z){

	//construtor de vector
	this.x = x;
	this.y = y;
	this.z = z;

	//metodo que calcula a norma de um vetor
	this.norma = function(){
		var scalarProd = this.scalarProduct(this);
		var norma = Math.sqrt(scalarProduct);
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
		return r;
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

}

>>>>>>> 01f15ba51172870f477efb42e54fee4297d62d24
