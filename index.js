let startTime, endTime;
let imageSize = "";
let image = new Image();
let bitSpeed = document.getElementById('bitS'),
    kbSpeed = document.getElementById('kbS'),
    mbSpeed = document.getElementById('mbS'),
    info = document.getElementById('info');

let totalBitSpeed = 0;
let totalKbSpeed = 0;
let totalMbSpeed = 0;
let numTest = 1;
let testCompleted = 0;

// Get Random Image from unsplash.com

let imageApi = 'https://source.unsplash.com/random?topic=nature';

// when image loaded

image.onload = async function () {
    endTime = new Date().getTime();
    // GET IMAGE SIZE
    await fetch(imageApi).then(res => {
        imageSize = res.headers.get('content-length');
        calculateSpeed();
    }
    );
};

// Function to calculate speed

function calculateSpeed() {
    // Time difference in milliseconds
    let timeDuration = (endTime - startTime) / 1000;
    // Total bits
    let loadedBits = imageSize * 8;
    let speedInBits = loadedBits / timeDuration;
    let speedInKbs = speedInBits / 1024;
    let speedInMbs = speedInKbs / 1024;

    totalBitSpeed += speedInBits;
    totalKbSpeed += speedInKbs;
    totalMbSpeed += speedInMbs;

    testCompleted++;

    // if all test completed(then calculate average speed)
    if (testCompleted === numTest) {
        let avgBitSpeed = (totalBitSpeed / numTest).toFixed(2);
        let avgKbSpeed = (totalKbSpeed / numTest).toFixed(2);
        let avgMbSpeed = (totalMbSpeed / numTest).toFixed(2);

        //Display average speed
        bitSpeed.innerHTML += `: ${avgBitSpeed} bps`;
        kbSpeed.innerHTML += `: ${avgKbSpeed} kbps`;
        mbSpeed.innerHTML += `: ${avgMbSpeed} mbps`;

        info.innerHTML = "Test Completed!";
    } else {
        // Run the next test
        startTime = new Date().getTime();
        image.src = imageApi;

    }
}

// function to start the test
const init = async () => {
    info.innerHTML = "Testing...";
    startTime = new Date().getTime();
    image.src = imageApi;
};

// Start the test
window.onload = () => {
    for (let i = 0; i < numTest; i++) {
        init();
    }
};
