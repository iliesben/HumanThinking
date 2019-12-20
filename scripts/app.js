  
   let habib, mesh, mesh2, mesh3, mesh4, cube, center,
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 'lightblue' );

    let z = 120
    let zCamera = 0
    let zDesert = 0
    let zParticuls = 0
    let xMeshIcosahedron = 150
    let xMeshTetrahedron = -150
    let xMeshTetrahedron2 = -75 // rouge
    let xMeshOctahedron = 75 //vert
    let xMeshDodecahedron = 0 //blanc



    let camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.set( 0,0, -200)
    


    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );


    CameraControls.install( { THREE: THREE } );

    const clock = new THREE.Clock();

    const cameraControls = new CameraControls( camera, renderer.domElement );
    
    cameraControls.minPolarAngle = Math.PI / 2
    cameraControls.maxPolarAngle = Math.PI / 2
    cameraControls.mouseButtons.wheel= CameraControls.ACTION.NONE
    cameraControls.mouseButtons.right = CameraControls.ACTION.NONE

    cameraControls.moveTo(0,2000, -200, true)

    // cameraControls.minAzimuthAngle = - Math.PI
    // cameraControls.maxAzimuthAngle = Math.PI - 1 

    // let listener = new THREE.AudioListener();
    // camera.add( listener );
    
    // // create a global audio source
    // let sound = new THREE.Audio( listener );
    
    // // load a sound and set it as the Audio object's buffer
    // let audioLoader = new THREE.AudioLoader();
    // audioLoader.load( '../sounds/PNL1.mp3', function( buffer ) {
    //     sound.setBuffer( buffer );
    //     sound.setLoop( true );
    //     sound.setVolume( 0.5 );
    //     sound.play();
    // });
    
    /**
     * World
     */
    particles = []
    particleCount = 2000

    for(i=0; i< particleCount ;i++) {
        cube = new THREE.Mesh(
         new THREE.BoxGeometry( 1, 1, 1 ), 
         new THREE.MeshBasicMaterial( {color: "black", opacity : 1, transparent : true } ) )
        cube.position.x = Math.floor(Math.random()* 1001)-500
        cube.position.y = Math.floor(Math.random()* 400 - 200 )
        cube.position.z = Math.floor(Math.random()* -1001)-500
        scene.add( cube );
        particles.push(cube)        
    }  
    let paticlesMove = ( ) =>{
        particles.forEach(function(event) {
            event.position.z  +=  2501
        })
    }  

    const geometry = new THREE.BoxBufferGeometry( 50, 50, 1000 );
    const material = new THREE.MeshBasicMaterial( { color: 0xACAFB8, side: THREE.DoubleSide } );
    const material2 = new THREE.MeshBasicMaterial( { color: 0xACAFB8, side: THREE.DoubleSide } );

    mesh = new THREE.Mesh( geometry, material );
    mesh.position.set( 175, -45, 550 );
    mesh.rotation.y  =  Math.PI / 12


    mesh2 =new THREE.Mesh( geometry, material2 );
    mesh2.position.set( -175, -45 , 550 );
    mesh2.rotation.y  = Math.PI / -12
    

    // scene.add(mesh, mesh2)


    const CircleGeometry = new THREE.CircleGeometry( 200, 200)
    const CircleMaterial = new THREE.MeshBasicMaterial( { color: 0xACAFB8, side : THREE.DoubleSide } );
    const circle = new THREE.Mesh( CircleGeometry, CircleMaterial );
    circle.position.set( 0, -20 , 0 );
    circle.rotation.x = Math.PI / 2

    ////////////////////////////////////////////////////////

    ///// JAUNE
    const radius = 25;
    const geometryIcosahedron = new THREE.IcosahedronBufferGeometry(radius);
    const MaterialIcosahedron =new THREE.MeshPhongMaterial( { color: 'orange', emissive: 0x2e2727, side: THREE.DoubleSide, flatShading: true,  transparent: true, opacity : 1} );
    const meshIcosahedron = new THREE.Mesh( geometryIcosahedron, MaterialIcosahedron );
    meshIcosahedron.position.set( xMeshIcosahedron,10,z)
    scene.add( meshIcosahedron );

    //////  VERT
    const GeometryOctahedron = new THREE.OctahedronBufferGeometry(25,0)
    const MaterialOctahedron =new THREE.MeshPhongMaterial( { color: 0x00ffa6, emissive: 0x2e2727, side: THREE.DoubleSide, flatShading: true,  transparent: true, opacity : 0} );
    const meshOctahedron = new THREE.Mesh( GeometryOctahedron, MaterialOctahedron );
    meshOctahedron.position.set( xMeshOctahedron,10,z)
    scene.add( meshOctahedron );

    ////// BLEU
    const geometryTetrahedron = new THREE.TetrahedronBufferGeometry(radius, 1)
    const MaterialTetrahedron =new THREE.MeshPhongMaterial( { color: 0x005aff, emissive: 0x2e2727, side: THREE.DoubleSide, flatShading: true,  transparent: true, opacity : 1} );
    const meshTetrahedron = new THREE.Mesh( geometryTetrahedron, MaterialTetrahedron );
    meshTetrahedron.position.set( xMeshTetrahedron,10,z)

    scene.add( meshTetrahedron );

    /////// ROUGE
    const geometryTetrahedron2 = new THREE.TetrahedronBufferGeometry(radius, 2)
    const MaterialTetrahedron2 =new THREE.MeshPhongMaterial( { color: 0xff2600, emissive: 0x2e2727, side: THREE.DoubleSide, flatShading: true,  transparent: true, opacity : 0 } );
    const meshTetrahedron2 = new THREE.Mesh( geometryTetrahedron2, MaterialTetrahedron2 );
    meshTetrahedron2.position.set( xMeshTetrahedron2,10,z)

    scene.add( meshTetrahedron2 ); 

    ///// BLANC
    const GeometryDodecahedron = new THREE.DodecahedronBufferGeometry(25, 0)
    const MaterialDodecahedron =new THREE.MeshPhongMaterial( { color: 'white', emissive: 0x2e2727, side: THREE.DoubleSide, flatShading: true , transparent: true, opacity : 0} );
    const meshDodecahedron = new THREE.Mesh( GeometryDodecahedron, MaterialDodecahedron );
    meshDodecahedron.position.set( xMeshDodecahedron,10,z)

    scene.add( meshDodecahedron );
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // lights

    const light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( -1, -1, -1 )
    scene.add( light );

    const light2 = new THREE.DirectionalLight( 0xffffff );
    light2.position.set( 1, 1, 1 );
    scene.add( light2 );

    const light3 = new THREE.AmbientLight( 0x222222 );
    scene.add( light3 );

       let loader = new THREE.OBJLoader();
        // load a resource
        loader.load( '../assets/desert.obj',
            // called when resource is loaded
            function ( loadedMesh ) {
                let material = new THREE.MeshLambertMaterial({color: 'white', flatShading : true});

                loadedMesh.children.forEach(function (child) {
                    child.material = material;
                    child.geometry.computeFaceNormals();
                    child.geometry.computeVertexNormals();
                });
                loadedMesh.scale.set(6, 1, 4);
                loadedMesh.position.set(0,-35,5)
                
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
                    TweenMax.to(meshIcosahedron.rotation, 4, {
                        ease : Expo.easeOut,
                        y: cursor.x * 5,
                        x : cursor.y * 10
                    })
                    TweenMax.to(meshTetrahedron2.rotation, 4, {
                        ease : Expo.easeOut,
                        y: cursor.x * -2.5,
                        x : cursor.y * -5
                    })
                    TweenMax.to(meshTetrahedron.rotation, 4, {
                        ease : Expo.easeOut,
                        y: cursor.x * -5,
                        x : cursor.y * - 10
                    })
                    TweenMax.to(meshOctahedron.rotation, 4, {
                        ease : Expo.easeOut,
                        y: cursor.x * 2.5,
                        x : cursor.y * 5
                    })
                    TweenMax.to(meshDodecahedron.rotation, 2, {
                        ease : Expo.easeOut,
                        y: cursor.x * 1.5,
                        x : cursor.y * 2
                    })

                    
                    // loadedMesh.rotation.y = cursor.x / 10
                    // loadedMesh.rotation.x = cursor.y / 10
                })
                loadedMeshZ = () =>
                {
                    zDesert+= 2500
                    loadedMesh.position.z = zDesert
                }
                scene.add(loadedMesh);                
        });
/**
 * Cursor
 */
const cursor = { x: 0.5, y: 0.5 }


window.addEventListener('resize', ()=> {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

})

// console.log(controls);


const animate = () => {
    requestAnimationFrame( animate );
    // camera.position.x = cursor.x * 10
    // camera.position.y = cursor.y * 10
    // console.log(controls.targ);    
    meshIcosahedron.rotation.x -= 0.005;
    meshIcosahedron.rotation.y += 0.005;
    meshTetrahedron.rotation.x -= 0.005;
    meshTetrahedron.rotation.y -= 0.005;
    meshTetrahedron2.rotation.x += 0.005;
    meshTetrahedron2.rotation.y -= 0.005;
    meshOctahedron.rotation.x += 0.005;
    meshOctahedron.rotation.y += 0.005;
    meshDodecahedron.rotation.x -= 0.005;
    meshDodecahedron.rotation.y += 0.005;
    const delta = clock.getDelta();
    const elapsed = clock.getElapsedTime();
    const updated = cameraControls.update( delta );

    // if ( elapsed > 30 ) { return; }

    if ( updated ) {

        renderer.render( scene, camera );

    }
    
    render();
}
function render() {
    renderer.render( scene, camera );
}

animate();

let $firstPage = document.querySelector('.firstPage')
let $continuerClick = document.querySelector('.continuerClick')


$continuerClick.addEventListener('click', () =>
{
    maintheme.play()
    maintheme.volume = 0.8
    $firstPage.style.display= 'none'
    cameraControls.moveTo(0,0, 0, true)
        questions[0].style.display= 'block'
        answers[0].style.display= 'block'
        answers[1].style.display= 'block'     

})









/**
 * SI vous lisez ce script vous aller en enfer ( PS : on avait pas le temps ) 
 *      Lucifer
 */

let questions  = document.querySelectorAll(`.game__content`)
let answers = document.querySelectorAll(`.game__content__answer-number`)


let gameContainer = document.querySelector(".gameContainer")

let answer1Q1 = gameContainer.querySelector('.answer1-q1')
let answer2Q1 = gameContainer.querySelector('.answer2-q1')

let answer1Q2 = gameContainer.querySelector('.answer1-q2')
let answer2Q2 = gameContainer.querySelector('.answer2-q2')
let answer3Q2 = gameContainer.querySelector('.answer3-q2')

let answer1Q3 = gameContainer.querySelector('.answer1-q3')
let answer2Q3 = gameContainer.querySelector('.answer2-q3')
let answer3Q3 = gameContainer.querySelector('.answer3-q3')

let answer1Q4 = gameContainer.querySelector('.answer1-q4')
let answer2Q4 = gameContainer.querySelector('.answer2-q4')
let answer3Q4 = gameContainer.querySelector('.answer3-q4')

let answer1Q5 = gameContainer.querySelector('.answer1-q5')
let answer2Q5 = gameContainer.querySelector('.answer2-q5')
let answer3Q5 = gameContainer.querySelector('.answer3-q5')
let answer4Q5 = gameContainer.querySelector('.answer4-q5')

let answer1Q6 = gameContainer.querySelector('.answer1-q6')
let answer2Q6 = gameContainer.querySelector('.answer2-q6')
let answer4Q6 = gameContainer.querySelector('.answer4-q6')


let answer1Q7 = gameContainer.querySelector('.answer1-q7')
let answer2Q7 = gameContainer.querySelector('.answer2-q7')
let answer4Q7 = gameContainer.querySelector('.answer4-q7')
let answer6Q7 = gameContainer.querySelector('.answer6-q7')


let answer1Q8 = gameContainer.querySelector('.answer1-q8')
let answer2Q8 = gameContainer.querySelector('.answer2-q8')
let answer3Q8 = gameContainer.querySelector('.answer3-q8')

let answer1Q9 = gameContainer.querySelector('.answer1-q9')
let answer2Q9 = gameContainer.querySelector('.answer2-q9')
let answer3Q9 = gameContainer.querySelector('.answer3-q9')
let answer4Q9 = gameContainer.querySelector('.answer4-q9')

let answer1Q10 =  gameContainer.querySelector('.answer1-q10')
let answer2Q10 =  gameContainer.querySelector('.answer2-q10')
let answer3Q10 =  gameContainer.querySelector('.answer3-q10')
let answer4Q10 =  gameContainer.querySelector('.answer4-q10')
let answer6Q10 =  gameContainer.querySelector('.answer6-q10')

let answer1Q11 = gameContainer.querySelector('.answer1-q11')
let answer2Q11 = gameContainer.querySelector('.answer2-q11')
let answer3Q11 = gameContainer.querySelector('.answer3-q11')

// let answer1Q11Bis = gameContainer.querySelector('.answer1-q11Bis')
// let answer2Q11Bis = gameContainer.querySelector('.answer2-q11Bis')
// let answer3Q11Bis = gameContainer.querySelector('.answer3-q11Bis')

let answer1Q12 = gameContainer.querySelector('.answer1-q12')
let answer2Q12 = gameContainer.querySelector('.answer2-q12')
let answer3Q12 = gameContainer.querySelector('.answer3-q12')

let answer1Q13 = gameContainer.querySelector('.answer1-q13')
let answer2Q13 = gameContainer.querySelector('.answer2-q13')
let answer3Q13 = gameContainer.querySelector('.answer3-q13')

let question1 = document.querySelector('.question1')
let question2 = document.querySelector('.question2')

for (let i = 0; i < 13; i++) {
    questions[i].style.display = 'none'
    // questions[i].style.opacity = '0'
}

for (let i = 0; i < 43; i++) { 
    answers[i].style.display = 'none'
}


const audioclick = new Audio ('../sounds/Blop-Mark_DiAngelo-79054334.mp3')

const maintheme =  new Audio ('../sounds/firewatch-ost-cottonwood-hike.mp3')
const stresstheme = new Audio ('../sounds/firewatch-ost-thorofare-hike.mp3')

let musicChange = () =>
{
    setTimeout(() =>
    {
        maintheme.pause()
        stresstheme.play()
        stresstheme.volume = 0.8
    },1000)   
} 
let geometry1 = true
let geometry2 = true

let geometry3 = false
let geometry4 = false


let debloqueR4Q5 = false
let debloqueR4Q6 = false
let debloqueR4Q7 = false
let debloqueR3Q9= false 
let debloqueQ11bis  = false

let debloqueR5Q7 = false
// let debloqueR6Q10 = false
let debloqueR3Q11 = false
// let debloqueR3Q11Bis = false
let debloqueR3Q12 = false


answer1Q1.addEventListener('click', () =>{
    audioclick.play()
    audioclick.volume = 1
    debloqueR5Q7 = true
    // debloqueR6Q10 = true
    debloqueR3Q11 = true
    debloqueR3Q11Bis = true 
    debloqueR3Q12 = true
    meshDodecahedronBlancOpacity1()
    movingAnimationUpOrange()
})
answer2Q1.addEventListener('click', ()=>{
    meshDodecahedronBlancOpacity1()
    movingAnimationUpBlue()
})
answer1Q2.addEventListener ('click', () =>{
    movingAnimationUpOrange()
})
answer2Q2.addEventListener ('click', () =>{
    movingAnimationUpWhite()
})
answer3Q2.addEventListener ('click', () =>{
    movingAnimationUpBlue()
})

answer1Q3.addEventListener ('click', () =>{
    movingAnimationUpOrange()
    debloqueR4Q5 = true
    console.log(debloqueR4Q5)
})
answer2Q3.addEventListener ('click', () =>{
    movingAnimationUpWhite()
})

answer3Q3.addEventListener ('click', () =>{
    movingAnimationUpBlue()
})

answer1Q4.addEventListener ('click', () =>{
    movingAnimationUpOrange()
    if( debloqueR4Q5 == true)
    {
        meshTetrahedron2RougeOpacity1()
    }
})

answer2Q4.addEventListener ('click', () =>{ 
    debloqueR4Q6 = true
    movingAnimationUpWhite()
    if( debloqueR4Q5 == true)
    {
        meshTetrahedron2RougeOpacity1()
    }
})

answer3Q4.addEventListener ('click', () =>{
    movingAnimationUpBlue()
    if( debloqueR4Q5 == true)
    {
        meshTetrahedron2RougeOpacity1()
    }})




answer1Q5.addEventListener ('click', () =>{
    movingAnimationUpOrange()
    meshTetrahedron2RougeOpacity0()
    if (debloqueR4Q6 === false) {
        meshDodecahedronBlancOpacity0()
    }
})


answer2Q5.addEventListener ('click', () =>{
    movingAnimationUpWhite()
    meshTetrahedron2RougeOpacity0()
    if (debloqueR4Q6 === false) {
        meshDodecahedronBlancOpacity0()
    }
})
answer3Q5.addEventListener ('click', () =>{
    movingAnimationUpBlue()
    meshTetrahedron2RougeOpacity0()
    if (debloqueR4Q6 === false) {
        meshDodecahedronBlancOpacity0()
    }
})
answer4Q5.addEventListener ('click', () =>{
    movingAnimationUpRouge()
    meshTetrahedron2RougeOpacity0()
    if (debloqueR4Q6 === false) {
        meshDodecahedronBlancOpacity0()
    }
})


answer1Q6.addEventListener ('click', () =>{
    movingAnimationUpOrange()
    meshDodecahedronBlancOpacity1()
        if (debloqueR4Q7 === true) {
        meshTetrahedron2RougeOpacity1()
        }
})

answer2Q6.addEventListener ('click', () =>{
    movingAnimationUpBlue()
    meshDodecahedronBlancOpacity1()
    debloqueR4Q7 = true
        if (debloqueR4Q7 === true) {
        meshTetrahedron2RougeOpacity1()
        }
})

answer4Q6.addEventListener ('click', () =>{
    movingAnimationUpWhite()
    meshDodecahedronBlancOpacity1()
        if (debloqueR4Q7 === true) {
        meshTetrahedron2RougeOpacity1()
        }
})

answer1Q7.addEventListener ('click', () =>{
    movingAnimationUpOrange()
    meshTetrahedron2RougeOpacity0()
})

answer2Q7.addEventListener ('click', () =>{
    movingAnimationUpWhite()
    meshTetrahedron2RougeOpacity0()

})

answer4Q7.addEventListener ('click', () =>{
        movingAnimationUpRouge()
        meshTetrahedron2RougeOpacity0()
})

answer6Q7.addEventListener ('click', () =>{
    movingAnimationUpBlue()
    meshTetrahedron2RougeOpacity0()
})

answer1Q8.addEventListener ('click', () =>{
    movingAnimationUpOrange()
    if (debloqueR3Q9 === true) {
        meshTetrahedron2RougeOpacity1()
    }
})
answer2Q8.addEventListener ('click', () =>{
    movingAnimationUpWhite()
    if (debloqueR3Q9 === true) {
        meshTetrahedron2RougeOpacity1()
    }
})

answer3Q8.addEventListener ('click', () =>{
    movingAnimationUpBlue()
    debloqueR3Q9 = true
    if (debloqueR3Q9 === true) {
        meshTetrahedron2RougeOpacity1()
    }
})


answer1Q9.addEventListener ('click', () =>{
    musicChange()
    movingAnimationUpOrange()
    meshTetrahedron2RougeOpacity1()
    meshOctahedronVertOpacity1()
})
answer2Q9.addEventListener ('click', () =>{
    musicChange()
    movingAnimationUpBlue()
    meshTetrahedron2RougeOpacity1()
    meshOctahedronVertOpacity1()
})
answer4Q9.addEventListener ('click', () =>{
    musicChange()
    movingAnimationUpWhite()
    meshTetrahedron2RougeOpacity1()
    meshOctahedronVertOpacity1()
})
answer3Q9.addEventListener ('click', () =>{
    musicChange()
    movingAnimationUpRouge()
    meshTetrahedron2RougeOpacity1()
    meshOctahedronVertOpacity1()
})


answer1Q10.addEventListener ('click', () =>{
    movingAnimationUpOrange()
    meshOctahedronVertOpacity0()
    meshTetrahedron2RougeOpacity0()
    if ( debloqueR3Q11 === false)
    {
        meshDodecahedronBlancOpacity0()
    }
})
answer2Q10.addEventListener ('click', () =>{
    movingAnimationUpVert()
    meshOctahedronVertOpacity0()
    meshTetrahedron2RougeOpacity0()
    if ( debloqueR3Q11 === false)
    {
        meshDodecahedronBlancOpacity0()
    }
})
answer3Q10.addEventListener ('click', () =>{
    movingAnimationUpWhite()
    meshOctahedronVertOpacity0()
    meshTetrahedron2RougeOpacity0()
    if ( debloqueR3Q11 === false)
    {
        meshDodecahedronBlancOpacity0()
    }
})
answer4Q10.addEventListener ('click', () =>{
    movingAnimationUpRouge()
    meshOctahedronVertOpacity0()
    meshTetrahedron2RougeOpacity0()
    if ( debloqueR3Q11 === false)
    {
        meshDodecahedronBlancOpacity0()
    }
})
answer6Q10.addEventListener ('click', () =>{
    movingAnimationUpBlue()
    meshOctahedronVertOpacity0()
    meshTetrahedron2RougeOpacity0()
    if ( debloqueR3Q11 === false)
    {
        meshDodecahedronBlancOpacity0()
    }
})


answer1Q11.addEventListener ('click', () =>{
    movingAnimationUpOrange()
    if (debloqueR3Q12 === false) {
        meshDodecahedronBlancOpacity0()
    }

})

answer2Q11.addEventListener ('click', () =>{
    movingAnimationUpBlue()
    if (debloqueR3Q12 === false) {
        meshDodecahedronBlancOpacity0()
    }
})

answer3Q11.addEventListener ('click', () =>{
    movingAnimationUpWhite()
    if (debloqueR3Q12 === false) {
        meshDodecahedronBlancOpacity0()
    }
})

answer1Q12.addEventListener('click', ()  =>
{
    movingAnimationUpOrange()
    meshDodecahedronBlancOpacity1()

})
answer2Q12.addEventListener('click', ()  =>
{
    movingAnimationUpBlue()
    meshDodecahedronBlancOpacity1()
})
answer3Q12.addEventListener('click', ()  =>
{
    movingAnimationUpWhite()
    meshDodecahedronBlancOpacity1()
})

answer1Q13.addEventListener('click', ()  =>
{
    stresstheme.volume = 0.3
    movingAnimationUpOrangeEnd()
    endGame()
    
})

answer2Q13.addEventListener('click', ()  =>
{
    stresstheme.volume = 0.3
    movingAnimationUpWhiteEnd()
    endGame()
    
})

answer3Q13.addEventListener('click', ()  =>
{
    stresstheme.volume = 0.3
    movingAnimationUpBlueEnd()
    endGame()
    
})



 // 11 BIS PAS ENCORE FAIT 

//  console.log(audioClick);

let compteur = 0

answers.forEach(function(event) {
    event.addEventListener('click', () =>
    {
        audioclick.play()
        audioclick.volume = 1
        questions[compteur].style.display = 'none'
        // questions[compteur].style.opacity = 1
        // audioClick.play()
        compteur++
        
        //** QUESTION 1 & 2 
        switch (compteur) {
            case 1:    
                    questions[compteur].style.display = 'block'
                    answer1Q1.style.display = 'none'
                    answer2Q1.style.display = 'none'
                    answer1Q2.style.display = 'block'
                    answer2Q2.style.display = 'block'
                    answer3Q2.style.display = 'block'

            break
            case 2 :    
                    questions[compteur].style.display = 'block'
                    answer1Q2.style.display = 'none'
                    answer2Q2.style.display = 'none'
                    answer3Q2.style.display = 'none'
                    answer1Q3.style.display = 'block'
                    answer2Q3.style.display = 'block'
                    answer3Q3.style.display = 'block'
            break
            case 3 :    
                    questions[compteur].style.display = 'block'
                    answer1Q3.style.display = 'none'
                    answer2Q3.style.display = 'none'
                    answer3Q3.style.display = 'none'
                    answer1Q4.style.display = 'block'
                    answer2Q4.style.display = 'block'
                    answer3Q4.style.display = 'block'
            break
            case 4 :    
                    questions[compteur].style.display = 'block'
                    answer1Q4.style.display = 'none'
                    answer2Q4.style.display = 'none'
                    answer3Q4.style.display = 'none'
                    answer1Q5.style.display = 'block'
                    answer2Q5.style.display = 'block'
                    answer3Q5.style.display = 'block'
                    if(debloqueR4Q5 === true){
                        answer4Q5.style.display = 'block'
                    }
            break
            case 5 :    
                    questions[compteur].style.display = 'block'
                    answer1Q5.style.display = 'none'
                    answer2Q5.style.display = 'none'
                    answer3Q5.style.display = 'none'
                    answer4Q5.style.display = 'none'
                    answer1Q6.style.display = 'block'
                    answer2Q6.style.display = 'block'
                    if (debloqueR4Q6 === true){
                        answer4Q6.style.display = 'block'
                        }
            break
            case 6 :     
                    questions[compteur].style.display = 'block'
                    answer1Q6.style.display = 'none'
                    answer2Q6.style.display = 'none'
                    answer4Q6.style.display = 'none'
            
                    answer1Q7.style.display = 'block'
                    answer2Q7.style.display = 'block'
                    if(debloqueR4Q7 === true){
                        answer4Q7.style.display = 'block'
                    }
                    answer6Q7.style.display = 'block'

            break       
            case 7:     
                    questions[compteur].style.display = 'block'
                    answer1Q7.style.display = 'none'
                    answer2Q7.style.display = 'none'
                    answer4Q7.style.display = 'none'
                    answer6Q7.style.display = 'none'

                    answer1Q8.style.display = 'block'
                    answer2Q8.style.display = 'block'
                    answer3Q8.style.display = 'block'
            break
            case 8 :    
                    questions[compteur].style.display = 'block'
                    answer1Q8.style.display = 'none'
                    answer2Q8.style.display = 'none'
                    answer3Q8.style.display = 'none'

                    answer1Q9.style.display = 'block'
                    answer2Q9.style.display = 'block'
                    answer4Q9.style.display = 'block'
                    if(debloqueR3Q9 === true){
                        answer3Q9.style.display = 'block'
                    }
            break
            case 9 :
                    questions[compteur].style.display = 'block'
                    answer1Q9.style.display = 'none'
                    answer2Q9.style.display = 'none'
                    answer3Q9.style.display = 'none'
                    answer4Q9.style.display = 'none'
                    answer1Q10.style.display = 'block'
                    answer2Q10.style.display = 'block'
                    answer3Q10.style.display = 'block'
                    answer4Q10.style.display = 'block'
                    answer6Q10.style.display = 'block'
            break
            case 10 :
                    questions[compteur].style.display = 'block'
                    answer1Q10.style.display = 'none'
                    answer2Q10.style.display = 'none'
                    answer3Q10.style.display = 'none'
                    answer4Q10.style.display = 'none'
                    answer6Q10.style.display = 'none'
                    answer1Q11.style.display = 'block'
                    answer2Q11.style.display = 'block'
                    if (debloqueR3Q11) {
                        answer3Q11.style.display = 'block'
                    }
                    
            break
            case 11 :
                    questions[compteur].style.display = 'block'
                    answer1Q11.style.display = 'none'
                    answer2Q11.style.display = 'none'
                    answer3Q11.style.display = 'none'

                    answer1Q12.style.display = 'block'
                    answer2Q12.style.display = 'block'
                    if (debloqueR3Q12) {
                        answer3Q12.style.display = 'block'
                    }
                    
            break
            case 12 :
                    questions[compteur].style.display = 'block'
                    // console.log(questions[compteur]);
                    answer1Q12.style.display = 'none'
                    answer2Q12.style.display = 'none'
                    answer3Q12.style.display = 'none'
                    answer1Q13.style.display = 'block'
                    answer2Q13.style.display = 'block'
                    answer3Q13.style.display = 'block' 
            break
            default:
                    for (let i = 1; i < 13; i++) {
                        questions[i].style.display=  'none'
                    }
                    
                    for (let i = 2; i < 43; i++) { ///WESSSSSHHHHHH C QUOI CA ?
                        answers[i].style.display = 'none'
                    }
                    compteur = -10
            break
        }
    })

})

let $endPage1 = document.querySelector('.endPage1')
let $endPage2 = document.querySelector('.endPage2')
let $endPage3 = document.querySelector('.endPage3')

endGame = () =>
{
    setTimeout(() =>
    {
        $endPage1.style.display = 'block'
    },1700)
}

$continuerClick2= document.querySelector('.continuerClick2')
$continuerClick3 = document.querySelector('.continuerClick3')

$continuerClick2.addEventListener('click', () =>
{
    $endPage1.style.display ="none"
    setTimeout(() =>
    {
        $endPage2.style.display = 'block'
    },200)
})

$continuerClick3.addEventListener('click', () =>
{
    $endPage2.style.display ="none"
    setTimeout(() =>
    {
        $endPage3.style.display = 'block'
    },200)
})




movingAnimationUpBlue = () =>
{  
        cameraControls.rotateTo( Math.PI, Math.PI, true )
        cameraControls.moveTo(xMeshTetrahedron,10, zCamera + 300, true)
    setTimeout(( ) => 
    {
        loadedMeshZ()
        scene.background = new THREE.Color( 0x005aff );
        paticlesMove()
    zCamera += 2500
    moveAllGeometry()
    cameraControls.moveTo(0,10, zCamera, true)
    },1200)
    questions[compteur+1].style.animation = 'gameCounterKey 4s ease-in'
}

movingAnimationUpOrange = () =>
{  
        cameraControls.rotateTo( Math.PI, Math.PI, true )
        cameraControls.moveTo(xMeshIcosahedron,10, zCamera + 300, true)
    setTimeout(( ) => 
    {
        loadedMeshZ()
        scene.background = new THREE.Color( 'orange' );
        paticlesMove()
    zCamera += 2500
    moveAllGeometry()
    cameraControls.moveTo(0,10, zCamera, true)
    },1200)
    questions[compteur+1].style.animation = 'gameCounterKey 4s ease-in'
}


movingAnimationUpWhite = () =>
{ 
        cameraControls.rotateTo( Math.PI, Math.PI, true )
        cameraControls.moveTo(xMeshDodecahedron,10, zCamera + 320, true)

            setTimeout(( ) => 
    {
        loadedMeshZ()
        scene.background = new THREE.Color( 'white' );
        paticlesMove()
        zCamera += 2500
        moveAllGeometry()
        cameraControls.moveTo(0,10, zCamera, true)
        },1200)
        questions[compteur+1].style.animation = 'gameCounterKey 4s ease-in'
}
 
movingAnimationUpRouge= () =>
{ 

        cameraControls.rotateTo( Math.PI, Math.PI, true )
        cameraControls.moveTo( xMeshTetrahedron2, 10 ,zCamera + 320, true)
    setTimeout(( ) => 
    {
        loadedMeshZ()
        scene.background = new THREE.Color( 0xff2600 );
        paticlesMove()
        zCamera += 2500
        moveAllGeometry()
        cameraControls.moveTo(0,10, zCamera, true)
    },1200)
    questions[compteur+1].style.animation = 'gameCounterKey 4s ease-in'
}

movingAnimationUpVert = () =>
{ 
        cameraControls.rotateTo( Math.PI, Math.PI, true )
        cameraControls.moveTo(xMeshOctahedron,10, zCamera + 320, true)
    setTimeout(( ) => 
    {
        loadedMeshZ()
        scene.background = new THREE.Color( 0x00ffa6 );
        paticlesMove()
        zCamera += 2500
        moveAllGeometry()
        cameraControls.moveTo(0,10, zCamera, true)
        },1200)
        questions[compteur+1].style.animation = 'gameCounterKey 4s ease-in'
}


movingAnimationUpOrangeEnd = () => {
    cameraControls.rotateTo( Math.PI, Math.PI, true )
    cameraControls.moveTo(xMeshIcosahedron,10, zCamera + 300, true)
        setTimeout(( ) => 
    {
        paticlesMove()
        scene.background = new THREE.Color( 'orange' );
        zCamera += 2500
        cameraControls.moveTo(0,2000, zCamera, true)
        },1400)
}
movingAnimationUpWhiteEnd = () => {
    cameraControls.rotateTo( Math.PI, Math.PI, true )
    cameraControls.moveTo(xMeshDodecahedron,10, zCamera + 320, true)
        setTimeout(( ) => 
    {
        paticlesMove()
        scene.background = new THREE.Color( 'white' );
        zCamera += 2500
        cameraControls.moveTo(0,2000, zCamera, true)
        },1400)

}
movingAnimationUpBlueEnd = () => {
    cameraControls.rotateTo( Math.PI, Math.PI, true )
    cameraControls.moveTo(xMeshTetrahedron,10, zCamera + 300, true)
        setTimeout(( ) => 
    {
        paticlesMove()
        scene.background = new THREE.Color( 0x005aff );
        zCamera += 2500
        cameraControls.moveTo(0,2000, zCamera, true)
        },1400)

}

moveAllGeometry = () =>
{
    z += 2500
    meshTetrahedron.position.z = z
    meshDodecahedron.position.z = z
    meshIcosahedron.position.z = z
    meshTetrahedron2.position.z = z
    meshOctahedron.position.z = z
    meshIcosahedron.position.x = xMeshIcosahedron 
    meshTetrahedron.position.x = xMeshTetrahedron
    meshTetrahedron2.position.x = xMeshTetrahedron2 
    meshOctahedron.position.x = xMeshOctahedron
    meshDodecahedron.position.x = xMeshDodecahedron
    // console.log(meshTetrahedron.position)
}



// BLEU 
meshTetrahedronBleuOpacity0 = ( ) => 
{
    TweenMax.to(meshTetrahedron.material, 2, {
        ease : Expo.easeOut,
        opacity : 0
    })
}

// BLANC
meshDodecahedronBlancOpacity0 = ( ) => 
{
    setTimeout( ( ) =>
    {
        TweenMax.to(meshDodecahedron.material, 0.5, {
            ease : Expo.easeOut,
            opacity : 0
        }) 
    },1000)
}
/// JAUNE
meshIcosahedronJauneOpacity0 = () => 
{
    TweenMax.to(meshIcosahedron.material, 0.5, {
        ease : Expo.easeOut,
        opacity : 0
    })
}
//rouge
meshTetrahedron2RougeOpacity0 = () =>
{ 
    setTimeout( ( ) =>
    {
        TweenMax.to(meshTetrahedron2.material, 1, {
            ease : Expo.easeOut,
            opacity : 0
        }) 
    },1000)
}

/// VERT
meshOctahedronVertOpacity0 = () =>
{ 
    setTimeout(( ) =>
    {
        TweenMax.to(meshOctahedron.material, 0.5, {
            ease : Expo.easeOut,
            opacity : 0
        }) 
    },1000)
}


// BLEU 
meshTetrahedronBleuOpacity1 = ( ) => 
{
    TweenMax.to(meshTetrahedron.material, 2, {
        ease : Expo.easeOut,
        opacity : 1
    })
}

// BLANC
meshDodecahedronBlancOpacity1 = ( ) => 
{
    setTimeout( ( ) =>
    {
        TweenMax.to(meshDodecahedron.material, 2, {
            ease : Expo.easeOut,
            opacity : 1
        }) 
    },1000)
}
/// JAUNE
meshIcosahedronJauneOpacity1 = () => 
{
    TweenMax.to(meshIcosahedron.material, 2, {
        ease : Expo.easeOut,
        opacity : 1
    })
}
//rouge
meshTetrahedron2RougeOpacity1 = () =>
{ 
    setTimeout( ( ) =>
    {
        TweenMax.to(meshTetrahedron2.material, 2, {
            ease : Expo.easeOut,
            opacity : 1
        }) 
    },1000)
}

/// VERT
meshOctahedronVertOpacity1 = () =>
{ 
    setTimeout(( ) =>
    {
        TweenMax.to(meshOctahedron.material, 2, {
            ease : Expo.easeOut,
            opacity : 1
        }) 
    },1000)
}
