
//     let habib, mesh, mesh2, mesh3, mesh4, cube, center, z = 0
//     scene = new THREE.Scene();
//     scene.background = new THREE.Color( 'lightblue' );

//     var camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 1, 1000);
//     camera.position.set( 0,0, -200)
    


//     renderer = new THREE.WebGLRenderer( { antialias: true } );
//     renderer.setPixelRatio( window.devicePixelRatio );
//     renderer.setSize( window.innerWidth, window.innerHeight );
//     document.body.appendChild( renderer.domElement );


//     CameraControls.install( { THREE: THREE } );

//     const clock = new THREE.Clock();

//     const cameraControls = new CameraControls( camera, renderer.domElement );
    
//     cameraControls.minPolarAngle = Math.PI / 2
//     cameraControls.maxPolarAngle = Math.PI / 2
//     // cameraControls.mouseButtons.wheel= CameraControls.ACTION.NONE
//     // cameraControls.mouseButtons.right = CameraControls.ACTION.NONE

//     // cameraControls.minAzimuthAngle = - Math.PI
//     // cameraControls.maxAzimuthAngle = Math.PI - 1 

   
//     /**
//      * World
//      */
//     particles = []
//     particleCount = 1000

//     for(i=0; i< particleCount ;i++) {
//         cube = new THREE.Mesh(
//          new THREE.BoxGeometry( 1, 1, 1 ), 
//          new THREE.MeshBasicMaterial( {color: "black", opacity : 0, transparent : true } ) )
//         cube.position.x = Math.floor(Math.random()* 1001)-500
//         cube.position.y = Math.floor(Math.random()* 500 - 250 )
//         cube.position.z = Math.floor(Math.random()* 1001)
//         scene.add( cube );
//         particles.push(cube)        
//     }    

//     const geometry = new THREE.BoxBufferGeometry( 50, 50, 1000 );
//     const material = new THREE.MeshBasicMaterial( { color: 0xACAFB8, side: THREE.DoubleSide } );
//     const material2 = new THREE.MeshBasicMaterial( { color: 0xACAFB8, side: THREE.DoubleSide } );

//     mesh = new THREE.Mesh( geometry, material );
//     mesh.position.set( 175, -45, 550 );
//     mesh.rotation.y  =  Math.PI / 12


//     mesh2 =new THREE.Mesh( geometry, material2 );
//     mesh2.position.set( -175, -45 , 550 );
//     mesh2.rotation.y  = Math.PI / -12
    

//     // scene.add(mesh, mesh2)


//     const CircleGeometry = new THREE.CircleGeometry( 200, 200)
//     const CircleMaterial = new THREE.MeshBasicMaterial( { color: 0xACAFB8, side : THREE.DoubleSide } );
//     const circle = new THREE.Mesh( CircleGeometry, CircleMaterial );
//     circle.position.set( 0, -20 , 0 );
//     circle.rotation.x = Math.PI / 2
//     // scene.add( circle );


//     const geometryTrans = new THREE.BoxBufferGeometry( 20, 20, 20 );
//     const materiaTransl = new THREE.MeshBasicMaterial( { color: 'blue', side: THREE.DoubleSide } );
//     const trans = new THREE.Mesh( geometryTrans, materiaTransl );
//     trans.position.set( 0, 20 , 100 );
//     trans.rotation.x = Math.PI / 2
//     // scene.add( trans );

//     const radius = 20;
//     const geometryIcosahedron = new THREE.IcosahedronBufferGeometry(radius);
//     const MaterialIcosahedron = new THREE.MeshBasicMaterial( { color: 0xACAFB8, side : THREE.DoubleSide } );
//     const Icosahedron = new THREE.Mesh( geometryIcosahedron, MaterialIcosahedron );
//     Icosahedron.position.set( 130,10,120)
//     scene.add( Icosahedron );

//     // lights

//     const light = new THREE.DirectionalLight( 0xffffff );
//     light.position.set( -1, -1, -1 )
//     scene.add( light );

//     const light2 = new THREE.DirectionalLight( 0xffffff );
//     light2.position.set( 1, 1, 1 );
//     scene.add( light2 );

//     const light3 = new THREE.AmbientLight( 0x222222 );
//     scene.add( light3 );

//        var loader = new THREE.OBJLoader();
//         // load a resource
//         loader.load( '../assets/desert.obj',
//             // called when resource is loaded
//             function ( loadedMesh ) {
//                 var material = new THREE.MeshLambertMaterial({color: 'white', flatShading : true});

//                 loadedMesh.children.forEach(function (child) {
//                     child.material = material;
//                     child.geometry.computeFaceNormals();
//                     child.geometry.computeVertexNormals();
//                 });
//                 loadedMesh.scale.set(4, 1, 4);
//                 loadedMesh.position.set(0,-35,5)
                
//                 console.log(loadedMesh)
                
//                 window.addEventListener('mousemove', (event) =>
//                 {
//                     cursor.x = event.clientX /window.innerWidth - 0.5
//                     cursor.y = event.clientY / window.innerHeight - 0.5


//                     TweenMax.to(loadedMesh.rotation, 4, {
//                         ease : Expo.easeOut,
//                         y: cursor.x / 5,
//                         x : cursor.y / 10
//                     })
//                     TweenMax.to(Icosahedron.rotation, 4, {
//                         ease : Expo.easeOut,
//                         y: cursor.x / -5,
//                         x : cursor.y / -10
//                     })
//                     // loadedMesh.rotation.y = cursor.x / 10
//                     // loadedMesh.rotation.x = cursor.y / 10

//                 })

//                 scene.add(loadedMesh);                
//         });
// /**
//  * Cursor
//  */
// const cursor = { x: 0.5, y: 0.5 }


// window.addEventListener('resize', ()=> {

//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();

//     renderer.setSize( window.innerWidth, window.innerHeight );

// })

// // console.log(controls);


// const animate = () => {
//     requestAnimationFrame( animate );
//     // camera.position.x = cursor.x * 10
//     // camera.position.y = cursor.y * 10
//     // console.log(controls.targ);    
//     const delta = clock.getDelta();
//     const elapsed = clock.getElapsedTime();
//     const updated = cameraControls.update( delta );

//     // if ( elapsed > 30 ) { return; }

//     if ( updated ) {

//         renderer.render( scene, camera );

//     }
    
//     render();
// }
// function render() {
//     renderer.render( scene, camera );
// }

// document.body.addEventListener("click", (event) =>{
//     cameraControls.moveTo(130,10, 300, true)
//     console.log('o');
// })
// // setInterval(() => {
// //     console.log('cam',camera.position.z)
// //     console.log('tar',controls.target.z);
    
// // },1000)

// // let $ansewer = document.querySelector('.rien')
// // document.body.addEventListener("click", (event) =>{
// // // console.log(controls);
// // // controls.target.set( 0, 0, 0 )
// //     // rotation *= 0.5
// // //     if (controls.object.rotation.y < 1){
// // //         console.log('rot');
// // //     TweenMax.to(  controls.object.rotation, 2, {
// // //         ease :Expo.easeOut,
// // //         y: Math.PI
// // //     })
// // // }    
// // TweenMax.to(mesh2.position, 2, {
// //     ease :  Expo.easeOut,
// //     y: -260 
// // })


// //     TweenMax.to(mesh.position, 2, {
// //         ease :  Expo.easeOut,
// //         x: 0,
// //         y: -44 ,
// //         z: 390 
// //     })
// //     TweenMax.to(mesh.rotation, 2, {
// //         ease :  Expo.easeOut,
// //         y: Math.PI * -1
// //     })

// // // controls.enableRotate = false

// //     habib = () => {
// //         cameraControls.moveTo(0, 2,1000, true )

// //         for (let i = 0; i < particles.length; i++) {
// //             TweenMax.to(particles[i].material, 15, {
// //                 ease : Expo.easeOut,
// //                 opacity : 1,
// //                 transparent : false
// //             })
// //         }
    


// //         // TweenMax.to(camera.position, 4, {
// //         //     //     ease : SlowMo.ease.config(0.6, 0.4, false),
// //         //     //     z: 1000
// //         //     })
// //     }
// //     setTimeout(() => {
// //         habib()
// //     },4000)
    
// //     // 999.8485906960059
// //     // setTimeout(() => {
// //     //     // controls.target.z = 1200
// //     //     // controls.enableRotate = true
// //     // }, 8200)
// //     // setTimeout(() => {
// //     // }, 6400)

    
// // })

// animate();













// /**
//  * SI vous lisez ce script vous aller en enfer ( PS : on avait pas le temps ) 
//  *      Lucifer
//  */

// let questions  = document.querySelectorAll(`.game__content`)
// let answers = document.querySelectorAll(`.game__content__answer-number`)


// let gameContainer = document.querySelector(".gameContainer")

// let answer1Q1 = gameContainer.querySelector('.answer1-q1')
// let answer2Q1 = gameContainer.querySelector('.answer2-q1')

// let answer1Q2 = gameContainer.querySelector('.answer1-q2')
// let answer2Q2 = gameContainer.querySelector('.answer2-q2')
// let answer3Q2 = gameContainer.querySelector('.answer3-q2')

// let answer1Q3 = gameContainer.querySelector('.answer1-q3')
// let answer2Q3 = gameContainer.querySelector('.answer2-q3')
// let answer3Q3 = gameContainer.querySelector('.answer3-q3')

// let answer1Q4 = gameContainer.querySelector('.answer1-q4')
// let answer2Q4 = gameContainer.querySelector('.answer2-q4')
// let answer3Q4 = gameContainer.querySelector('.answer3-q4')

// let answer1Q5 = gameContainer.querySelector('.answer1-q5')
// let answer2Q5 = gameContainer.querySelector('.answer2-q5')
// let answer3Q5 = gameContainer.querySelector('.answer3-q5')
// let answer4Q5 = gameContainer.querySelector('.answer4-q5')

// let answer1Q6 = gameContainer.querySelector('.answer1-q6')
// let answer2Q6 = gameContainer.querySelector('.answer2-q6')
// let answer3Q6 = gameContainer.querySelector('.answer3-q6')
// let answer4Q6 = gameContainer.querySelector('.answer4-q6')

// let answer1Q7 = gameContainer.querySelector('.answer1-q7')
// let answer2Q7 = gameContainer.querySelector('.answer2-q7')
// let answer3Q7 = gameContainer.querySelector('.answer3-q7')
// let answer4Q7 = gameContainer.querySelector('.answer4-q7')
// let answer5Q7 = gameContainer.querySelector('.answer5-q7')
// let answer6Q7 = gameContainer.querySelector('.answer6-q7')


// let answer1Q8 = gameContainer.querySelector('.answer1-q8')
// let answer2Q8 = gameContainer.querySelector('.answer2-q8')
// let answer3Q8 = gameContainer.querySelector('.answer3-q8')

// let answer1Q9 = gameContainer.querySelector('.answer1-q9')
// let answer2Q9 = gameContainer.querySelector('.answer2-q9')
// let answer3Q9 = gameContainer.querySelector('.answer3-q9')
// let answer4Q9 = gameContainer.querySelector('.answer4-q9')

// let answer1Q10 =  gameContainer.querySelector('.answer1-q10')
// let answer2Q10 =  gameContainer.querySelector('.answer2-q10')
// let answer3Q10 =  gameContainer.querySelector('.answer3-q10')
// let answer4Q10 =  gameContainer.querySelector('.answer4-q10')
// let answer5Q10 =  gameContainer.querySelector('.answer5-q10')
// let answer6Q10 =  gameContainer.querySelector('.answer6-q10')
// let answer7Q10 =  gameContainer.querySelector('.answer7-q10')

// let answer1Q11 = gameContainer.querySelector('.answer1-q11')
// let answer2Q11 = gameContainer.querySelector('.answer2-q11')
// let answer3Q11 = gameContainer.querySelector('.answer3-q11')

// // let answer1Q11Bis = gameContainer.querySelector('.answer1-q11Bis')
// // let answer2Q11Bis = gameContainer.querySelector('.answer2-q11Bis')
// // let answer3Q11Bis = gameContainer.querySelector('.answer3-q11Bis')

// let answer1Q12 = gameContainer.querySelector('.answer1-q12')
// let answer2Q12 = gameContainer.querySelector('.answer2-q12')
// let answer3Q12 = gameContainer.querySelector('.answer3-q12')

// let answer1Q13 = gameContainer.querySelector('.answer1-q13')
// let answer2Q13 = gameContainer.querySelector('.answer2-q13')
// let answer3Q13 = gameContainer.querySelector('.answer3-q13')


// for (let i = 1; i < 14; i++) {
//     questions[i].style.opacity = '0'
//     questions[i].style.visibility = 'hidden'
// }

// for (let i = 2; i < 51; i++) { 
//     answers[i].style.opacity = '0'
//     answers[i].style.visibility = 'hidden'
// }





// let debloqueR4Q5 = false
// let debloqueR4Q6 = false
// let debloqueR3Q6 = false
// let debloqueR4Q7 = false
// let debloqueR3Q9= false 
// let debloqueR4Q9 = false
// // let debloqueR5Q9 = false
// let debloqueR5Q10 = false
// let debloqueR7Q10 = false
// let debloqueQ11bis  = false

// let debloqueR5Q7 = false
// let debloqueR6Q10 = false
// let debloqueR3Q11 = false
// let debloqueR3Q11Bis = false
// let debloqueR3Q12 = false




// answer1Q1.addEventListener('click', () =>{
//     debloqueR5Q7 = true
//     debloqueR6Q10 = true
//     debloqueR3Q11 = true
//     debloqueR3Q11Bis = true // BIS PAS ENCORE FAIT
//     debloqueR3Q12 = true
// })
// answer2Q1.addEventListener('click', ()=>{
//     debloqueR5Q10 = true
//     // console.log("vous allez debloquer la R 5 de la question 10 ")
// })
// // answer1Q2.addEventListener ('click', () =>{
// //     debloqueR4Q5 = true
// // })

// answer1Q3.addEventListener ('click', () =>{
//     debloqueR4Q5 = true
//     // console.log("vous allez debloquer la R 4 de la question 5 ")
// })
// answer2Q4.addEventListener ('click', () =>{
//     debloqueR4Q6 = true
//     // console.log("vous allez debloquer la R 4 de la question 6 ")
// })
// answer2Q5.addEventListener ('click', () =>{
//     debloqueR3Q6 = true
//     // console.log("vous allez debloquer la R 3 de la question 6 ")
// })
// answer2Q6.addEventListener ('click', () =>{
//     debloqueR4Q7 = true
//     // console.log("vous allez debloquer la R 4 de la question 7 ")
// })
// answer2Q7.addEventListener ('click', () =>{
//     debloqueR7Q10 = true
//     // console.log("vous allez debloquer la R 7 de la question 10 ")
// })
// answer6Q7.addEventListener ('click', () =>{
//     debloqueR4Q9 = true
//     // console.log("vous allez debloquer la R 4 de la question 9 ")
// })
// answer3Q8.addEventListener ('click', () =>{
//     debloqueR3Q9 = true
//     // console.log("vous allez debloquer la R 3 de la question 9 ")
// })
// answer2Q11.addEventListener ('click', () =>{
//     debloqueQ11bis = true
//     // console.log("vous allez debloquer la 11bis")
// })
//  // 11 BIS PAS ENCORE FAIT 


// let compteur = 0

// answers.forEach(function(event) {
//     event.addEventListener('click', () =>
//     {
//         questions[compteur].style.transition = 'all 1s ease'
//         questions[compteur].style.visibility = 'hidden'
//         questions[compteur].style.opacity = '0'
//         compteur++
//         //** QUESTION 1 & 2 
//         switch (compteur) {
//             case 1:    
//                     questions[compteur].style.visibility = 'visible'
//                     answer1Q1.style.visibility = 'hidden'
//                     answer2Q1.style.visibility = 'hidden'
//                     answer1Q2.style.visibility = 'visible'
//                     answer2Q2.style.visibility = 'visible'
//                     answer3Q2.style.visibility = 'visible'
//             break
//             case 2 :    
//                     questions[compteur].style.visibility = 'visible'
//                     answer1Q2.style.visibility = 'hidden'
//                     answer2Q2.style.visibility = 'hidden'
//                     answer3Q2.style.visibility = 'hidden'
//                     answer1Q3.style.visibility = 'visible'
//                     answer2Q3.style.visibility = 'visible'
//                     answer3Q3.style.visibility = 'visible'
//             break
//             case 3 :    
//                     questions[compteur].style.visibility = 'visible'
//                     answer1Q3.style.visibility = 'hidden'
//                     answer2Q3.style.visibility = 'hidden'
//                     answer3Q3.style.visibility = 'hidden'
//                     answer1Q4.style.visibility = 'visible'
//                     answer2Q4.style.visibility = 'visible'
//                     answer3Q4.style.visibility = 'visible'
//             break
//             case 4 :    
//                     questions[compteur].style.visibility = 'visible'
//                     answer1Q4.style.visibility = 'hidden'
//                     answer2Q4.style.visibility = 'hidden'
//                     answer3Q4.style.visibility = 'hidden'
//                     answer1Q5.style.visibility = 'visible'
//                     answer2Q5.style.visibility = 'visible'
//                     answer3Q5.style.visibility = 'visible'
//                     if(debloqueR4Q5 === true){
//                         answer4Q5.style.visibility = 'visible'
//                     }
//             break
//             case 5 :    
//                     questions[compteur].style.visibility = 'visible'
//                     answer1Q5.style.visibility = 'hidden'
//                     answer2Q5.style.visibility = 'hidden'
//                     answer3Q5.style.visibility = 'hidden'
//                     answer4Q5.style.visibility = 'hidden'
//                     answer1Q6.style.visibility = 'visible'
//                     answer2Q6.style.visibility = 'visible'
//                     if (debloqueR3Q6 === true) {
//                     }
//                     if (debloqueR4Q6 === true){
//                         answer4Q6.style.visibility = 'visible'
//                         }
//             break
//             case 6 :     
//                     questions[compteur].style.visibility = 'visible'
//                     answer1Q6.style.visibility = 'hidden'
//                     answer2Q6.style.visibility = 'hidden'
//                     answer3Q6.style.visibility = 'hidden'
//                     answer4Q6.style.visibility = 'hidden'
            
//                     answer1Q7.style.visibility = 'visible'
//                     answer2Q7.style.visibility = 'visible'
//                     answer3Q7.style.visibility = 'visible'
//                     if(debloqueR4Q7 === true){
//                         answer4Q7.style.visibility = 'visible'
//                     }
//                     if (debloqueR5Q7 === true){
//                         answer5Q7.style.visibility = 'visible'
//                     }
//                     answer6Q7.style.visibility = 'visible'

//             break       
//             case 7:     
//                     questions[compteur].style.visibility = 'visible'
//                     answer1Q7.style.visibility = 'hidden'
//                     answer2Q7.style.visibility = 'hidden'
//                     answer3Q7.style.visibility = 'hidden'
//                     answer4Q7.style.visibility = 'hidden'
//                     answer5Q7.style.visibility = 'hidden'
//                     answer6Q7.style.visibility = 'hidden'

//                     answer1Q8.style.visibility = 'visible'
//                     answer2Q8.style.visibility = 'visible'
//                     answer3Q8.style.visibility = 'visible'
//             break
//             case 8 :    
//                     questions[compteur].style.visibility = 'visible'
//                     answer1Q8.style.visibility = 'hidden'
//                     answer2Q8.style.visibility = 'hidden'
//                     answer3Q8.style.visibility = 'hidden'

//                     answer1Q9.style.visibility = 'visible'
//                     answer2Q9.style.visibility = 'visible'
//                     if(debloqueR3Q9 === true){
//                         answer3Q9.style.visibility = 'visible'
//                     }
//                     if(debloqueR4Q9 === true){
//                         answer4Q9.style.visibility = 'visible'
//                     }
//             break
//             case 9 :
//                     questions[compteur].style.visibility = 'visible'
//                     answer1Q9.style.visibility = 'hidden'
//                     answer2Q9.style.visibility = 'hidden'
//                     answer3Q9.style.visibility = 'hidden'
//                     answer4Q9.style.visibility = 'hidden'
                    
//                     answer1Q10.style.visibility = 'visible'
//                     answer2Q10.style.visibility = 'visible'
//                     answer3Q10.style.visibility = 'visible'
//                     answer4Q10.style.visibility = 'visible'
//                     if (debloqueR5Q10) {
//                         answer5Q10.style.visibility = 'visible'
//                     }
//                     if (debloqueR6Q10) {
//                         answer6Q10.style.visibility = 'visible'
//                     }
//                     if (debloqueR7Q10) {
//                         answer7Q10.style.visibility = 'visible'
//                     }
//             break
//             case 10 :
//                     questions[compteur].style.visibility = 'visible'
//                     answer1Q10.style.visibility = 'hidden'
//                     answer2Q10.style.visibility = 'hidden'
//                     answer3Q10.style.visibility = 'hidden'
//                     answer4Q10.style.visibility = 'hidden'
//                     answer5Q10.style.visibility = 'hidden'
//                     answer6Q10.style.visibility = 'hidden'
//                     answer7Q10.style.visibility = 'hidden'

//                     answer1Q11.style.visibility = 'visible'
//                     answer2Q11.style.visibility = 'visible'
//                     if (debloqueR3Q11) {
//                         answer3Q11.style.visibility = 'visible'
//                     }
                    
//             break
//             case 11 :
//                     questions[compteur].style.visibility = 'visible'
//                     answer1Q11.style.visibility = 'hidden'
//                     answer2Q11.style.visibility = 'hidden'
//                     answer3Q11.style.visibility = 'hidden'

//                     answer1Q12.style.visibility = 'visible'
//                     answer2Q12.style.visibility = 'visible'
//                     if (debloqueR3Q12) {
//                         answer3Q12.style.visibility = 'visible'
//                     }
                    
//             break
//             case 12 :
//                     questions[compteur].style.visibility = 'visible'
//                     // console.log(questions[compteur]);
//                     answer1Q12.style.visibility = 'hidden'
//                     answer2Q12.style.visibility = 'hidden'
//                     answer3Q12.style.visibility = 'hidden'
//                     answer1Q13.style.visibility = 'visible'
//                     answer2Q13.style.visibility = 'visible'
//                     answer3Q13.style.visibility = 'visible' 
//             break
//             // default:
//             //         for (let i = 1; i < 13; i++) {
//             //             questions[i].style.display=  'none'
//             //         }
                    
//             //         for (let i = 2; i < 48; i++) { ///WESSSSSHHHHHH C QUOI CA ?
//             //             answers[i].style.display =  'none'
//             //         }
//             // break
//         }
//         questions[compteur].style.opacity = '1'
//         questions[compteur].style.transition = 'all 1s ease'
//     })
// })


