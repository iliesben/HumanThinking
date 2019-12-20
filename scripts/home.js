const scene = new THREE.Scene()
scene.background = new THREE.Color( "white" );
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0,-3.5,5)



const renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild(renderer.domElement)


window.addEventListener('resize', ()=> {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    
        renderer.setSize( window.innerWidth, window.innerHeight );
    
})

      

        
        const light = new THREE.DirectionalLight( 'white', 1 )
        light.position.set( 0, 1, 1 )


        const light2 = new THREE.AmbientLight( 'white', 0.15 );

        
        scene.add(light, light2 )


        const cursor = { x: 0.5, y: 0.5 }

        var loader = new THREE.OBJLoader();
        // load a resource
        loader.load( '../assets/desert.obj',
            // called when resource is loaded
            function ( loadedMesh ) {
                var material = new THREE.MeshLambertMaterial({color: 'white'});

                loadedMesh.children.forEach(function (child) {
                    child.material = material;
                    child.geometry.computeFaceNormals();
                    child.geometry.computeVertexNormals();
                });
                loadedMesh.scale.set(1, 1, 1);
                loadedMesh.position.set(3,-15,5)
                loadedMesh.rotation.set(0.12,0,0)

                // loadedMesh.rotation.y = Math.PI
                
                console.log(loadedMesh)
                
                window.addEventListener('mousemove', (event) =>
                {
                    cursor.x = event.clientX /window.innerWidth - 0.5
                    cursor.y = event.clientY / window.innerHeight - 0.5


                    TweenMax.to(loadedMesh.rotation, 4, {
                        ease : Expo.easeOut,
                        y: cursor.x / 5,
                        x : cursor.y / 10
                    })
                    // loadedMesh.rotation.y = cursor.x / 10
                    // loadedMesh.rotation.x = cursor.y / 10

                })

                scene.add(loadedMesh);                
        });
//Quoi ? Change ce que tu veux


const cone = new THREE.ConeBufferGeometry(2,2,3)
const coneMaterial = new THREE.MeshPhysicalMaterial({
    color: '#cccccc', 
    flatShading : true,
    roughness: 0.7,
    reflectivity : 1, 
    metalness: 0.5
                        });
const coneMesh = new THREE.Mesh(cone, coneMaterial) 




coneMesh.rotation.set(0, 2.2, 2)
coneMesh.position.set(0,-1, -5) 



// scene.add(coneMesh)



    const animate = () =>
    {
        window.requestAnimationFrame(animate)
        renderer.render(scene, camera)
    }


    animate()



const content = document.querySelector('.home__content')

document.addEventListener('mousemove', ()=> {
    // content.style.transform =  `translate(${(cursor.x) * 20}px, ${(cursor.y) * 20}px)`
    // console.log('pute')

    TweenMax.to(content, 4, {
        ease : Expo.easeOut,
        x: cursor.x * 30,
        y : cursor.y * 30
    })
    
})
