document.addEventListener("DOMContentLoaded", function() {
function gameInit() {
let domGame = document.getElementById('game');
domGame.innerHTML='';
  
gameSettings = {
  gameBg : {
    width:1800,
    height:900,
  },
  scene : {
    width:1000,
    height:800,
  },
  walkBorder:50,
  floorBottom:100,
  enemsGap:5,
  enemyDeathDom:`
  <div style="opacity:1;left:0;top:0;" data-speed="1" class="blood-box"></div>
  <div style="opacity:0.9;left:30px;top:30px;" data-speed="2" class="blood-box"></div>
  <div style="opacity:0.5;left:80px;top:20px;" data-speed="3" class="blood-box"></div>
  <div style="opacity:0.8;left:50px;top:50px;" data-speed="1" class="blood-box"></div>
  <div style="opacity:0.7;left:10px;top:70px;" data-speed="2" class="blood-box"></div>
  <div style="opacity:0.9;left:5px;top:10px;" data-speed="3" class="blood-box"></div>
  `,
  maxEnemsOnSide:4,
  roomEnMin:4,
  roomEnMax:30,
  waveEnemsMin:4,
  waveEnemsMax:8,
  dropsVanishTime:150,
  dropsBlinkTime:75,
  dropsJumpimgStart:7,
  inventoryCols:5,
  inventoryGap:30,
  inventoryCellWidth:150,
  inventoryCellHeight:110,
  mapPointsMax:20,
}

heroSource = {
  maxHealth:1000,
  outerBoxWidth:80,
  outerBoxHeight:180,
  meleeHitBottom:140,
  meleeHitLeft:40,
  meleeCrouchHitBottom:60,
  rangedCrouchPointDecrease:60,
  domRangedWeaponTop:35,
  domRangedWeaponLeft:50,
  domMeleeWeaponTop:100,
  domMeleeWeaponLeft:-50,
  speed:10,
  direction:'toRight',
  crouchHeight:120,
  backStep:10,
  weaponsSet: [],
  alive:true,
}

weaponsSource = {
    hands:{
    type:'melee',
    name:'hands',
    hitWidth:20,
    hitHeight:20,
    hitBottom:10,
    damage:2,
    speed:8,
    pushDistance:3,
    pushSpeed:1,
    color:'violet',
        pic:`<div class="meele-wrapper">
    <div class="fist"></div>
    </div>`,
  },
  knife:{
    type:'melee',
    name:'knife',
    hitWidth:50,
    hitHeight:20,
    hitBottom:10,
    damage:5,
    speed:8,
    pushDistance:10,
    pushSpeed:2,
    durability:15,
    color:'gray',
    pic:`<div class="meele-wrapper">
    <div class="knife-handle"></div>
    <div class="knife-blade"></div>
    </div>`,
  },
  axe:{
    type:'melee',
    name:'axe',
    hitWidth:80,
    hitHeight:40,
    hitBottom:30,
    damage:15,
    speed:24,
    pushDistance:50,
    pushSpeed:10,
    durability:10,
    color:'violet',
    pic:`<div class="meele-wrapper">
    <div class="axe-handle"></div>
    <div class="axe-blade"></div>
    </div>`,
  },
  machete:{
    type:'melee',
    name:'machete',
    hitWidth:120,
    hitHeight:30,
    hitBottom:20,
    damage:10,
    speed:14,
    pushDistance:20,
    pushSpeed:2,
    durability:12,
    color:'blue',
    pic:`<div class="meele-wrapper">
    <div class="machete-handle"></div>
    <div class="machete-blade"></div>
    </div>`,
  },
  gun:{
    type:'ranged',
    name:'gun',
    damage:5,
    singleShotDelay:30,
    pushDistance:15,
    pushSpeed:2,
    clipMax:8,
    ammo:15,
    projSpeed:20,
    projWidth:10,
    reloadSpeed:30,
    accuracy:3,
    firingPointBottom:50,
    firingPointLeft:115,
    projClassName: 'bullet',
    pic:`
    <div class="gun-wrapper">
    <div class="gun-part-1"></div>
    <div class="gun-part-2"></div>
    </div>
    `,
  },
  rifle:{
    type:'ranged',
    name:'rifle',
    damage:10,
    singleShotDelay:20,
    pushDistance:60,
    pushSpeed:15,
    clipMax:6,
    ammo:8,
    projSpeed:50,
    projWidth:10,
    reloadSpeed:100,
    firingPointBottom:50,
    firingPointLeft:280,
    projClassName: 'bullet',
    pic:`
    <div class="gun-wrapper">
    <div class="rifle-part-1"></div>
    <div class="rifle-part-2"></div>
    <div class="rifle-part-3"></div>
    <div class="rifle-part-4"></div>
    <div class="rifle-part-5"></div>
    </div>
    `,
  },
  machineGun:{
    type:'ranged',
    name:'machineGun',
    damage:10,
    singleShotDelay:5,
    pushDistance:25,
    pushSpeed:5,
    clipMax:30,
    ammo:60,
    projSpeed:30,
    projWidth:10,
    reloadSpeed:55,
    accuracy:10,
    firingPointBottom:50,
    firingPointLeft:185,
    projClassName: 'bullet',
    pic:`
    <div class="gun-wrapper">
    <div class="machinegun-part-1"></div>
    <div class="machinegun-part-2"></div>
    <div class="machinegun-part-3"></div>
    </div>
    `,
  },
}

enemsSource = {
  'small':{
    name:'small',
	outerBoxWidth: 60,
	outerBoxHeight: 60,
    damage:5,
    speed:5,//25,
    health:5,//10,
    points:50,
    class:'enemy-small',
    color:'red',
    backStep:10,
    attackSpeed:10,
  },
  'small-2':{
    name:'small',
	outerBoxWidth: 50,
	outerBoxHeight: 80,
    damage:5,
    speed:4,//25,
    health:5,//10,
    points:60,
    class:'enemy-small-2',
    color:'#a5692a',
    backStep:10,
    attackSpeed:8,
  },
  'medium':{
    name:'medium',
   	outerBoxWidth: 50,
  	outerBoxHeight: 160,
    damage:10,
    speed:3,//15,
    health:15,
    points:100,
    class:'enemy-middle',
    color:'blue',
    backStep:15,
    attackSpeed:6,
  },
    'medium-2':{
    name:'medium-2',
   	outerBoxWidth: 70,
  	outerBoxHeight: 180,
    damage:15,
    speed:2,//15,
    health:25,
    points:115,
    class:'enemy-middle-2',
    color:'violet',
    backStep:15,
    attackSpeed:5,
  },
  'big':{
    name:'big',
    outerBoxWidth: 90,
	  outerBoxHeight: 210,
    damage:20,
    speed:1,//5,
    health:20,
    points:150,
    class:'enemy-big',
    color:'yellow',
    backStep:20,
    attackSpeed:4,
  },
  'big-2':{
    name:'big-2',
    outerBoxWidth: 120,
	  outerBoxHeight: 110,
    damage:20,
    speed:2,//5,
    health:20,
    points:180,
    class:'enemy-big-2',
    color:'gray',
    backStep:20,
    attackSpeed:3,
  },
}

dropsSource = {
  gun:{
    type:'weapon',
    name:'gun',
  width: 66,
  height: 43,
  },
  machineGun:{
    type:'weapon',
    name:'machineGun',
        width:100,
    height:100,
  },
  rifle:{
    type:'weapon',
    name:'rifle',
        width:100,
    height:100,
  },
  knife:{
    type:'weapon',
    name:'knife',
        width:100,
    height:100,
  },
  machete:{
    type:'weapon',
    name:'machete',
        width:100,
    height:100,
  },
  axe:{
    type:'weapon',
    name:'axe',
        width:100,
    height:100,
  },
  healt:{
    type:'health',
    name:'H',
    power:100,
    color:'red',
    width:80,
    height:40,
  },
   diamond:{
    type:'jewerly',
    name:'D',
    points:100,
    color:'brown',
    width:60,
    height:40,
   },
   necklace:{
    type:'jewerly',
    name:'N',
    points:50,
    color:'yellow',
    width:60,
    height:40,
   },
   jewerly:{
    type:'jewerly',
    name:'J',
    points:25,
    color:'white',
    width:60,
    height:40,
   }
}

gameState = {
  gameOver:false,
  currentLevel:1,
  playerPoints:0,
  mapPointSections:[],
  mapPoints:[],
  currentMapPointCol:0,
  currentMapPointRow:0,
}

currentRoom = {
  enems:[],
  drops:[],
  projectiles:[],
  dropsRandMass: ['healt','jewerly','diamond','necklace'],
  enemsRandMass: ['small','small-2','medium','medium-2','big','big-2'],
  weaponsRandMass: ['gun','machineGun','rifle','knife','machete','axe'],
  currentProjId:1,
  currentDropId:1,
  enemsKilled:0,
  frameNumber:1,
  levelPoints:0,
}

//Function declarations
function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
function sceneRender(){
  let crelBg = document.createElement('div');
  crelBg.id = 'gameBg';
  crelBg.style.width = gameSettings.gameBg.width+'px';
  crelBg.style.height = gameSettings.gameBg.height+'px';
  let crelScene = document.createElement('div');
  crelScene.id = 'scene';
  crelScene.style.width = gameSettings.scene.width+'px';
  crelScene.style.height = gameSettings.scene.height+'px';
  crelBg.append(crelScene);
  domGame.append(crelBg);
  domScene = document.getElementById('scene');
}
function heroRender(){
  let crelHero = document.createElement('div');
  crelHero.id = 'hero';
  crelHero.style.position = 'absolute';
  crelHero.style.width = currentRoom.hero.outerBoxWidth+'px';
  crelHero.style.height = currentRoom.hero.outerBoxHeight+'px';
  crelHero.style.left = currentRoom.hero.left+'px';
  crelHero.style.bottom = gameSettings.floorBottom+'px';
  crelHero.setAttribute('direction',currentRoom.hero.direction);

  let crelDirIndicator = document.createElement('div');
  crelDirIndicator.className = 'dir-indicator';
  crelHero.append(crelDirIndicator);
  domRoomWrapper.append(crelHero);
  domHero = document.getElementById('hero');
  renderWeapon();
}

function renderWeapon(){
    if(document.getElementById('weapon')!=null){
      document.getElementById('weapon').remove();
    }
    if(document.getElementById('ranged-weapon')!=null){
      document.getElementById('ranged-weapon').remove();
    }
    if(currentRoom.hero.weapon.type=='melee'){
    let crelWeapon = document.createElement('div');
    crelWeapon.id = 'weapon';
      crelWeapon.style.height = currentRoom.hero.weapon.hitHeight+'px';
    //crelWeapon.style.borderStyle = "solid"; 
    //crelWeapon.style.borderWidth = '1px';
    //crelWeapon.style.borderColor = currentRoom.hero.weapon.color;
    //crelWeapon.style.width = currentRoom.hero.weapon.hitWidth+'px';
    //crelWeapon.style.height = currentRoom.hero.weapon.hitHeight+'px';
    crelWeapon.innerHTML = currentRoom.hero.weapon.pic;
    crelWeapon.style.top=currentRoom.hero.domMeleeWeaponTop+'px';
    crelWeapon.style.left=currentRoom.hero.domMeleeWeaponLeft+'px';
    domHero.append(crelWeapon);
    domHeroWeapon = document.getElementById('weapon');
  } else if(currentRoom.hero.weapon.type=='ranged') {
      if(currentRoom.hero.weapon.pic){
        crelRangedWeapon = document.createElement('div');
        crelRangedWeapon.id = 'ranged-weapon';
        crelRangedWeapon.style.position = 'absolute';
        crelRangedWeapon.innerHTML = currentRoom.hero.weapon.pic;
        crelRangedWeapon.style.top = currentRoom.hero.domRangedWeaponTop+'px';
        crelRangedWeapon.style.left = currentRoom.hero.domRangedWeaponLeft+'px';
        domHero.append(crelRangedWeapon);
      }
  }
}  
function createAndRenderRoom(){
	//render RoomWrapper
    if(document.getElementById('room-wrapper')!=null){
    document.getElementById('room-wrapper').remove();
  	}
  let crelRoomWrapper = document.createElement('div');
  crelRoomWrapper.id = 'room-wrapper';
  crelRoomWrapper.style.width = gameSettings.scene.width+'px';
  crelRoomWrapper.style.height = gameSettings.scene.height+'px';
  domScene.append(crelRoomWrapper);
  domRoomWrapper = document.getElementById('room-wrapper');
//Текущая точка
  let currentPoint = gameState.mapPoints[gameState.currentMapPointCol][gameState.currentMapPointRow];
  //hero initialization
  currentRoom.hero = Object.assign({}, heroSource);
  currentRoom.hero.left = (gameSettings.scene.width/2)-(currentRoom.hero.outerBoxWidth/2);
  currentRoom.hero.health = currentRoom.hero.maxHealth;
  currentRoom.hero.weaponSelectChanged = false;
//adding hands
  let hands = Object.assign({}, weaponsSource['hands']);
  currentRoom.hero.weaponsSet.push(hands);
  //room weapons set
  for(let i = 0;i<currentPoint.rules.weaponsTypes.length;i++){
    let weapon = Object.assign({}, weaponsSource[currentPoint.rules.weaponsTypes[i]]);
    currentRoom.hero.weaponsSet.push(weapon);
  }
  currentRoom.hero.weapon = currentRoom.hero.weaponsSet[1];
  currentRoom.hero.weaponIndex = 1;
  currentRoom.hero.singleShotDelay = 0;
  //currentRoom.hero.weapon.currentClipFill = currentRoom.hero.weapon.clipMax;

//create and render top bar
 
  
let crelRoomTopBar = document.createElement('div');
crelRoomTopBar.className = 'room-top-bar';

 let pointEnemsTypes = '';
    for(let e=0;e<currentPoint.rules.enemsTypes.length;e++){
      pointEnemsTypes+=currentPoint.rules.enemsTypes[e]+' ';
    }
    let pointWeaponsTypes = '';
    for(let e=0;e<currentPoint.rules.weaponsTypes.length;e++){
      pointWeaponsTypes+=currentPoint.rules.weaponsTypes[e]+' ';
    }

  
crelRoomTopBar.innerHTML = `
Col : `+gameState.currentMapPointCol+` Point : `+gameState.currentMapPointRow+`
<div>Enems types: <span style="color:gray">`+pointEnemsTypes+`</span></div> 
<div>Weapons types: <span style="color:gray">`+pointWeaponsTypes+`</span></div> 
<div>Enems:<span id="current-ens-killed" class="current-ens-killed">`+currentRoom.enemsKilled+`</span>/`+currentPoint.rules.enemsCount+`</div> 
level points: <span id="level-points-number">0</span>`;
domRoomWrapper.append(crelRoomTopBar); 

  
  heroRender();
  createAndRenderWave();
renderLevelPanel();

//frame animation start
clearInterval(nIntervId);
nIntervId = setInterval(frameBuilder,35/*16.7*/);
}

function createAndRenderEnems(){
  //Create
  currentRoom.enems = [];
  let randEnemsQuant = getRandomIntInclusive(3, 10);
  let leftEnemsStartPoint = -100;
  let rightEnemsStartPoint = gameSettings.scene.width+100;
  for(let i=0;i<randEnemsQuant-1;i++){
  let randEnDirection = getRandomIntInclusive(0, 1);
  let enDirection;
  let enStartPoint;
  let randMassNumber = getRandomIntInclusive(0, currentRoom.enemsRandMass.length-1);
  let currentEnemyName = currentRoom.enemsRandMass[randMassNumber];
  let currEnObj = Object.assign({}, enemsSource[currentEnemyName]);
    if(randEnDirection){
    enDirection = 'toRight';
    enStartPoint = leftEnemsStartPoint-currEnObj.outerBoxWidth;
  } else {
    enDirection = 'toLeft';
    enStartPoint = rightEnemsStartPoint;
  } 
  currEnObj.id = currentRoom.currentEnId;
  currEnObj.direction = enDirection;
  currEnObj.left = enStartPoint;
  currEnObj.bottom = gameSettings.floorBottom;

let randDropNumber = getRandomIntInclusive(0, currentRoom.dropsRandMass.length-1);
let randDropName = currentRoom.dropsRandMass[randDropNumber];
currEnObj.drop = Object.assign({}, dropsSource[randDropName]);
    
  currentRoom.enems.push(currEnObj);
  if(randEnDirection){
    leftEnemsStartPoint-=currEnObj.outerBoxWidth+gameSettings.enemsGap;
  } else {
    rightEnemsStartPoint+=currEnObj.outerBoxWidth+gameSettings.enemsGap;
  }
  currentRoom.currentEnId++;
}
//Render
  for(let i=0;i<currentRoom.enems.length;i++){
    let crelEnemy = document.createElement('div');
    crelEnemy.className = 'enemy '+currentRoom.enems[i].class;
    crelEnemy.style.width = currentRoom.enems[i].outerBoxWidth+'px';
    crelEnemy.style.height = currentRoom.enems[i].outerBoxHeight+'px';
    crelEnemy.style.border='1px solid '+currentRoom.enems[i].color;
    crelEnemy.style.bottom = currentRoom.enems[i].bottom+'px';
    crelEnemy.style.left = currentRoom.enems[i].left+'px';
    crelEnemy.setAttribute('enemy-id',currentRoom.enems[i].id);
    domRoomWrapper.append(crelEnemy);
  }
}

function createAndRenderWave(){
  let currentPoint = gameState.mapPoints[gameState.currentMapPointCol][gameState.currentMapPointRow];
  let pointEnemsSet = currentPoint.rules.enemsObjects;
  let waveSize = getRandomIntInclusive(gameSettings.waveEnemsMin, gameSettings.waveEnemsMax);
  let waveEnemsSet = pointEnemsSet.splice(0,waveSize);
  console.log('waveEnemsSet: ',waveEnemsSet);
  let leftSideCounter = 0;
  let rightSideCounter = 0;
  let leftEnemsStartPoint = -100;
  let rightEnemsStartPoint = gameSettings.scene.width+100;
  for(let i=0;i<waveEnemsSet.length;i++){
  //single enemy starts
  waveEnemsSet[i].id = i;
  let randEnDirection = getRandomIntInclusive(0, 1);
  waveEnemsSet[i].bottom = gameSettings.floorBottom;
  if(!randEnDirection){
    if(leftSideCounter<gameSettings.maxEnemsOnSide){
      leftSideCounter++;
      waveEnemsSet[i].direction = 'toRight';
      waveEnemsSet[i].left = leftEnemsStartPoint-waveEnemsSet[i].outerBoxWidth;
      leftEnemsStartPoint-=+gameSettings.enemsGap+waveEnemsSet[i].outerBoxWidth;
    } else {
      rightSideCounter++;
      waveEnemsSet[i].direction = 'toLeft';
      waveEnemsSet[i].left = rightEnemsStartPoint;
      rightEnemsStartPoint+=waveEnemsSet[i].outerBoxWidth+gameSettings.enemsGap;
    }
  } else if(randEnDirection){
    if(rightSideCounter<gameSettings.maxEnemsOnSide){
      rightSideCounter++;
      waveEnemsSet[i].direction = 'toLeft';
      waveEnemsSet[i].left = rightEnemsStartPoint;
      rightEnemsStartPoint+=waveEnemsSet[i].outerBoxWidth+gameSettings.enemsGap;     
    } else {
      leftSideCounter++;
      waveEnemsSet[i].direction = 'toRight';
      waveEnemsSet[i].left = leftEnemsStartPoint-waveEnemsSet[i].outerBoxWidth;
      leftEnemsStartPoint-=+gameSettings.enemsGap+waveEnemsSet[i].outerBoxWidth;  
    }
  } 
}//single enemy ends
currentRoom.enems = waveEnemsSet.slice();
console.log('waveEnemsSet dirs and lefts: ',waveEnemsSet);
//Render wave
  for(let i=0;i<currentRoom.enems.length;i++){
    let crelEnemy = document.createElement('div');
    crelEnemy.className = 'enemy '+currentRoom.enems[i].class;
    crelEnemy.style.width = currentRoom.enems[i].outerBoxWidth+'px';
    crelEnemy.style.height = currentRoom.enems[i].outerBoxHeight+'px';
    crelEnemy.style.border='1px solid '+currentRoom.enems[i].color;
    crelEnemy.style.bottom = currentRoom.enems[i].bottom+'px';
    crelEnemy.style.left = currentRoom.enems[i].left+'px';
    crelEnemy.setAttribute('enemy-id',currentRoom.enems[i].id);
    domRoomWrapper.append(crelEnemy);
  }
}

function autoReCreateWave(){
  let allEnsDead = true;
  for(let i=0;i<currentRoom.enems.length;i++){
    if(!currentRoom.enems[i].dead){
      allEnsDead = false;
      break;
    }
  }
  if(allEnsDead){
    createAndRenderWave();
  }
}

function heroAttacks() {
   
   if(currentRoom.hero.attackDowned){
     
     if(currentRoom.hero.weapon.type=='melee'){
       meeleWeaponAttack(currentRoom.hero.weapon);
     } else if (currentRoom.hero.weapon.type=='ranged') {
       rangedWeaponAttack(currentRoom.hero.weapon);
     }
   }
}   

function rangedWeaponAttack(weapon) {
   //console.log('ranged attack');
  if(currentRoom.hero.weapon.ammo && !currentRoom.hero.singleShotDelay /*&& currentRoom.hero.weapon.currentClipFill>0*/){
    //console.log('shot');
    let projectileLeft;
    let projectileBottom;
    if(currentRoom.hero.direction=='toRight'){
      projectileLeft =currentRoom.hero.left+currentRoom.hero.weapon.firingPointLeft;
    } else if(currentRoom.hero.direction=='toLeft'){
      projectileLeft =currentRoom.hero.left+currentRoom.hero.outerBoxWidth-currentRoom.hero.weapon.firingPointLeft-currentRoom.hero.weapon.projWidth;
    }
    if(currentRoom.hero.crouchPushed) {
      projectileBottom = gameSettings.floorBottom+currentRoom.hero.outerBoxHeight-currentRoom.hero.weapon.firingPointBottom-currentRoom.hero.rangedCrouchPointDecrease;
    } else {
      projectileBottom = gameSettings.floorBottom+currentRoom.hero.outerBoxHeight-currentRoom.hero.weapon.firingPointBottom;
    }
    let currProjObj = { 
        id:currentRoom.currentProjId,
        direction:currentRoom.hero.direction,
        left:projectileLeft,
        bottom:projectileBottom,
        damage:currentRoom.hero.weapon.damage,
        speed:currentRoom.hero.weapon.projSpeed,
        projWidth:currentRoom.hero.weapon.projWidth,
        pushDistance:currentRoom.hero.weapon.pushDistance,
      pushSpeed:currentRoom.hero.weapon.pushSpeed,
      justCreated:true,
      };
    if(currentRoom.hero.weapon.accuracy){
      let projAccuracy = getRandomIntInclusive(1, currentRoom.hero.weapon.accuracy);
      let shiftDirRand = getRandomIntInclusive(0, 1);
      let shiftDir;
      if(shiftDirRand){
        shiftDir = 'toBottom';
      } else {
        shiftDir = 'toTop';
      }
      currProjObj.projAccuracy = projAccuracy;
      currProjObj.shiftDir = shiftDir;
    }
    currentRoom.projectiles.push(currProjObj);
    //ammo decr
    currentRoom.hero.weapon.ammo--;
    updateWeaponBar();
    //render Projectile
    let crelProjectile = document.createElement('div');
    crelProjectile.className = 'projectile '+ currentRoom.hero.weapon.projClassName;
    crelProjectile.setAttribute('projectile-id',currentRoom.currentProjId);
    crelProjectile.style.width = currentRoom.hero.weapon.projWidth+'px';
    crelProjectile.style.height = currentRoom.hero.weapon.projWidth+'px';
    crelProjectile.style.left = projectileLeft+'px';
    crelProjectile.style.bottom = projectileBottom+'px';
    currentRoom.hero.singleShotDelay = currentRoom.hero.weapon.singleShotDelay;
    domRoomWrapper.append(crelProjectile);
    currentRoom.currentProjId++;
  }
} 

function meeleWeaponAttack(weapon) {
if(!currentRoom.hero.meleeRolls){
currentRoom.hero.meleeRolls = true;
}
}

function rollMelee(){
  if(currentRoom.hero.meleeRolls){
  currentRoom.hero.meleeContinues=true;
  if(!currentRoom.hero.meleeStage && !currentRoom.hero.meleeStageSpeed){
    currentRoom.hero.meleeStage = 1;
    currentRoom.hero.meleeStageSpeed = currentRoom.hero.weapon.speed/2;
    domHeroWeapon.style.top = '0';
    domHeroWeapon.style.transform ="rotate(-135deg)";
  } else if(currentRoom.hero.meleeStage==1 && !currentRoom.hero.meleeStageSpeed) {
    currentRoom.hero.meleeStage = 2;
    currentRoom.hero.meleeStageSpeed = currentRoom.hero.weapon.speed/2;
    domHeroWeapon.style.top = '-20px';
    domHeroWeapon.style.left = '50px';
    domHeroWeapon.style.transform ="rotate(-105deg)";
  } else if(currentRoom.hero.meleeStage==2 && !currentRoom.hero.meleeStageSpeed) {
    //hit
    currentRoom.hero.meleeStage = 3;
    currentRoom.hero.meleeStageSpeed = currentRoom.hero.weapon.speed/2;
    domHeroWeapon.style.top='auto';
     if(currentRoom.hero.crouchPushed) {
    domHeroWeapon.style.bottom = currentRoom.hero.meleeCrouchHitBottom-currentRoom.hero.weapon.hitBottom+'px';
     } else {
        domHeroWeapon.style.bottom = currentRoom.hero.meleeHitBottom-currentRoom.hero.weapon.hitBottom+'px';
     }
    domHeroWeapon.style.left = (currentRoom.hero.outerBoxWidth+currentRoom.hero.meleeHitLeft)+'px';
    domHeroWeapon.style.transform = 'none';
    //enemyCollision
    currentRoom.frontEnemyLeftEdge = 'empty';
    currentRoom.frontEnemyRightEdge = 'empty'
    currentRoom.frontEnemyPosition = 'empty';
    if(currentRoom.hero.crouchPushed) {
      currentRoom.hero.meleeBottomEdge=currentRoom.hero.meleeCrouchHitBottom-currentRoom.hero.weapon.hitBottom;
    } else {
      currentRoom.hero.meleeBottomEdge=currentRoom.hero.meleeHitBottom-currentRoom.hero.weapon.hitBottom;
    }
    //ensMelCollision
    for(let b=0;b<currentRoom.enems.length;b++){
      let singleEn = currentRoom.enems[b];
       if(currentRoom.hero.direction=='toLeft' && singleEn.direction=='toRight' && !singleEn.dead){
          if(singleEn.left+singleEn.outerBoxWidth> currentRoom.hero.left-currentRoom.hero.meleeHitLeft-currentRoom.hero.weapon.hitWidth && currentRoom.hero.meleeBottomEdge<singleEn.outerBoxHeight){
             if(currentRoom.frontEnemyLeftEdge == 'empty'){
            currentRoom.frontEnemyLeftEdge = singleEn.left+singleEn.outerBoxWidth;
            currentRoom.frontEnemyPosition = b;
         } else if(singleEn.left+singleEn.outerBoxWidth>currentRoom.frontEnemyLeftEdge){
           currentRoom.frontEnemyLeftEdge = singleEn.left+singleEn.outerBoxWidth;
           currentRoom.frontEnemyPosition = b;
         }
            //hitEnemy(b);

          }
       } else if(currentRoom.hero.direction=='toRight' && singleEn.direction=='toLeft' && !singleEn.dead){
         if(singleEn.left<currentRoom.hero.left+currentRoom.hero.outerBoxWidth+currentRoom.hero.meleeHitLeft+currentRoom.hero.weapon.hitWidth && currentRoom.hero.meleeBottomEdge<singleEn.outerBoxHeight){
           if(currentRoom.frontEnemyRightEdge == 'empty'){
            currentRoom.frontEnemyRightEdge = singleEn.left;
            currentRoom.frontEnemyPosition = b;
         } else if(singleEn.left<currentRoom.frontEnemyRightEdge){
           currentRoom.frontEnemyRightEdge = singleEn.left;
           currentRoom.frontEnemyPosition = b;
         }    
           //hitEnemy(b);

         }
       }
    }//ensMelCollisionEnds
    hitEnemy(currentRoom.frontEnemyPosition);  
  }
  else if(currentRoom.hero.meleeStage==3 && !currentRoom.hero.meleeStageSpeed) {
    currentRoom.hero.meleeStage = 0;
    currentRoom.hero.meleeStageSpeed = currentRoom.hero.weapon.speed/2;
    domHeroWeapon.style.top=currentRoom.hero.domMeleeWeaponTop+'px';
    domHeroWeapon.style.left=currentRoom.hero.domMeleeWeaponLeft+'px';
    domHeroWeapon.style.removeProperty('transform');
    currentRoom.hero.meleeRolls = false;
  }

  if(currentRoom.hero.meleeStageSpeed){
currentRoom.hero.meleeStageSpeed--;
  }
  }
}


function objectTimersChange(){

    currentRoom.frameNumber++;
  
  if(currentRoom.hero.singleShotDelay>0){
    currentRoom.hero.singleShotDelay--;
  }
  let fadeInCollection = document.querySelectorAll('[fade-in]');
  for (let i=0;i<fadeInCollection.length;i++) {
   let fade = +fadeInCollection[i].getAttribute('fade-in');
    if(fade>0){
  fade--;
  fadeInCollection[i].setAttribute('fade-in',fade);
  fadeInCollection[i].style.opacity = +fadeInCollection[i].style.opacity-0.1;
      } else if(fade<1){
      fadeInCollection[i].remove();
      }
  }


rollMelee();
  
  let enHittedCollection = document.querySelectorAll('[en-hitted]');
  for (let i=0;i<enHittedCollection.length;i++) {
   let opacity = +enHittedCollection[i].style.opacity;
    if(opacity<1 && enHittedCollection[i].getAttribute('en-hitted')){
  enHittedCollection[i].style.opacity = opacity+0.1;
      } else if(opacity==1){
      //enHittedCollection[i].setAttribute('en-hitted',false);
      enHittedCollection[i].removeAttribute('en-hitted');
}
  }
  //enemPushing

 for(let b=0;b<currentRoom.enems.length;b++){
      let singleEn = currentRoom.enems[b];
      if(singleEn.pushed>0){
        if(singleEn.direction=='toLeft'){
          singleEn.left++;
          singleEn.pushed--;
        } else if(singleEn.direction=='toRight'){
          singleEn.left--;
          singleEn.pushed--;
        }
      } else if(singleEn.pushed==0){
        delete singleEn.pushed;
      }
 }

  //damageLayers
  let damageLayers = document.getElementsByClassName('damage-layer');
  for (let i=0;i<damageLayers.length;i++) {
    let opacity = +damageLayers[i].style.opacity;
    if(opacity>0){
      opacity-=0.1;
      damageLayers[i].style.opacity =opacity;
    } else if(opacity==0) {
      damageLayers[i].remove();
    }
  }


  //deathAnimation
  let deathAnimsCollection = document.getElementsByClassName('death-animation-wrapper');
   for (let i=0;i<deathAnimsCollection.length;i++) {
let singleWrapper = deathAnimsCollection[i];
let boxesCollection = singleWrapper.getElementsByClassName('blood-box');

  let allFaded;
  for (let i=0;i<boxesCollection.length;i++) {
    allFaded =true;
    let singleBbox = boxesCollection[i];
   let speed = +singleBbox.getAttribute('data-speed');
    let opacityDecr;
    let topDecr;
    if(speed==1){
      opacityDecr = 0.1;
      topDecr = 1;
    } else if(speed==2) {
      opacityDecr = 0.2;
      topDecr = 2;
    } else if(speed==3) {
      opacityDecr = 0.3;
      topDecr = 3;
    }
    if(+singleBbox.style.opacity>0){
  singleBbox.style.opacity=+singleBbox.style.opacity-opacityDecr;
  singleBbox.style.top=parseInt(singleBbox.style.top)+topDecr+'px';
  }
if(+singleBbox.style.opacity>0){
   allFaded =false;
  }
     
  }


if(allFaded){
  singleWrapper.remove();
}
     
   }

  //drops fall

    let dropsCollection = document.getElementsByClassName('drop-item');
   for (let i=0;i<dropsCollection.length;i++) {
        let singleDrop = dropsCollection[i];
        if(parseInt(singleDrop.style.bottom)>gameSettings.floorBottom && singleDrop.getAttribute('data-direction')=='down'){
          //down
          singleDrop.style.bottom = parseInt(singleDrop.style.bottom)-10+'px';
        } else if(singleDrop.getAttribute('data-jump')>0 && singleDrop.getAttribute('data-direction')=='up'){
          //up
          singleDrop.style.bottom = parseInt(singleDrop.style.bottom)+10+'px';
          let jump = +singleDrop.getAttribute('data-jump');
          jump--;
          singleDrop.setAttribute('data-jump',jump);
        }
     //if hits floor
        if(parseInt(singleDrop.style.bottom)<gameSettings.floorBottom+1){
          singleDrop.style.bottom = gameSettings.floorBottom+'px';
        if(+singleDrop.getAttribute('data-jump')>0){
         // console.log('Fires');
          singleDrop.setAttribute('data-direction','up');
        }
        }
     //if hits jump edge
          if(singleDrop.getAttribute('data-jump')<1){
            let limiter = singleDrop.getAttribute('jump-limiter');
            limiter-=1;
            singleDrop.setAttribute('jump-limiter',limiter);
            singleDrop.setAttribute('data-jump',singleDrop.getAttribute('jump-limiter'));
            singleDrop.setAttribute('data-direction','down');
          }
   }

  //blinking and vanish
  for (let i=0;i<currentRoom.drops.length;i++) {
      let singleDrop = currentRoom.drops[i];
      let singleDomDrop = document.querySelector('.drop-item[data-id="'+singleDrop.id+'"]');
    if(singleDrop.vanishTime>0){
      singleDrop.vanishTime--;
      singleDomDrop.setAttribute('vanish',singleDrop.vanishTime);
    } else if(singleDrop.vanishTime==0){
      singleDomDrop.remove();
      currentRoom.drops.splice(i,1);
      i--;
    }
    //blink
    if(singleDrop.blinkTime>0){
      singleDrop.blinkTime--;
      singleDomDrop.setAttribute('blink',singleDrop.blinkTime);
    } else if(singleDrop.blinkTime==0 && !singleDomDrop.hasAttribute('blink-dir')){
      singleDomDrop.setAttribute('blink-dir','decr');
    } else if(singleDrop.blinkTime==0 && singleDomDrop.hasAttribute('blink-dir')){
      //blink starts
      if(singleDomDrop.getAttribute('blink-dir')=='decr' && +singleDomDrop.style.opacity>0.2){
        singleDomDrop.style.opacity = +singleDomDrop.style.opacity-0.1;
        if(+singleDomDrop.style.opacity==0.2){
          singleDomDrop.setAttribute('blink-dir','incr');
        }
      } else if(singleDomDrop.getAttribute('blink-dir')=='incr' && +singleDomDrop.style.opacity<1){
        singleDomDrop.style.opacity = +singleDomDrop.style.opacity+0.1;
        if(+singleDomDrop.style.opacity==1){
          singleDomDrop.setAttribute('blink-dir','decr');
        }
      }
    }
  }
  
}// timers ends

function moveProjectiles() {
  if(currentRoom.projectiles.length){
    for(let i=0;i<currentRoom.projectiles.length;i++){
      if(currentRoom.projectiles[i].justCreated){
        delete currentRoom.projectiles[i].justCreated;
      } else {
      if(currentRoom.projectiles[i].direction=='toRight'){
      // projToRight
        currentRoom.projectiles[i].left+=currentRoom.hero.weapon.projSpeed;
      } else if(currentRoom.projectiles[i].direction=='toLeft'){
      // projToLeft 
        currentRoom.projectiles[i].left-=currentRoom.hero.weapon.projSpeed;
      }
      document.querySelector('[projectile-id="'+currentRoom.projectiles[i].id+'"]').style.left= currentRoom.projectiles[i].left+'px';
        if(currentRoom.projectiles[i].projAccuracy && currentRoom.frameNumber%currentRoom.projectiles[i].projAccuracy==0){
          if(currentRoom.projectiles[i].shiftDir=='toTop'){
          currentRoom.projectiles[i].bottom+=4;
          } else if(currentRoom.projectiles[i].shiftDir=='toBottom'){
          currentRoom.projectiles[i].bottom-=4;
          }
          document.querySelector('[projectile-id="'+currentRoom.projectiles[i].id+'"]').style.bottom= currentRoom.projectiles[i].bottom+'px';
        }
        //delete outscene projectile
        if(currentRoom.projectiles[i].left>gameSettings.scene.width || currentRoom.projectiles[i].left+currentRoom.hero.weapon.projWidth<1){
          document.querySelector('[projectile-id="'+currentRoom.projectiles[i].id+'"]').remove();
          currentRoom.projectiles.splice(i,1);
          i--;
        }  
    }
    }
}
}







function projectilesCollision(){
    if(currentRoom.projectiles.length){
    for(let i=0;i<currentRoom.projectiles.length;i++){
      let proj = currentRoom.projectiles[i];
      if(proj.direction=='toLeft'){
      // projToLeft
//let frontEn = currentRoom.enems[currentRoom.frontEnemyLeft.massPosition];
 for(let b=0;b<currentRoom.enems.length;b++){
      let singleEn = currentRoom.enems[b];
   if(singleEn.direction=='toRight' && !singleEn.dead && singleEn.left<currentRoom.hero.left+currentRoom.hero.outerBoxWidth-currentRoom.hero.weapon.firingPointLeft){
if(proj.left<singleEn.left+singleEn.outerBoxWidth && proj.bottom-proj.projWidth<gameSettings.floorBottom+singleEn.outerBoxHeight && currentRoom.projectiles.length){
  hitEnemy(b,i);
            //console.log('enems after hit',currentRoom.enems);
            document.querySelector('[projectile-id="'+currentRoom.projectiles[i].id+'"]').remove();
            currentRoom.projectiles.splice(i,1);
            i--;
            }
 }
      }
      } else if(currentRoom.projectiles[i].direction=='toRight'){
      // projToLeft 
  for(let b=0;b<currentRoom.enems.length;b++){
      let singleEn = currentRoom.enems[b];
   if(singleEn.direction=='toLeft' && !singleEn.dead && singleEn.left+singleEn.outerBoxWidth>currentRoom.hero.left+currentRoom.hero.weapon.firingPointLeft){
if(proj.left>singleEn.left && proj.bottom-proj.projWidth<gameSettings.floorBottom+singleEn.outerBoxHeight && currentRoom.projectiles.length){
  hitEnemy(b,i);
  //console.log('enems after hit',currentRoom.enems);
            document.querySelector('[projectile-id="'+currentRoom.projectiles[i].id+'"]').remove();
            currentRoom.projectiles.splice(i,1);
            i--;
            }
 }
      }       
      }
    }
}
}

function hitEnemy(b,i){
  if(b!='empty'){
if(currentRoom.hero.weapon.durability){
           currentRoom.hero.weapon.durability--;
           if(currentRoom.hero.weapon.durability==0){
             currentRoom.hero.weaponsSet.splice(currentRoom.hero.weaponIndex,1);
             changeWeapon(0);
           } else {
           updateWeaponBar();
           }
  }
    
  let proj;
  let singleEn = currentRoom.enems[b];
  if(typeof(i)=='undefined'){
  singleEn.pushed = currentRoom.hero.weapon.pushDistance;
  singleEn.pushedSpeed = currentRoom.hero.weapon.pushSpeed;
  } else {
    proj = currentRoom.projectiles[i];
    singleEn.pushed = proj.pushDistance;
    singleEn.pushedSpeed = proj.pushSpeed;
  }
  let hitEffect = document.createElement('div');
  hitEffect.className = 'blood-shot';
  hitEffect.style.opacity = 1;
  if(typeof(i)=='undefined'){
 hitEffect.style.bottom = gameSettings.floorBottom+currentRoom.hero.meleeBottomEdge+'px';
  } else {
      hitEffect.style.bottom = proj.bottom+'px';
  }
  if(singleEn.direction=='toRight'){
    hitEffect.style.left = singleEn.left+singleEn.outerBoxWidth+'px';
  } else if(singleEn.direction=='toLeft'){
    hitEffect.style.left = singleEn.left+'px';
  }
  hitEffect.setAttribute('fade-in',30);
  domRoomWrapper.append(hitEffect);
  document.querySelector('[enemy-id="'+singleEn.id+'"]').setAttribute('en-hitted',true);
  document.querySelector('[enemy-id="'+singleEn.id+'"]').style.opacity = 0.2;
  singleEn.health-=currentRoom.hero.weapon.damage;
  if(singleEn.health<1){
    document.querySelector('[enemy-id="'+singleEn.id+'"]').remove();
    singleEn.dead = true;
    currentRoom.enemsKilled++;
    document.getElementById('current-ens-killed').innerHTML=currentRoom.enemsKilled;
    //drop-start
    let currentDropObj = Object.assign({}, singleEn.drop);
    currentDropObj.id=currentRoom.currentDropId;
    currentDropObj.left = singleEn.left+(singleEn.outerBoxWidth/2)-(singleEn.drop.width/2);
    if(currentDropObj.left<gameSettings.walkBorder){
      currentDropObj.left=gameSettings.walkBorder;
    } else if(currentDropObj.left+currentDropObj.width>gameSettings.scene.width-gameSettings.walkBorder){
      currentDropObj.left=gameSettings.scene.width-gameSettings.walkBorder-currentDropObj.width;
    }
    currentDropObj.blinkTime = gameSettings.dropsBlinkTime;
    currentDropObj.vanishTime = gameSettings.dropsVanishTime;
    currentRoom.drops.push(currentDropObj);
    //render Drop
    let crelDropItem = document.createElement('div');
    crelDropItem.className = 'drop-item';
    crelDropItem.setAttribute('data-id',currentRoom.currentDropId);
    crelDropItem.setAttribute('data-jump',gameSettings.dropsJumpimgStart);
    crelDropItem.setAttribute('jump-limiter',gameSettings.dropsJumpimgStart);
    crelDropItem.setAttribute('data-direction','down');
    crelDropItem.style.opacity=1;
    crelDropItem.style.position='absolute';
    crelDropItem.style.width = singleEn.drop.width+'px';
    crelDropItem.style.height = singleEn.drop.height+'px';
    crelDropItem.style.bottom=gameSettings.floorBottom+singleEn.outerBoxHeight-singleEn.drop.height+'px';
    crelDropItem.style.left=currentDropObj.left+'px';

    if(currentDropObj.type=='weapon'){
          crelDropItem.style.border = '1px solid white';
    crelDropItem.style.color = 'white';
      crelDropItem.innerHTML = weaponsSource[currentDropObj.name].pic;
    } else {
          crelDropItem.style.border = '1px solid '+singleEn.drop.color;
    crelDropItem.style.color = singleEn.drop.color;
      crelDropItem.append(singleEn.drop.name);
    }
    domRoomWrapper.append(crelDropItem);
    currentRoom.currentDropId++;
    //drop-end
    let crelDeadAnim = document.createElement('div');
    crelDeadAnim.className = 'death-animation-wrapper';
    crelDeadAnim.style.border = '1px solid red';
    crelDeadAnim.style.position = 'absolute';
    crelDeadAnim.style.width = '80px';
    crelDeadAnim.style.height = '10px';
    crelDeadAnim.style.bottom = gameSettings.floorBottom+singleEn.outerBoxHeight-10+'px';
    crelDeadAnim.style.left = singleEn.left+'px';
    crelDeadAnim.innerHTML=gameSettings.enemyDeathDom;
    domRoomWrapper.append(crelDeadAnim);
    autoReCreateWave();
  }
}
}
    
function moveEnemies(){
  for(let i=0;i<currentRoom.enems.length;i++){
        if(!currentRoom.enems[i].dead){
      let singleEn = currentRoom.enems[i];
      let domEn =  document.querySelector('[enemy-id="'+singleEn.id+'"]');
      if(singleEn.direction == 'toRight' && !singleEn.dead){
         //moves to Right



       if(domEn.hasAttribute('attack-timer') && +domEn.getAttribute('attack-timer')>0) {
          let attackTimer = +domEn.getAttribute('attack-timer');
          attackTimer--;
        if(attackTimer==0) {
        //attack starts
          domEn.removeAttribute('attack-timer');
          if(singleEn.left+singleEn.outerBoxWidth==currentRoom.hero.left){
          currentRoom.hero.health-=singleEn.damage;
          renderDamageLayer();
          updateHealthBar();
          if(currentRoom.hero.health<1){
            gameOver();
          }
          }
        //attack ends
        } else {
          domEn.setAttribute('attack-timer',attackTimer);  
        }
        }
        if(domEn.hasAttribute('pushed') && +domEn.getAttribute('pushed')>0) {
          singleEn.left-=singleEn.pushedSpeed;
          let pushed = +domEn.getAttribute('pushed');
          pushed-=singleEn.pushedSpeed;
          domEn.setAttribute('pushed',pushed);
        }
        if(domEn.hasAttribute('pushed') && +domEn.getAttribute('pushed')<1) {
          domEn.removeAttribute('pushed');
          delete singleEn.pushed;
          delete singleEn.pushedSpeed;
        }
        if(singleEn.pushed && !domEn.hasAttribute('pushed')){
          domEn.setAttribute('pushed',singleEn.pushed);
        }
        if(singleEn.left+singleEn.outerBoxWidth+singleEn.speed<currentRoom.hero.left && !domEn.hasAttribute('pushed')){
          //простое движение
           singleEn.left += singleEn.speed;
        } else if(singleEn.left+singleEn.outerBoxWidth+singleEn.speed>currentRoom.hero.left || singleEn.left+singleEn.outerBoxWidth+singleEn.speed==currentRoom.hero.left){
          //столкновение
          singleEn.left=currentRoom.hero.left-singleEn.outerBoxWidth;
          if(!domEn.hasAttribute('attack-timer')){
          domEn.setAttribute('attack-timer',singleEn.attackSpeed);
          }
        } 



    
      } else if(singleEn.direction == 'toLeft' && !singleEn.dead){
        //moves to Left



       if(domEn.hasAttribute('attack-timer') && +domEn.getAttribute('attack-timer')>0) {
          let attackTimer = +domEn.getAttribute('attack-timer');
          attackTimer--;
        if(attackTimer==0) {
        //attack starts
          domEn.removeAttribute('attack-timer');
          if(singleEn.left==currentRoom.hero.left+currentRoom.hero.outerBoxWidth){
          currentRoom.hero.health-=singleEn.damage;
          renderDamageLayer();
          updateHealthBar();
          if(currentRoom.hero.health<1){
            gameOver();
          }
          }
        //attack ends
        } else {
          domEn.setAttribute('attack-timer',attackTimer);  
        }
        }
        if(domEn.hasAttribute('pushed') && +domEn.getAttribute('pushed')>0) {
          singleEn.left+=singleEn.pushedSpeed;
          let pushed = +domEn.getAttribute('pushed');
          pushed-=singleEn.pushedSpeed;
          domEn.setAttribute('pushed',pushed);
        }
        if(domEn.hasAttribute('pushed') && +domEn.getAttribute('pushed')<1) {
          domEn.removeAttribute('pushed');
          delete singleEn.pushed;
          delete singleEn.pushedSpeed;
        }
        if(singleEn.pushed && !domEn.hasAttribute('pushed')){
          domEn.setAttribute('pushed',singleEn.pushed);
        }
        if(singleEn.left-singleEn.speed>currentRoom.hero.left+currentRoom.hero.outerBoxWidth && !domEn.hasAttribute('pushed')){
          //простое движение
           singleEn.left -= singleEn.speed;
        } else if(singleEn.left-singleEn.speed<currentRoom.hero.left+currentRoom.hero.outerBoxWidth || singleEn.left-singleEn.speed==currentRoom.hero.left+currentRoom.hero.outerBoxWidth){
          //столкновение
          singleEn.left=currentRoom.hero.left+currentRoom.hero.outerBoxWidth;
          if(!domEn.hasAttribute('attack-timer')){
          domEn.setAttribute('attack-timer',singleEn.attackSpeed);
          }
        } 








  
      }
    domEn.style.left = singleEn.left+'px';
  }
  }
}//move enems ends

function dropsCollision(){
   for (let i=0;i<currentRoom.drops.length;i++) {
        singleDrop = currentRoom.drops[i];
        if(currentRoom.hero.direction=='toRight'){
          if(currentRoom.hero.left+currentRoom.hero.outerBoxWidth>singleDrop.left && singleDrop.left+singleDrop.width>currentRoom.hero.left+currentRoom.hero.outerBoxWidth){
            document.querySelector('.drop-item[data-id="'+singleDrop.id+'"]').remove();
            dropPickingResult(i);
            currentRoom.drops.splice(i,1);
            i--;
            let pickUpEffect = document.createElement('div');
            pickUpEffect.className = 'pick-up-layer';
            pickUpEffect.setAttribute('fade-in',30);
            pickUpEffect.style.opacity = 1;
            domRoomWrapper.append(pickUpEffect);
            
          }
        } else if(currentRoom.hero.direction=='toLeft'){
            if(currentRoom.hero.left<singleDrop.left+singleDrop.width && singleDrop.left<currentRoom.hero.left){
            document.querySelector('.drop-item[data-id="'+singleDrop.id+'"]').remove();
            dropPickingResult(i);  
            currentRoom.drops.splice(i,1);
            i--;
            let pickUpEffect = document.createElement('div');
            pickUpEffect.className = 'pick-up-layer';
            pickUpEffect.setAttribute('fade-in',30);
            pickUpEffect.style.opacity = 1;
            domRoomWrapper.append(pickUpEffect);
            
          }
        }
   }
}

function dropPickingResult(i){
  let singleDrop = currentRoom.drops[i];
  if(singleDrop.type=='health'){
    currentRoom.hero.health+=singleDrop.power;
    if(currentRoom.hero.health>currentRoom.hero.maxHealth){
      currentRoom.hero.health=currentRoom.hero.maxHealth;
    }
    updateHealthBar();
  } else if (singleDrop.type=='jewerly'){
    currentRoom.levelPoints+=singleDrop.points;
    document.getElementById('level-points-number').innerHTML = currentRoom.levelPoints;
  } else if(singleDrop.type=='weapon'){
    let pickedWeaponObj = Object.assign({}, weaponsSource[singleDrop.name]);
    let weaponMatched = false;
    for(let i=0;i<currentRoom.hero.weaponsSet.length;i++){
      if(currentRoom.hero.weaponsSet[i].name==pickedWeaponObj.name){
        if(pickedWeaponObj.type=='ranged'){
          currentRoom.hero.weaponsSet[i].ammo+=pickedWeaponObj.ammo;
        } else if(pickedWeaponObj.type=='melee') {
          currentRoom.hero.weaponsSet[i].durability=pickedWeaponObj.durability;
        }
        weaponMatched = true;
        break;
      }
    }
    if(!weaponMatched){
       currentRoom.hero.weaponsSet.push(pickedWeaponObj);
      if(currentRoom.hero.weaponsSet.length==2){
        changeWeapon(1);
        currentRoom.hero.weaponIndex = 1;
      }
     
    }
    
    //console.log('weaponsSet',currentRoom.hero.weaponsSet);
  }
}
  
function gameOver(){
clearInterval(nIntervId);
let elGameOverWrapp = document.createElement('div');
elGameOverWrapp.className= 'game-over-wrap';
elGameOverWrapp.innerHTML = `
<button id="game-over-reset-btn" class="game-over-reset-btn">Try again</button>
`;
domRoomWrapper.append(elGameOverWrapp);
document.getElementById('game-over-reset-btn').addEventListener('click',gameInit);
}
  
function levelFinished(){
clearInterval(timerInterval);
let elSuccessWrapp = document.createElement('div');
elSuccessWrapp.className= 'game-success';
elSuccessWrapp.innerHTML = `
<div class="success-title">Success!</div>
<div class="success-points">`+gameState.playerPoints+`</div>
<button id="success-next-btn" class="success-next-btn">Next level</button>
`;
domGameScene.append(elSuccessWrapp);
document.getElementById('success-next-btn').addEventListener('click',gameInit);
}
  
function levelEndPointsCalc(){

}


  

//Кнопки
function keydown(e) {
  //Нажатие
	if (e.keyCode == 68 && !currentRoom.hero.walkRightPushed) {
		currentRoom.hero.walkRightPushed = true;
     if(currentRoom.hero.weaponSelect && !currentRoom.hero.walkLeftPushed){
    inventorySelectChange('right');
    }
	}
	if (e.keyCode == 65 && !currentRoom.hero.walkLeftPushed) {
		currentRoom.hero.walkLeftPushed = true;
    if(currentRoom.hero.weaponSelect && !currentRoom.hero.walkRightPushed){
     inventorySelectChange('left');
    }
	}
	if (e.keyCode == 83 && !currentRoom.hero.crouchPushed) {
		currentRoom.hero.crouchPushed = true;
     if(currentRoom.hero.weaponSelect && !currentRoom.hero.walkUpPushed){
     inventorySelectChange('down');
    }
	}
	if (e.keyCode == 87 && !currentRoom.hero.walkUpPushed) {
		currentRoom.hero.walkUpPushed = true;
     if(currentRoom.hero.weaponSelect && !currentRoom.hero.crouchPushed){
     inventorySelectChange('up');
    }
	}
	if (e.keyCode == 74) {
		currentRoom.hero.attackDowned = true;
	}
	if (e.keyCode == 75) {
		currentRoom.hero.weaponSelect = true;
    renderWeaponSelect();
	}
	if (e.keyCode == 77) {
		//M | Toggle Map
    toggleMap();
	}
	if (e.keyCode == 80) {
	//P | pause
	pauseGame();
	console.log('set pause');
	}
}
function keyup(e) {
  //Отжатие
	if (e.keyCode == 68) {
		currentRoom.hero.walkRightPushed = false;
    if(currentRoom.hero.weaponSelect){
    currentRoom.hero.weaponSelectChanged = false
    }
	}
	if (e.keyCode == 65) {
		currentRoom.hero.walkLeftPushed = false;
    if(currentRoom.hero.weaponSelect){
    currentRoom.hero.weaponSelectChanged = false
    }
	}
	if (e.keyCode == 83) {
		currentRoom.hero.crouchPushed = false;
        if(currentRoom.hero.weaponSelect){
    currentRoom.hero.weaponSelectChanged = false
    }
	}
	if (e.keyCode == 87) {
		currentRoom.hero.walkUpPushed = false;
    if(currentRoom.hero.weaponSelect){
    currentRoom.hero.weaponSelectChanged = false
    }
	}
	if (e.keyCode == 74) {
		currentRoom.hero.attackDowned = false;
	}
  if (e.keyCode == 75) {
		currentRoom.hero.weaponSelect = false;
    document.getElementById('weapon-select-box').remove();
    runGame();
	}
}  

  
function heroWalking(){
  //changing direction
  if(currentRoom.hero.walkRightPushed && currentRoom.hero.direction != 'toRight'){
        currentRoom.hero.direction = 'toRight';
        domHero.setAttribute('direction',currentRoom.hero.direction);
  }
  if(currentRoom.hero.walkLeftPushed && currentRoom.hero.direction != 'toLeft'){
        currentRoom.hero.direction = 'toLeft';
        domHero.setAttribute('direction',currentRoom.hero.direction);
  }
  //moves toRight
   if(currentRoom.hero.walkRightPushed && !currentRoom.hero.crouchPushed && !currentRoom.hero.meleeRolls){
    currentRoom.frontEnemyRightEdge = 'empty';
      for(let b=0;b<currentRoom.enems.length;b++){
      let singleEn = currentRoom.enems[b];
      if(singleEn.direction=='toLeft' && !singleEn.dead){
        if(currentRoom.frontEnemyRightEdge == 'empty'){
            currentRoom.frontEnemyRightEdge = singleEn.left;
         } else if(singleEn.left<currentRoom.frontEnemyRightEdge){
           currentRoom.frontEnemyRightEdge = singleEn.left;
         }
      }
      }

    if(currentRoom.hero.left+currentRoom.hero.outerBoxWidth+currentRoom.hero.speed>currentRoom.frontEnemyRightEdge && currentRoom.frontEnemyRightEdge<gameSettings.scene.width-gameSettings.walkBorder+1 && currentRoom.frontEnemyRightEdge != 'empty'){
    currentRoom.hero.left = currentRoom.frontEnemyRightEdge-currentRoom.hero.outerBoxWidth;
    }
    else if(currentRoom.hero.left+currentRoom.hero.outerBoxWidth+currentRoom.hero.speed>gameSettings.scene.width-gameSettings.walkBorder) {
      currentRoom.hero.left = gameSettings.scene.width-gameSettings.walkBorder-currentRoom.hero.outerBoxWidth;
    } 
    else {
    currentRoom.hero.left += currentRoom.hero.speed;
    }
    domHero.style.left=currentRoom.hero.left+'px';
  }
  //moves toLeft
  if(currentRoom.hero.walkLeftPushed && !currentRoom.hero.crouchPushed && !currentRoom.hero.meleeRolls){
    currentRoom.frontEnemyLeftEdge = 'empty';
      for(let b=0;b<currentRoom.enems.length;b++){
      let singleEn = currentRoom.enems[b];
      if(singleEn.direction=='toRight' && !singleEn.dead){
        if(currentRoom.frontEnemyLeftEdge == 'empty'){
            currentRoom.frontEnemyLeftEdge = singleEn.left+singleEn.outerBoxWidth;
         } else if(singleEn.left+singleEn.outerBoxWidth>currentRoom.frontEnemyLeftEdge){
           currentRoom.frontEnemyLeftEdge = singleEn.left+singleEn.outerBoxWidth;
         }
      }
      }

    if(currentRoom.hero.left-currentRoom.hero.speed<currentRoom.frontEnemyLeftEdge && currentRoom.frontEnemyLeftEdge>gameSettings.walkBorder-1 && currentRoom.frontEnemyLeftEdge != 'empty'){
    currentRoom.hero.left = currentRoom.frontEnemyLeftEdge;
    }
    else if(currentRoom.hero.left-currentRoom.hero.speed<gameSettings.walkBorder) {
      currentRoom.hero.left = gameSettings.walkBorder;
    } 
    else {
    currentRoom.hero.left -= currentRoom.hero.speed;
    }
    domHero.style.left=currentRoom.hero.left+'px';
  }
  //crouching
  if(currentRoom.hero.crouchPushed){
    domHero.style.height = currentRoom.hero.crouchHeight+'px';
  }
  if(!currentRoom.hero.crouchPushed && +domHero.style.height != currentRoom.outerBoxHeight){
    domHero.style.height = currentRoom.hero.outerBoxHeight+'px';
  }
}

function renderDamageLayer(){
  let crelDamageLayer = document.createElement('div');
crelDamageLayer.className = 'damage-layer';
crelDamageLayer.style.opacity = 1;
domRoomWrapper.append(crelDamageLayer);
}

function renderLevelPanel(){
 

 

  
let crelLevelPanel = document.createElement('div');
crelLevelPanel.id = 'level-panel';
crelLevelPanel.style.left = '15px';
crelLevelPanel.style.top = gameSettings.scene.height-gameSettings.floorBottom+15+'px';
crelLevelPanel.style.right = '15px';
crelLevelPanel.style.bottom = '15px';





let crelWeaponBar = document.createElement('div');
crelWeaponBar.id = 'weapon-bar';

crelLevelPanel.append(crelWeaponBar);



  
domRoomWrapper.append(crelLevelPanel);
domLevelPanel = document.getElementById('level-panel');
renderHealthBar();
updateWeaponBar();
}
  
function renderHealthBar(){
 let crelHealthBar = document.createElement('div');
crelHealthBar.className = 'hero-health-bar';
 let crelHealthBarFiller = document.createElement('div');
crelHealthBarFiller.className = 'hero-health-bar__filler';
crelHealthBar.innerHTML = '<div class="hero-health-bar__numbers"><span id="hero-current-health">'+currentRoom.hero.health+'/'+currentRoom.hero.maxHealth+'</span></div>';
crelHealthBar.append(crelHealthBarFiller);
domLevelPanel.append(crelHealthBar);
domHealthBarFiller = document.querySelector('.hero-health-bar__filler');
}
  
function countPercent(smaller,bigger) {
  return (smaller/bigger)*100;
}
  
function updateHealthBar(){
  domHealthBarFiller.style.width = countPercent(currentRoom.hero.health,currentRoom.hero.maxHealth)+'%';
  document.getElementById('hero-current-health').innerHTML = currentRoom.hero.health+'/'+currentRoom.hero.maxHealth;
}

function changeWeapon(weaponIndex){
  currentRoom.hero.weapon = {};
  currentRoom.hero.weapon = currentRoom.hero.weaponsSet[weaponIndex];
  renderWeapon();
  updateWeaponBar();
  //console.log('currentRoom.hero.weapon',currentRoom.hero.weapon);
}

function updateWeaponBar(){
    let weaponName = currentRoom.hero.weapon.name;
    let weaponQuant;
    if(currentRoom.hero.weapon.type=='ranged'){
      weaponQuant = currentRoom.hero.weapon.ammo;
    } else if(currentRoom.hero.weapon.durability){
      weaponQuant = currentRoom.hero.weapon.durability;
    }
    document.getElementById('weapon-bar').innerHTML='<span>'+weaponName+'</span>';
    if(currentRoom.hero.weapon.type=="ranged" || currentRoom.hero.weapon.durability){
      document.getElementById('weapon-bar').innerHTML+='<span>'+weaponQuant+'</span>';
    }
}

  function renderWeaponSelect(){
    if(document.getElementById('weapon-select-box')==null){
    pauseGame();
    let crelWeaponSelectWrap = document.createElement('div');
    crelWeaponSelectWrap.id = "weapon-select-box";
    
    let cellStartLeft=15;
    let cellStartTop=15;
    let cellNumber = 1;
    for(let i=0;i<currentRoom.hero.weaponsSet.length;i++){
      //ячейка
      let crelWepSelItem = document.createElement('div');
      crelWepSelItem.className = 'weapon-select-cell';
      if(i==currentRoom.hero.weaponIndex){
      crelWepSelItem.className += ' weapon-select-cell_active';
      }
      crelWepSelItem.style.left = cellStartLeft+'px';
      crelWepSelItem.style.top = cellStartTop+'px';
      crelWepSelItem.style.width = gameSettings.inventoryCellWidth+'px';
      crelWepSelItem.style.height = gameSettings.inventoryCellHeight+'px';
      crelWepSelItem.setAttribute('inv-index',i);
      crelWepSelItem.innerHTML+='<div class="inv-pic-wrapper">'+currentRoom.hero.weaponsSet[i].pic+'</div>';
      crelWepSelItem.innerHTML+='<div>'+currentRoom.hero.weaponsSet[i].name+'</div>';
      if(currentRoom.hero.weaponsSet[i].type=='ranged'){
        crelWepSelItem.innerHTML+='<div> Ammo: '+currentRoom.hero.weaponsSet[i].ammo+'</div>';
      } else if(currentRoom.hero.weaponsSet[i].type=='melee' && currentRoom.hero.weaponsSet[i].name!='hands'){
        crelWepSelItem.innerHTML+='<div> Durability: '+currentRoom.hero.weaponsSet[i].durability+'</div>';
      }
      crelWeaponSelectWrap.append(crelWepSelItem);
      cellStartLeft+=gameSettings.inventoryCellWidth+gameSettings.inventoryGap;
      if(cellNumber==gameSettings.inventoryCols){
        cellNumber=1;
        cellStartTop+=gameSettings.inventoryCellHeight+gameSettings.inventoryGap;
        cellStartLeft = 15;
      } else {
        cellNumber++;
      }
    }
    domRoomWrapper.append(crelWeaponSelectWrap);
  }
  }

 function inventorySelectChange(direction){
   if(!currentRoom.hero.weaponSelectChanged){
    if(direction=='right' && currentRoom.hero.weaponIndex<currentRoom.hero.weaponsSet.length-1){
      currentRoom.hero.weaponIndex++;
    } else if(direction=='left' && currentRoom.hero.weaponIndex>0) {
      currentRoom.hero.weaponIndex--;
    } else if(direction=='down' && currentRoom.hero.weaponIndex<currentRoom.hero.weaponsSet.length-1){
      if(currentRoom.hero.weaponIndex+gameSettings.inventoryCols<currentRoom.hero.weaponsSet.length){
      currentRoom.hero.weaponIndex+=gameSettings.inventoryCols;
      }
    } else if(direction=='up' && currentRoom.hero.weaponIndex>gameSettings.inventoryCols-1){
      currentRoom.hero.weaponIndex-=gameSettings.inventoryCols;
    }
   changeWeapon(currentRoom.hero.weaponIndex);
   let domInvSelectItemsCollection = document.getElementsByClassName('weapon-select-cell');
   for(let i=0;i<domInvSelectItemsCollection.length;i++){
     let singleSelect = domInvSelectItemsCollection[i];
     //console.log('singleSelect',singleSelect.classList);
     if(singleSelect.classList.contains('weapon-select-cell_active')){
       singleSelect.classList.remove('weapon-select-cell_active');
     }
     if(+singleSelect.getAttribute('inv-index')==currentRoom.hero.weaponIndex){
       singleSelect.classList.add('weapon-select-cell_active');
     }
   }
  currentRoom.hero.weaponSelectChanged = true;
 }
}

  function pauseGame(){
    clearInterval(nIntervId);
  }
  function runGame(){
    clearInterval(nIntervId);
    nIntervId = setInterval(frameBuilder,35/*16.7*/);
  }



function buildMapSections(){
  let iter = 'odd';
  let step = 1;
  let patternMatched = false;
  let sectionsCandidate = [];
  let colsQuant = 0;
  for(let i=0;1;i++){
    let singleStepObj = {};
    singleStepObj.step = step;
    if( iter == 'odd') {
    singleStepObj.rows = 1;
    singleStepObj.cols = 1;
    colsQuant++;
    } else if(iter == 'even') {
    singleStepObj.rows = getRandomIntInclusive(2,3);
    singleStepObj.cols = getRandomIntInclusive(1,3);
    colsQuant+=singleStepObj.cols;
    }
    //gameState.mapPointSections.push(singleStepObj);
    sectionsCandidate.push(singleStepObj);
    //console.log('варинат'+colsQuant);
     if(colsQuant==gameSettings.mapPointsMax && iter == 'even' || colsQuant>gameSettings.mapPointsMax){
colsQuant = 0;
       sectionsCandidate = [];
     }
      if(colsQuant==gameSettings.mapPointsMax && iter == 'odd'){
      patternMatched = true;
      break;
    }
  //смена четности
  if( iter == 'odd') {
     iter = 'even';
  } else {
     iter = 'odd';
  }
  step++;


  }//конец цикла
  if(patternMatched){
    gameState.mapPointSections=sectionsCandidate;
  }
  //console.log('gameState.mapPointSections',gameState.mapPointSections);
  buildMapPoints();
}

function buildMapPoints(){
  let mapStep = 0;
   for(let a=0;a<gameState.mapPointSections.length;a++){
      //Одна секция
     let section = gameState.mapPointSections[a];
     //console.log('section.cols: '+section.cols);
     for(let b=0;b<section.cols;b++){
     //Одна колонка 
       let column = [];
        for(let c=0;c<section.rows;c++){
        //один поинт начало
        let enemsCount = getRandomIntInclusive(gameSettings.roomEnMin,gameSettings.roomEnMax);
        //define enems set
        let ensTypesCount = getRandomIntInclusive(1,3);
        let ensTypes = [];
        let ensRandCopyMass = currentRoom.enemsRandMass.slice();
        for(let i=0;i<ensTypesCount;i++){
        let oneEnemyTypeIndex = getRandomIntInclusive(0,ensRandCopyMass.length-1);
        let cuttedType = ensRandCopyMass[oneEnemyTypeIndex];
            ensTypes.push(cuttedType);
          ensRandCopyMass.splice(oneEnemyTypeIndex,1);
        }
        console.log('ensTypes: ',ensTypes);
        //define weapons set
        let weaponsTypesCount = getRandomIntInclusive(1,3);
        let weaponsTypes = [];
        let weaponsRandCopyMass = currentRoom.weaponsRandMass.slice();
        for(let i=0;i<weaponsTypesCount;i++){
        let oneWeaponTypeIndex = getRandomIntInclusive(0,weaponsRandCopyMass.length-1);
        let cuttedType = weaponsRandCopyMass[oneWeaponTypeIndex];
            weaponsTypes.push(cuttedType);
          weaponsRandCopyMass.splice(oneWeaponTypeIndex,1);
        }
        //console.log('weaponsTypes: ',weaponsTypes); 
          
        //create enems objects
        enemsObjects = [];
        for(let i=0;i<enemsCount;i++){
          let enType;
          if(ensTypesCount==1){
            enType = ensTypes[0];
          } else {
             enType = ensTypes[getRandomIntInclusive(0,ensTypesCount-1)];
          }
          
          let randDropMassNumber = getRandomIntInclusive(0, currentRoom.dropsRandMass.length-1);
          let randDropName = currentRoom.dropsRandMass[randDropMassNumber];
          singleEnObj = Object.assign({}, enemsSource[enType]);
          singleEnObj.drop = Object.assign({}, dropsSource[randDropName]);

          enemsObjects.push(singleEnObj);
        }
          //console.log('enemsObjects',enemsObjects);
          //console.log('----------------------------------------');
let SinglePointObj = {
            step:mapStep,
          unlocked:false,
          currentRow:c,
};
  if(a==0 && c==0){
      //самая первая ячейка
     SinglePointObj.current = true;
    SinglePointObj.unlocked = true;
    SinglePointObj.startingPoint = true;
    }
    if(a==1 && b==0){
      //вторая колонка
      SinglePointObj.unlocked = true;
    }
    if(a+1==gameState.mapPointSections.length && b==0){
      //самая последняя ячейка
      SinglePointObj.finishingPoint = true;
    }
        if(!SinglePointObj.startingPoint && !SinglePointObj.finishingPoint){
        //build point 
          SinglePointObj.rules={
            enemsCount:enemsCount,
           enemsTypes:ensTypes,
          weaponsTypes:weaponsTypes,
          enemsObjects:enemsObjects,
          };
        }
console.log('weaponsTypes',weaponsTypes);
          column.push(SinglePointObj);
        //console.log('column: ',column);
          //один поинт конец
        }

       
       gameState.mapPoints.push(column);
      mapStep++;
     }//конец колонки

   }//конец секции
  //console.log('gameState.mapPoints: ',gameState.mapPoints);
}

function renderMap(){
  if(document.getElementById('map')!=null){
    document.getElementById('map').remove();
  }
  let crelMap = document.createElement('div');
  let crelStepsWrapper = document.createElement('div');
  crelStepsWrapper.className = 'steps-wrapper';
  for(let i=0;i<gameState.mapPoints.length;i++){
    //Отдельная колонка
    let singleCol = gameState.mapPoints[i];
     let crelCol = document.createElement('div');
    crelCol.className = 'map-col'; 
  for(let r=0;r<singleCol.length;r++){
    //Отдельный поинт
     let crelRow = document.createElement('div');
    crelRow.className = 'map-row';
    if(!singleCol[r].unlocked && !singleCol[r].finishingPoint){
    crelRow.append('Locked');
    }
    crelRow.setAttribute('data-col',i);
    crelRow.setAttribute('data-row',r);
    if(singleCol[r].startingPoint){
      crelRow.append('Starting point');
    }
    if(singleCol[r].finishingPoint){
      crelRow.append('Finishing point');
    }
  if(singleCol[r].unlocked){
      crelRow.classList.add('unlocked');
    crelRow.append('Unlocked');
    }
    if(singleCol[r].current){
      crelRow.append('Current');
      crelRow.classList.remove('unlocked');
      crelRow.classList.add('current'); 
    }
    if(singleCol[r].finished){
      crelRow.classList.remove('unlocked');
      crelRow.classList.add('finished'); 
    }
    if(!singleCol[r].startingPoint && !singleCol[r].finishingPoint){
    let pointEnemsTypes = '';
    for(let e=0;e<singleCol[r].rules.enemsTypes.length;e++){
      pointEnemsTypes+='<div>'+singleCol[r].rules.enemsTypes[e]+'</div>';
    }
    let pointWeaponsTypes = '';
    for(let e=0;e<singleCol[r].rules.weaponsTypes.length;e++){
      pointWeaponsTypes+='<div>'+singleCol[r].rules.weaponsTypes[e]+'</div>';
    }
  
    crelRow.innerHTML+=`
    <div>Col: `+i+` Point: `+r+`</div>
    <div>enemsCount: (`+singleCol[r].rules.enemsCount+`)</div>
    <!--div>Enemyes types:</div-->
    <div class="point-enems-types">`+pointEnemsTypes+`</div>
    <!--div>Weapons types:</div-->
    <div class="point-weapons-types">`+pointWeaponsTypes+`</div>
    `;
    }
    if(!singleCol[r].current && !singleCol[r].finished && singleCol[r].unlocked){
    let crelStartBtn = document.createElement('button');
    crelStartBtn.append('select');
    crelStartBtn.className='point-select-btn';
    crelRow.append(crelStartBtn);
    }
    crelCol.append(crelRow);
    }//конец рядов
      crelStepsWrapper.append(crelCol);
  }//конец колонки

    crelMap.append(crelStepsWrapper);
  crelMap.id="map";
crelMap.className="map-hidden";
  domScene.append(crelMap);
  addEventsOnMap();
}

function toggleMap(){
	let rendMap = document.getElementById('map');
	if(rendMap.classList.contains('map-visible')){
		rendMap.classList.remove('map-visible');
		rendMap.classList.add('map-hidden');
	} else if (rendMap.classList.contains('map-hidden')) {
		rendMap.classList.remove('map-hidden');
		rendMap.classList.add('map-visible');
	}
}

function addEventsOnMap(){
  let pointSelectsCollection = document.getElementsByClassName('point-select-btn');
  for(let i=0;i<pointSelectsCollection.length;i++){
    pointSelectsCollection[i].onclick=mapPointSelect;
  }
}

  function mapPointSelect(){
    let currentCol = +this.closest('.map-row').getAttribute('data-col');
    let currentRow = +this.closest('.map-row').getAttribute('data-row');
    let currentColNext = +currentCol+1;
    if(gameState.mapPoints[currentCol][currentRow].unlocked && currentCol>gameState.currentMapPointCol){
      delete gameState.mapPoints[gameState.currentMapPointCol][gameState.currentMapPointRow].current;
      gameState.mapPoints[gameState.currentMapPointCol][gameState.currentMapPointRow].finished = true;
      gameState.mapPoints[currentCol][currentRow].current=true;
      if(gameState.mapPoints[currentCol].length>1){
        for(let i=0;i<gameState.mapPoints[currentCol].length;i++){
          if(!gameState.mapPoints[currentCol][i].current){
          gameState.mapPoints[currentCol][i].unlocked = false;
          }
        }
      }
      gameState.currentMapPointCol = currentCol;
      gameState.currentMapPointRow = currentRow;
      if(currentCol+1<gameState.mapPoints.length){
      if(gameState.mapPoints[currentCol].length==1) {
        for(let i=0;i<gameState.mapPoints[currentColNext].length;i++){
          gameState.mapPoints[currentColNext][i].unlocked = true;
          
        }
      } else if(gameState.mapPoints[currentColNext].length==1) {
        gameState.mapPoints[currentColNext][0].unlocked = true;
      } else if(gameState.mapPoints[currentColNext].length>1) {
        gameState.mapPoints[currentColNext][currentRow].unlocked = true;
      }
    }
createAndRenderRoom();
toggleMap();
renderMap();
//console.log('gameState.mapPoints after',gameState.mapPoints);
    }//конец 
  }

sceneRender();
//createAndRenderRoom(); 

buildMapSections();  
function frameBuilder() {
heroWalking();
heroAttacks();
objectTimersChange();
moveProjectiles();
projectilesCollision();
moveEnemies();
dropsCollision();
}

renderMap();

document.addEventListener('keydown',keydown);
document.addEventListener('keyup',keyup);



//DevTools starts
function devToolsRender(){
  if(document.getElementById('devTools')){
    document.getElementById('devTools').remove();
  }
  let crelDevTools = document.createElement('div');
  crelDevTools.id = 'devTools';
crelDevTools.innerHTML =`
<button id="setRoom">Start Room</button>
<button id="setMenu">Start Menu</button>
<button id="setHands">Hands</button>
<button id="setGun">Gun</button>
<button id="setMachineGun">MachineGun</button>
<button id="setRifle">Rifle</button>
<button id="setKnife">knife</button>
<button id="setAxe">axe</button>
<button id="setMachete">machete</button>
<button id="setPause">Pause</button>
<button id="setFrame">NextFrame</button>
<button id="setPlay">Play</button>
<button id="setWave">MakeWave</button>
<button id="toggleMap">toggleMap</button>
`;
document.getElementsByTagName('body')[0].append(crelDevTools);
document.getElementById('setRoom').onclick = function(){
  createAndRenderRoom();
  console.log('gameInit');
};
document.getElementById('setHands').onclick = function(){
  changeWeapon('hands');
  console.log('setHands');
};
document.getElementById('setGun').onclick = function(){
  changeWeapon('gun');
  console.log('setGun');
};
document.getElementById('setMachineGun').onclick = function(){
  changeWeapon('machineGun');
  console.log('setMachineGun');
};
document.getElementById('setRifle').addEventListener('click', function(){
  changeWeapon('rifle');
  console.log('set Rifle');
});
document.getElementById('setKnife').onclick = function(){
  changeWeapon('knife');
  console.log('setKnife');
};
document.getElementById('setAxe').onclick = function(){
  changeWeapon('axe');
  console.log('setAxe');
};
document.getElementById('setMachete').onclick = function(){
  changeWeapon('machete');
  console.log('setMachete');
};
document.getElementById('setPause').onclick = function(){
  pauseGame();
  console.log('setPause');
};
document.getElementById('setPlay').onclick = function(){
  nIntervId = setInterval(frameBuilder,35/*16.7*/);
  console.log('setPlay');
};
document.getElementById('setFrame').onclick = function(){
  frameBuilder();
  console.log('setNextFrame');
};
document.getElementById('setWave').onclick = function(){
  createAndRenderEnems();
  console.log('setWave');
};
document.getElementById('toggleMap').onclick = function(){
  toggleMap();
  console.log('toggleMap');
};
};
devToolsRender();
//DevTools ends
  
}//gameInit end
let nIntervId;


let crelInitBtn = document.createElement('button');
crelInitBtn.id = 'init';
crelInitBtn.style='position:absolute;z-index:10;';  
crelInitBtn.append('init');
document.getElementsByTagName('body')[0].append(crelInitBtn);
document.getElementById('init').onclick = gameInit;
});
