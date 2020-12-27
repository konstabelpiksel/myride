var sphereRotation = 0;
var delta = 0;
var speed = 8;
var radius = 5;

//CONTAINER
var container = document.getElementById("canvas");

//RENDERER
renderer = new THREE.WebGLRenderer({
	alpha: true,
	antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio); 
renderer.setSize(window.innerWidth, window.innerHeight);

container.appendChild(renderer.domElement);

//MAIN INIT
var clock;
clock = new THREE.Clock();

var scene = new THREE.Scene();
//scene.background = new THREE.Color(0x2a81de);
	
var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 1000);
camera.position.set(10, 7, 0);


//LIGHTING	
var bucca_color  = '#FEFEFE',
ambientLight  = new THREE.AmbientLight( '#f2f2f2' ),
hemiLight     = new THREE.HemisphereLight( bucca_color, bucca_color, 0 ),
light         = new THREE.PointLight( bucca_color, 1, 100 );

hemiLight.position.set( 0, 50, 0 );
light.position.set( 0, 20, 10 );

scene.add( ambientLight );
scene.add( hemiLight );
scene.add( light );
	
//var ambientLight  = new THREE.AmbientLight('#ffffff', 0.5);
//scene.add(ambientLight);

axisHelper = new THREE.AxesHelper( 1.25 );
scene.add( axisHelper );

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target.set(0,6,0);
//controls.minDistance(1);
//controls.maxDistance(8);
controls.update();

//CREATE GLOBE
var sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, 32, 24), new THREE.MeshBasicMaterial({color: 0x00084f, /*wireframe: true*/}));
scene.add(sphere);

//POLES
var Tiang = function(){
		
	this.mesh = new THREE.Object3D();
	this.mesh.name = "tiang";

	var geomTiang = new THREE.CubeGeometry(0.05, 0.05, 1.6);
	var geomBatang = new THREE.CubeGeometry(0.8, 0.05, 0.05);
	var geomLampu = new THREE.CubeGeometry(0.1, 0.1, 0.1);
	
	var matTiang = new THREE.MeshBasicMaterial({color: 0xe3e3e3});
	
	var tiang = new THREE.Mesh(geomTiang, matTiang);
	var batang = new THREE.Mesh(geomBatang, matTiang);
	var lampu = new THREE.Mesh(geomLampu, matTiang);
		
	tiang.position.set(0,0,0);
	batang.position.set(0.4,0,-0.8);
	lampu.position.set(0.8,0,-0.8);
	//tiang.rotation.x = -Math.PI * 0.5;
	//tiang.castShadow = true;
	//tiang.receiveShadow = true;
	this.mesh.add(tiang);
	this.mesh.add(batang);
	this.mesh.add(lampu);

}


function createTiang(){
	tiang=[]

	//0 darjah - 120 darjah
	//setiap 12 darjah
	//radtable = [Math.PI*2, Math.PI/180];
	for (var i = 1; i <= 15; i++){
		tiang[i]=new Tiang();
		let rx= 0;
		let ry= i * 24 * Math.PI/180; //phi
		//.setFromSphericalCoords ( radius : Float, phi : Float, theta : Float ) : this
		//Sets this vector from the spherical coordinates radius, phi and theta.
		//radius - the radius, or the Euclidean distance (straight-line distance) from the point to the origin. Default is 1.0.
		//phi - polar angle in radians from the y (up) axis. Default is 0.
		//theta - equator angle in radians around the y (up) axis. Default is 0.

		tiang[i].mesh.position.setFromSphericalCoords(5 + 0.82, ry, rx);
		//console.log('pole '+ i);
		//console.log(tiang[i].mesh.position);
		//tiang[i].mesh.position.x -= 0.5;
		tiang[i].mesh.lookAt(sphere.position);
		if(i<8) {
			tiang[i].mesh.rotateZ(-Math.PI);
		}
		sphere.add(tiang[i].mesh);
	}


/*
	for (var i = -1; i >= -15; i--){
		tree[i]=new Tree();
		let rx= 0;
		let ry= i * 12 * Math.PI/180; //phi
		//.setFromSphericalCoords ( radius : Float, phi : Float, theta : Float ) : this
		//Sets this vector from the spherical coordinates radius, phi and theta.
		//radius - the radius, or the Euclidean distance (straight-line distance) from the point to the origin. Default is 1.0.
		//phi - polar angle in radians from the y (up) axis. Default is 0.
		//theta - equator angle in radians around the y (up) axis. Default is 0.

		tree[i].mesh.position.setFromSphericalCoords(3 + 0.4, ry, rx);
		console.log('pole ' + i + ': ');
		console.log(tree[i].mesh.position);
		tree[i].mesh.lookAt(sphere.position);
		scene.add(tree[i].mesh);
	}
	*/
}

function updateSphereRotation(){
	sphereRotation += delta*.05 * speed;
	sphereRotation = sphereRotation%(Math.PI*2);
	sphere.rotation.x = sphereRotation;
}

function createCityScape(){
	const texture1 = new THREE.TextureLoader().load('./img/front-xh.png');
	const texture2 = new THREE.TextureLoader().load('./img/mid.png');
	const texture3 = new THREE.TextureLoader().load('./img/back-xh.png');
	
	const material1 = new THREE.MeshBasicMaterial({map:texture1});
	const material2 = new THREE.MeshBasicMaterial({map:texture2});
	const material3 = new THREE.MeshBasicMaterial({map:texture3});

	material1.transparent = true;
	material2.transparent = true;
	material3.transparent = true;
	
	var planegeom1 = new THREE.PlaneGeometry(15,15);
	const plane1 = new THREE.Mesh(planegeom1, material1);
	sphere.add( plane1 );
	plane1.position.set(-0.9,0,0);
	plane1.rotateY(Math.PI/2);

	var planegeom2 = new THREE.PlaneGeometry(15.21,15.2);
	const plane2 = new THREE.Mesh(planegeom2, material2);
	sphere.add( plane2 );
	plane2.position.set(-1.2,0,0);
	plane2.rotateY(Math.PI/2);


	var planegeom3 = new THREE.PlaneGeometry(16.5, 16.5);
	const plane3 = new THREE.Mesh(planegeom3, material3);
	sphere.add( plane3 );
	plane3.position.set(-1.5,0,0);
	plane3.rotateY(Math.PI/2);

}

function addBike(){
	loader = new THREE.GLTFLoader();
	loader.load( './glb/buccariderv3.glb', function (gltf){
		var bike = gltf.scene;
		scene.add(bike);
		bike.scale.set(0.6, 0.6, 0.6);
		bike.position.set(0.6,4.9,0);
		bike.rotateY(Math.PI/2);
		},
	);
}	

function render(){
	delta = clock.getDelta();
	updateSphereRotation();
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}

//MAIN
createTiang();
createCityScape();
addBike();
render();
	
