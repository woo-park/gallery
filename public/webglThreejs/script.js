let camera, scene, renderer, controls, mesh_group;

    // init();
    // render();

    // if (image) {
    //     init();
    // } else {
    //     image.addEventListener('load', init);
    // }

    function init() {
        
        scene = new THREE.Scene();

        // create a camera
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(-160, 50, 300);   //back on z axis - up to y
        camera.lookAt(new THREE.Vector3(0, 0, 0));  // scene default is 0,0,0
        // camera.lookAt(scene.position);
        scene.add(camera);

        var planeGeometry1 = new THREE.PlaneGeometry(1000,1000);
        var planeMaterial1 = new THREE.MeshBasicMaterial({
            color: 0x415ff4
        });

        var plane1 = new THREE.Mesh(planeGeometry1, planeMaterial1);
        plane1.rotation.x = -0.5 * Math.PI;
        plane1.position.set(0, 10, 0);
        plane1.receiveShadow = true;
        scene.add(plane1);

        // create a cube
        var cubeGeometry = new THREE.BoxGeometry(40, 40, 40);
        var cubeMaterial = new THREE.MeshBasicMaterial({color: 0xFF0000,wireframe: true});
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        
        cube.position.set(300  , 0, 0);
        cube.castShadow = true;
        scene.add(cube);
        
        // create directionallight
        let directionalLight = new THREE.DirectionalLight(0xf45642, 1); // color, intensity   //similar to sun
        directionalLight.position.set(1, 1, 1); // location x, y, z
        scene.add(directionalLight);

        var spotLight = new THREE.SpotLight(0xf4b642);
        spotLight.position.set(40, 400, 300);
        spotLight.castShadow = true;
        spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
        spotLight.shadow.camera.far = 3000;
        spotLight.shadow.camera.near = 1000;
        scene.add(spotLight);

        

        var spotLight3 = new THREE.SpotLight(0xf4b642);
        spotLight3.position.set(100, 250, 10);
        spotLight3.castShadow = true;
        spotLight3.shadow.mapSize = new THREE.Vector2(1024, 1024);
        spotLight3.shadow.camera.far = 1000;
        spotLight3.shadow.camera.near = 40;
        scene.add(spotLight3);

        // add subtle ambient lighting
        var ambientLight = new THREE.AmbientLight(0x3c3c3c);
        scene.add(ambientLight);

        //shows where the spotLight is coming
        let debugCamera = new THREE.CameraHelper(spotLight.shadow.camera);
        // scene.add(debugCamera);

        //page 96
        let helper = new THREE.DirectionalLightHelper(spotLight);
        // scene.add(helper);

        //linear fog // nothing is happening
        scene.fog = new THREE.Fog(0xffffff, 1, 900);

        //renderer
        renderer = new THREE.WebGLRenderer({alpha: 1, antialias: true});
        renderer.setClearColor(new THREE.Color(0x000000));  
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;

        document.getElementById("webgl-output").appendChild(renderer.domElement);
        let trackballControls = initTrackballControls(camera, renderer);
        let clock = new THREE.Clock();

        function initTrackballControls(camera, renderer) {
            var trackballControls = new THREE.TrackballControls(camera, renderer.domElement);
            trackballControls.rotateSpeed = 1.0;
            trackballControls.zoomSpeed = 1.2;
            trackballControls.panSpeed = 0.8;
            trackballControls.noZoom = false;
            trackballControls.noPan = false;
            trackballControls.staticMoving = true;
            trackballControls.dynamicDampingFactor = 0.3;
            trackballControls.keys = [65, 83, 68];

            return trackballControls;
        }

        

//from mhere
        function addLargeGroundPlane(scene, useTexture) {

        // var withTexture = (useTexture !== undefined) ? useTexture : false;

        // create the ground plane
        var planeGeometry = new THREE.PlaneGeometry(1000, 1000);
        var planeMaterial = new THREE.MeshPhongMaterial({
            color: 0x2d2d2d
        });
        // if (withTexture) {
        //     var textureLoader = new THREE.TextureLoader();
        //     planeMaterial.map = textureLoader.load("./forest-texture.jpg");
        //     planeMaterial.map.wrapS = THREE.RepeatWrapping; 
        //     planeMaterial.map.wrapT = THREE.RepeatWrapping; 
        //     planeMaterial.map.repeat.set(80,80)
        // }
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;  
        plane.position.y = -2000;
        // rotate and position the plane
        plane.rotation.x = -0.5 * Math.PI;
        // plane.position.x = 0;
       
        // plane.position.z = 0;

        scene.add(plane);
        return plane;
        }

        var groundPlane = addLargeGroundPlane(scene)
        // groundPlane.position.y = -30;
        

        var applyMeshNormalMaterial = function(geometry, material) {
            if (!material || material.type !== "MeshLambertMaterial")  {
                // let loader = new THREE.TextureLoader();
                // let material = new THREE.MeshNormalMaterial({
                //     map: loader.load('forest-texture.jpg'),
                //     size: 1000,
                //     side: THREE.DoubleSide
                // })
                material = new THREE.MeshNormalMaterial();
                material.side = THREE.DoubleSide;
            } 
            
            return new THREE.Mesh(geometry, material)
        }
            
        radialWave = function (u, v, optionalTarget) {
        //takes three para
        var result = optionalTarget || new THREE.Vector3();
        var r = 1000;   //size of the plane

        var x = Math.sin(u) * r;      //bc x and z 
        var z = Math.sin(v / 2) * 2 * r;  //for seme reason - /2 mmakes it square
        var y = (Math.sin(u * 7 * Math.PI) + Math.cos(v * 1.5 * Math.PI)) * 90;    //this 2.8 makes it far more drastic
    
        return result.set( x, y, z );
        };
        
        let controls = new function () {
            this.appliedMaterial = applyMeshNormalMaterial
            // this.mesh = new THREE.mesh();
            this.castShadow = true;
            // this.receiveShadow = true;
            this.groundPlaneVisible = true;
            this.slices = 50;
            this.stacks = 50;

            this.renderFunction = "radialWave"

            this.redraw = function () {
            redrawGeometryAndUpdateUI(scene, controls, function() {
                var geom  = new THREE.ParametricGeometry(radialWave, controls.slices, controls.stacks);
                geom.center(); //literally puts it in the center of canvas
                return geom; //yaaaas
            });
            }
            
        };

        function redrawGeometryAndUpdateUI(scene, controls, geomFunction) {
            // guiRemoveFolder(gui, controls.specificMaterialFolder);
            // guiRemoveFolder(gui, controls.currentMaterialFolder);
            if (controls.mesh) scene.remove(controls.mesh)
            var changeMat = eval("(" + controls.appliedMaterial + ")")
            if (controls.mesh) {
                controls.mesh = changeMat(geomFunction(), controls.mesh.material);
            } else {
                controls.mesh = changeMat(geomFunction());
            }
            console.log(controls.mesh,'controls.mesh');
            controls.mesh.castShadow = controls.castShadow;
            scene.add(controls.mesh)
            // controls.currentMaterialFolder = addBasicMaterialSettings(gui, controls, controls.mesh.material);
            // controls.specificMaterialFolder = addSpecificMaterialSettings(gui, controls, controls.mesh.material);
        }
        
        
        // controls.onChange(function(e) {groundPlane.material.visible = e});
        // controls.appliedMaterial();
        console.log(controls.castShadow);
        console.log( controls.groundPlaneVisible);
        
       
        // controls.redraw();

            
// to here

        // let cubePlane = new function () {
        //     var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);

        //     this.addCubePlane = function () {
        //         for (var j = 0; j < (planeGeometry1.parameters.height / 5); j++) {
        //             for (var i = 0; i < planeGeometry1.parameters.width / 5; i++) {
        //                 var rnd = Math.random() * 0.75 + 0.25;
        //                 var cubeMaterial = new THREE.MeshLambertMaterial();
        //                 cubeMaterial.color = new THREE.Color(rnd, 0, 0);
        //                 var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

        //                 cube.position.z = -((planeGeometry1.parameters.height) / 2) + 2 + (j * 5);
        //                 cube.position.x = -((planeGeometry1.parameters.width) / 2) + 2 + (i * 5);
        //                 cube.position.y = 2;

        //                 scene.add(cube);
        //             }
        //         }

        //     }
        // }
        // cubePlane.addCubePlane();   //but due to traverse - all is rotating


        let step = 0;
        var controls2 = new function () {
            this.rotationSpeed = 0.02;
            this.numberOfObjects = scene.children.length;

            this.removeCube = function () {
                var allChildren = scene.children;
                var lastObject = allChildren[allChildren.length - 1];
                if (lastObject instanceof THREE.Mesh) {
                    scene.remove(lastObject);
                    this.numberOfObjects = scene.children.length;
                }
            };

            this.addCube = function () {
                var cubeSize = Math.ceil((Math.random() * 40));
                var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
                var cubeMaterial = new THREE.MeshLambertMaterial({
                    color: Math.random() * 0xffffff
                });
                var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
                cube.castShadow = true;// or do e.castShadow = true  in traverse
                cube.name = "cube-" + scene.children.length;
                // position the cube randomly in the scene
            
                // cube.position.x = Math.round((Math.random() * 3000)) -1500; 
                // cube.position.y = Math.round((Math.random() * 3000)) -1500;

                cube.position.z = Math.round((Math.random() * 1000));
                // add the cube to the scene
                scene.add(cube);
                this.numberOfObjects = scene.children.length;
            };

            this.outputObjects = function () {
                console.log(scene.children);
            }
        };

        
        controls.redraw();
        render();

        function render() {
            // controls2.removeCube();
            controls2.addCube();
            if(controls2.numberOfObjects == 100){
                console.log('done drawing');
                controls2.removeCube();
            }
            // window.addEventListener('click',controls2.addCube);

            step += 0.04;
            scene.traverse(function (e) {
                if (e instanceof THREE.Mesh && e != plane1) {

                    e.position.x = 20 + (60 * (Math.cos(step)));
                    e.position.y = 2 + (30 *(Math.sin(step)));
                    // e.position.z = 2 + (10 * Math.abs(Math.sin(step)));
                    // e.castShadow = true;
                }
                // plane1.receiveShadow = true;
            });

            

            // recursive requestAnimationFrame
            // trackballControls.update(clock.getDelta()); //works now with inittrackballcontrols
            requestAnimationFrame(render);
            renderer.render(scene, camera);
            helper.update();
            
        }

        let date = new Date();
        let timer = date.getDate() * 0.00000001;
        // camera.position.x =   Math.cos(timer);
        camera.position.y =  100+150* Math.sin(timer);           
        // camera.position.x =  600* Math.sin(timer);
        // camera.position.x =  Math.abs(Math.sin(timer));
        
        // camera.position.z =  300;
        // camera.position.z =   Math.sin(timer);


        function onResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        window.addEventListener('resize', onResize, false);

    }   //end of function init

    
    