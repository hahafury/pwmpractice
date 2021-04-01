burgerMenu = document.querySelector('.burgerMenu');
navigation = document.querySelector('.navigation')

var rightNum = getCssProperty(navigation, 'right');

function burgerMenuVisible(){
    navigation.style.display = 'flex';
    burgerMenu.style.display = 'none';
    setTimeout(visNav, 1);
    console.log('yeas');
    return navigation;
};

function visNav (){
    rightNum = rightNum.replace(/[^+\d]/g, '');
    rightNum = parseInt(rightNum);
    rightNum = -rightNum;
    calcRight = rightNum + 170;
    calcRight += 'px';
    navigation.style.right = calcRight;
}

function getCssProperty(elmId, property){
    let result = window.getComputedStyle(elmId,null).getPropertyValue(property)
    return result;
 }


