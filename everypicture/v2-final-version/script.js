var hkPlate = document.querySelector('#hk-plate');
var londonPlate = document.querySelector('#london-plate');
var miamiPlate = document.querySelector('#miami-plate');

if (hkPlate) {
    hkPlate.addEventListener('click', function() {
        window.location.href = 'hong-kong.html';
    });
    
    hkPlate.addEventListener('mouseover', function() {
        hkPlate.style.transform = 'scale(1.1)';
    });
    
    hkPlate.addEventListener('mouseout', function() {
        hkPlate.style.transform = 'scale(1)';
    });
}

if (londonPlate) {
    londonPlate.addEventListener('click', function() {
        window.location.href = 'london.html';
    });
    
    londonPlate.addEventListener('mouseover', function() {
        londonPlate.style.transform = 'scale(1.1)';
    });
    
    londonPlate.addEventListener('mouseout', function() {
        londonPlate.style.transform = 'scale(1)';
    });
}

if (miamiPlate) {
    miamiPlate.addEventListener('click', function() {
        window.location.href = 'miami.html';
    });
    
    miamiPlate.addEventListener('mouseover', function() {
        miamiPlate.style.transform = 'scale(1.1)';
    });
    
    miamiPlate.addEventListener('mouseout', function() {
        miamiPlate.style.transform = 'scale(1)';
    });
}

var flipCard = document.querySelector('#flipCard');

if (flipCard) {
    flipCard.addEventListener('click', function() {
        if (flipCard.className.indexOf('flipped') !== -1) {
            flipCard.className = 'flip-card';
        } else {
            flipCard.className = 'flip-card flipped';
        }
    });
}

var leftArrow = document.querySelector('#leftArrow');
var rightArrow = document.querySelector('#rightArrow');

if (leftArrow && rightArrow) {
    var currentPage = window.location.pathname;
    
    if (currentPage.indexOf('hong-kong.html') !== -1) {
        leftArrow.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
        
        rightArrow.addEventListener('click', function() {
            window.location.href = 'london.html';
        });
    }
    
    if (currentPage.indexOf('london.html') !== -1) {
        leftArrow.addEventListener('click', function() {
            window.location.href = 'hong-kong.html';
        });
        
        rightArrow.addEventListener('click', function() {
            window.location.href = 'miami.html';
        });
    }
    
    if (currentPage.indexOf('miami.html') !== -1) {
        leftArrow.addEventListener('click', function() {
            window.location.href = 'london.html';
        });
        
        rightArrow.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
    
    leftArrow.addEventListener('mouseover', function() {
        leftArrow.style.transform = 'scale(1.2)';
    });
    
    leftArrow.addEventListener('mouseout', function() {
        leftArrow.style.transform = 'scale(1)';
    });
    
    rightArrow.addEventListener('mouseover', function() {
        rightArrow.style.transform = 'scale(1.2)';
    });
    
    rightArrow.addEventListener('mouseout', function() {
        rightArrow.style.transform = 'scale(1)';
    });
}