console.log('HELLO');


// Create player elements
const p1elem = document.createElement('div');
p1elem.id = 'player1';
p1elem.style.position = 'absolute';  // Ensure player is positioned absolutely
main.appendChild(p1elem);

const p2elem = document.createElement('div');
p2elem.id = 'player2';
main.appendChild(p2elem);

// Function to move the player based on absolute screen coordinates (x, y)
function move(elem, x, y) {
    elem.style.left = `${x}px`;
    elem.style.top = `${y}px`;
}
// const allCircles = []; // Array to store all the circle elements
// Function to generate circles in concentric patterns
function generateCircles() {
    // Reset circleIdCounter to prevent IDs from growing too large
    circleIdCounter = 0;
    // const main = document.getElementById('main')

    const circleCount = 60;
    const innerCircleCount = 10;
    const middleCircleCount = 20;
    const outerCircleCount = 30;
    const radiusStep = 60; // Step between radii for each circle layer
    const circleRadius = 25; // Radius of each circle

    let angleStep = 360 / innerCircleCount; // Angle step for inner circle

    // Create the inner circle (10 circles)
    for (let i = 0; i < innerCircleCount; i++) {
        const angle = angleStep * i; // Angle for each circle
        const x = 300 + Math.cos(angle * Math.PI / 180) * radiusStep; // X position
        const y = 300 + Math.sin(angle * Math.PI / 180) * radiusStep; // Y position

        const circle = createCircle(x, y);
        main.appendChild(circle);
    }

    angleStep = 360 / middleCircleCount; // Angle step for middle circle

    // Create the middle circle (20 circles)
    for (let i = 0; i < middleCircleCount; i++) {
        const angle = angleStep * i; // Angle for each circle
        const x = 300 + Math.cos(angle * Math.PI / 180) * (radiusStep * 2); // X position
        const y = 300 + Math.sin(angle * Math.PI / 180) * (radiusStep * 2); // Y position

        const circle = createCircle(x, y);
        main.appendChild(circle);
    }

    angleStep = 360 / outerCircleCount; // Angle step for outer circle

    // Create the outer circle (30 circles)
    for (let i = 0; i < outerCircleCount; i++) {
        const angle = angleStep * i; // Angle for each circle
        const x = 300 + Math.cos(angle * Math.PI / 180) * (radiusStep * 3); // X position
        const y = 300 + Math.sin(angle * Math.PI / 180) * (radiusStep * 3); // Y position

        const circle = createCircle(x, y);
        main.appendChild(circle);
    }

    // Print out the list of all circle IDs
    allCircles.forEach(circle => {
        console.log(circle.id); // Prints each circle's ID
    });
}

const allCircles = []; 
// Helper function to create a circle element
function createCircle(x, y) {
    const main = document.getElementById('main')
    const circle = document.createElement('div');
    circle.classList.add('special-cell');  // Add a class to the circle for styling
    circle.style.width = '30px';  // Circle width
    circle.style.height = '30px'; // Circle height
    circle.style.borderRadius = '50%';  // Make it circular
    circle.style.backgroundColor = 'white'; // Initial color
    circle.style.position = 'absolute';  // Position absolutely
    circle.style.left = `${x - 25}px`;  // Center the circle
    circle.style.top = `${y - 25}px`;  // Center the circle
    
    // Generate a unique ID for the circle
    circle.id = `circle-${circleIdCounter}`;
    circleIdCounter++; // Increment the counter for the next circle

    allCircles.push(circle); // Add the circle to the list of all circles
    

    // Add a click event listener to handle recall phase
    circle.addEventListener('click', function() {
        if (isInteractionBlocked) return;  // Prevent interaction during the delay phase
        if (circle === targetCircle) {
            circle.style.backgroundColor = 'green';  // Correct, turn green
        } else {
            circle.style.backgroundColor = 'red';  // Incorrect, turn red
        }
    });


    return circle;
}

function resetCircles() {
    allCircles.forEach(circle => {
        circle.remove(); // Remove each circle from the DOM
    });
    allCircles.length = 0; // Clear the array holding the circles
}

let trialNumber = 1;  // Keep track of the current trial number
let BlockID = 1;
let TargetNums = [2, 4, 6, 8, 10]

// Function to determine the number of target circles based on the trial number
function getTargetCircleCount(trialNumbe, BlockID) {

    if (BlockID === 1)
        if (trialNumber === 1) {
            return TargetNums[0];  // Trial 1: 2 target circle
        } else if (trialNumber === 2) {
            return TargetNums[1];  // Trial 2: 4 target circles
        } else if (trialNumber === 3) {
            return TargetNums[2];  // Trials 3: 6 target circles 
        } else if (trialNumber === 4) {
            return TargetNums[3];  // Trials 3: 8 target circles 
        } else if (trialNumber === 5) {
            return TargetNums[4];  // Trials 3: 10 target circles 
        } else {
            return 
        }
    else         
        if (trialNumber === 1) {
            TargetNums = [2, 4, 6, 8, 10]
            TargetNums = shuffle(TargetNums);
            console.log(TargetNums); // Always [1, 5, 10] in a random order
            return TargetNums[0];  // Trial 1: random target circle(s) 2, 3, 4, 6, or 10
        } else if (trialNumber === 2) {
            return TargetNums[1];  // Trial 2: random target circle(s) 2, 3, 4, 6, or 10
        } else if (trialNumber === 3) {
            return TargetNums[2];  // Trials 3: random target circle(s) 2, 3, 4, 6, or 10
        } else if (trialNumber === 4) {
            return TargetNums[3];  // Trials 4: random target circle(s) 2, 3, 4, 6, or 10
        } else if (trialNumber === 5) {
            return TargetNums[4];  // Trials 5: random target circle(s) 2, 3, 4, 6, or 10
        } else {
            return 
        }
}

// Function that shuffles Target numbers so it is random... 
function shuffle(array) {
    let shuffled = array.slice(); // Create a copy of the array
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Random index
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }
    return shuffled;
}

// Function to handle block and trial transitions
function updateBlockAndTrial() {
    if (trialNumber > 5) {
        trialNumber = 1; // Reset trial number for the new block
        BlockID++; // Move to the next block
        console.log(`Starting Block ${BlockID}`);
    }
}



function handleColorChange(event, isCorrect, clickedCircleId, circle, clickedCircleIds) {
    if (isCorrect && !clickedCircleIds.includes(clickedCircleId)) {
        console.log(`Correct click! Circle ID: ${clickedCircleId}`);
        event.target.style.setProperty('background-color', 'green', 'important');
    } else if (!isCorrect && !clickedCircleIds.includes(clickedCircleId)) {
        console.log(`Incorrect click! Circle ID: ${clickedCircleId}`);
        event.target.style.setProperty('background-color', 'red', 'important');
    }
    // Block further interactions with the circle
    circle.style.setProperty('pointer-events', 'none');  // Prevent further interactions
    circle.classList.add('clicked');
    clickedCircleIds.push(clickedCircleId);
}



// Function to start the flash and handle interactions
function startFlash() {

    // Remove any existing countdown and "Go!" text before starting a new trial
    const existingCountdownElem = document.getElementById('countdown');
    if (existingCountdownElem) {
        existingCountdownElem.remove(); // Remove the previous countdown element if it exists
    }


    if (BlockID > 3) {
        console.log('Phase complete!');
        total_exp_data.push(trialData);
        console.log('Updated total Phase Data:', total_exp_data); //
        return; // Exit the function after all blocks are complete
    }

    resetCircles(); // Reset any previous circle states
    generateCircles(); // Generate the circles

    isInteractionBlocked = true; // Block interaction initially

    console.log('All Circles:', allCircles); // Log all circles to see the elements selected

    const numTargets = getTargetCircleCount(trialNumber, BlockID); // Get number of target circles
    console.log(`Block ${BlockID}, Trial ${trialNumber}: Showing ${numTargets} target(s).`);
    const targetCircles = [];
    

    // Select multiple random circles with non-adjacency constraint
    while (targetCircles.length < numTargets) {
        const randomIndex = Math.floor(Math.random() * allCircles.length);
        const targetCircle = allCircles[randomIndex];

        // Check if the selected circle is adjacent to any already selected target circles
        const isAdjacent = targetCircles.some(existingTarget => {
            const existingIndex = allCircles.indexOf(existingTarget);
            return Math.abs(existingIndex - randomIndex) === 1; // Check if adjacent
        });

        // Only add the circle if it's not adjacent to any of the already selected targets
        if (!targetCircles.includes(targetCircle) && !isAdjacent) {
            targetCircles.push(targetCircle);
            targetCircle.style.backgroundColor = 'black'; // Flash the circle
        }
    }

   

    // let totalGuesses = 0; // Track the number of guesses made (correct + incorrect)
    // const maxGuesses = numTargets; // Set max guesses to the number of target circles
    // let clickedCircleIds = [];
    let totalGuesses = 0; // Track the number of guesses made (correct + incorrect)
    const maxGuesses = numTargets; // Set max guesses to the number of target circles
    let clickedCircleIds = []; 
    let countdownElem = null; // Declare countdownElem outside the forEach loop

    // Flash each circle in targetCircles for 0.75 seconds
    targetCircles.forEach(targetCircle => {
        setTimeout(() => {
            if (targetCircle) {
                targetCircle.style.backgroundColor = 'white';  // Return to white after flashing
            } else {
                console.error('Target circle is undefined or missing.');
            }
    
            // Start the countdown after 0.75s
            if (countdownElem) {
                countdownElem.remove(); // Remove the previous countdown element if it exists
            }
    
            countdownElem = document.createElement('div');
            countdownElem.id = 'countdown';
            countdownElem.style.position = 'absolute';
            countdownElem.style.left = '50%';
            countdownElem.style.top = '50%';
            countdownElem.style.transform = 'translate(-50%, -50%)';
            countdownElem.style.fontSize = '40px';
            countdownElem.style.color = 'black';
            document.body.appendChild(countdownElem); // Append to body or main container
            
            let countdown = 5; // Set countdown to 5 seconds
    
            countdownElem.textContent = countdown;  // Display the countdown  
    
            // Update the countdown every second
            const countdownInterval = setInterval(() => {
                countdown--;
                countdownElem.textContent = countdown;  // Update the text
    
                if (countdown === 0) {
                    clearInterval(countdownInterval);  // Stop the countdown
                    countdownElem.textContent = 'Go!';  // Display "Go!"
                    isInteractionBlocked = false; // Allow interaction after countdown
                }
            }, 1000);
        }, 750); // Circle stays white for 0.75 seconds
    });
    // Add event listener to handle clicks
    document.querySelectorAll('.special-cell').forEach(circle => {

        circle.addEventListener('click', (event) => {

            // Interaction allowed only if interaction is not blocked and guess limit isn't reached
            if (!isInteractionBlocked && totalGuesses < maxGuesses) {
                totalGuesses++; // Increment guess count
    
                const clickedCircleId = event.target.id; // Get clicked circle ID
                console.log(`Clicked Circle ID: ${clickedCircleId}`); // Display clicked circle ID
    
                const isCorrect = targetCircles.includes(event.target); // Check if correct target
                console.log(`Circle IDs clicked: ${clickedCircleIds}`);

                handleColorChange(event, isCorrect, clickedCircleId, circle, clickedCircleIds);

                // Prepare the data to store in the trialData array
                const trialResult = {
                    trialNumber: trialNumber, // Add the current trial number
                    BlockID: BlockID, // Add the Block ID
                    numberOfTargets: targetCircles.length, // Add the number of target circles
                    circleId: clickedCircleId,
                    hit: isCorrect ? 1 : 0, // Store 1 if correct, 0 if incorrect
                    miss: !isCorrect ? 1 : 0, // Store 1 if incorrect, 0 if correct
                    totalTargets: targetCircles.length, // Store the total number of targets that flashed
                    timestamp: new Date().toISOString() // Add a timestamp
                };
    
                // Store the trial result in the trialData array
                trialData.push(trialResult);
                console.log('Updated trial data:', trialData); // Log the updated data (optional)
                // if (BlockID == 3)
                // total_exp_data.push(trialData);
                // console.log('Updated trial data:', trialData); //

    
                // If the total guesses equal the number of target circles, start the next trial
                if (totalGuesses >= maxGuesses) {
                    isInteractionBlocked = true; // Block interaction before the next trial
                    trialNumber++; // Increment trial number
                    flashCount++; // Increment the flash counter
                    updateBlockAndTrial(); // Handle block and trial transitions
                    // Trigger the next flash after a short delay
                    setTimeout(startFlash, 1000); // Start the next flash after 1 second
                }
            }
        });
    });    
}



// Function to display the welcome page
function showWelcomePage() {
    // Create the welcome page container
    const welcomePage = document.createElement('div');
    welcomePage.id = 'welcome-page';
    welcomePage.style.position = 'absolute';
    welcomePage.style.top = '0';
    welcomePage.style.left = '0';
    welcomePage.style.width = '100vw';
    welcomePage.style.height = '100vh';
    welcomePage.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    welcomePage.style.color = 'white';
    welcomePage.style.display = 'flex';
    welcomePage.style.flexDirection = 'column';
    welcomePage.style.justifyContent = 'center';
    welcomePage.style.alignItems = 'center';
    welcomePage.style.fontFamily = 'Arial, sans-serif';
    welcomePage.style.zIndex = '9999';

    // Add welcome text
    const welcomeText = document.createElement('h1');
    welcomeText.textContent = 'Welcome to the "Team Flash Experiment"';
    welcomeText.style.marginBottom = '20px';
    welcomePage.appendChild(welcomeText);

    // Add instructions
    const instructions = document.createElement('p');
    instructions.textContent = 'By taking part in this study you consent to having taken part in this experiment. In this experiment you will be presented with two Phases';
    instructions.style.marginBottom = '20px';
    welcomePage.appendChild(instructions);

     // Add instructions
    const instructions_2 = document.createElement('p_2');
    instructions_2.textContent = 'Phase 1 has x trials in which 60 white circles will flash green,';
    instructions_2.style.marginBottom = '25px';
    welcomePage.appendChild(instructions_2);


    // Add instructions
    const instructions_3 = document.createElement('p_3');
    instructions_3.textContent = 'after a 5 second count down, you will then have to try and remember which circles appeared green, try to click on the correct circles.';
    instructions_3.style.marginBottom = '35px';
    welcomePage.appendChild(instructions_3);

    // Add instructions
    const instructions_4 = document.createElement('p_3');
    instructions_4.textContent = 'Once this is complete you will perform Phase 2. Phase 2 is similar to Phase 1 but with the help of another player, more instructions will come after Phase 1.';
    instructions_4.style.marginBottom = '35px';
    welcomePage.appendChild(instructions_4);

    // Add instructions
    const instructions_5 = document.createElement('p_4');
    instructions_5.textContent = 'Please contact the experimenter laiton.hedley@uon.edu.au for any concerns or enquries';
    instructions_5.style.marginBottom = '35px';
    welcomePage.appendChild(instructions_5);

    // Add a start button
    const startButton = document.createElement('button');
    startButton.textContent = 'Start Experiment';
    startButton.style.padding = '10px 20px';
    startButton.style.fontSize = '18px';
    startButton.style.cursor = 'pointer';
    startButton.style.border = 'none';
    startButton.style.borderRadius = '5px';
    startButton.style.backgroundColor = '#28a745';
    startButton.style.color = 'white';
    startButton.addEventListener('click', () => {
        document.body.removeChild(welcomePage); // Remove the welcome page
        startExperiment(); // Start the experiment
    });
    welcomePage.appendChild(startButton);

    // Append the welcome page to the document body
    document.body.appendChild(welcomePage);
}


// Function to start the experiment and manage the loop
function startExperiment() {
    startFlash(); // Start the first flash
}






// State variables
let isInteractionBlocked = false;
let targetCircle = null;
let targetCircles = null;
let hasClicked = false; // Flag to track if user has clicked
let flashCount = 0; // Count of completed flashes
let trialCount = 0; // To track the current trial
let clicksRemaining = 0; // To track the number of remaining clicks
let circleIdCounter = 0; // Declare the counter at the top level
let trialData = [];  // Array to store trial data
let totalTargets = 1;
let total_exp_data = []

// Call functions here... Loop over a few times to create the actual experiment... 

// Call the showWelcomePage function to display the welcome page
showWelcomePage();

// Listen for the "Start Experiment" button click
document.addEventListener('click', (event) => {
    if (event.target && event.target.id === 'start-button') {
        document.getElementById('welcome-page').remove(); // Remove the welcome page
        startExperiment(); // Start the experiment
        total_exp_data.push(trialData)
        // console.log('All Data', total_exp_data);
    }
});









