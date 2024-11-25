const outputContainer = document.getElementById('output-container');
const inputField = document.getElementById('input');
const promptLine = document.createElement('div');

const commands = {
    help: "Available commands: about, clear, education, contact, help",
    clear: () => {
        outputContainer.innerHTML = ""; // Clear the terminal output
        // addPrompt(); // Add new prompt after clearing
    },
    about: "GitShell is a simple terminal to know all about me, I know it sounds so narcissist but you know i am so good that you wanna know 'bout me. (just kidding!)",
    education: "Just gonna finish school, probably gonna go to college.",
    contact: () => { "email: ", addContact() }
};

const commandText = [
    'Welcome to GitShell!',
    'type about to know more',
];
// Array of welcome messages to type out
let currentMessageIndex = 0;
// Function to type out messages letter by letter
function typeMessages(messages, callback) {


    function typeLetter(i, message) {
        const commandElement = document.querySelector('.git-shell-command' + (currentMessageIndex + 1));
        commandElement.textContent = message.substring(0, i); // Show typed part of the message

        if (i < message.length) {
            setTimeout(() => typeLetter(i + 1, message), 100); // Type next letter after delay
        } else {
            currentMessageIndex++;
            if (currentMessageIndex < messages.length) {
                setTimeout(() => typeMessages(messages, callback), 500);
            } else {
                setTimeout(callback, 500);
            }
        }
    }

    typeLetter(currentMessageIndex, messages[currentMessageIndex]);
}



// Add initial welcome message
function initializeTerminal() {
    typeMessages(commandText, showDotsAnimation)
}

function showDotsAnimation() {
    const dotsElement = document.createElement('span');
    dotsElement.classList.add('dot-animation');
    dotsElement.textContent = '...'; // Start with three dots
    outputContainer.appendChild(dotsElement);
    setTimeout(() => {
        dotsElement.remove(); // Remove dots after animation
        addPrompt(); // Show the prompt and input field after the dots animation
    }, 2000); // Wait for 2 seconds (dots animation time)
}

// Execute a command
function executeCommand(input) {
    const command = input.trim();
    if (commands[command]) {
        if (typeof commands[command] === 'function') {
            commands[command](); // Execute function if the command has one
        } else {
            addOutput(commands[command]); // Display command output
        }
    } else {
        addOutput(`Unknown command: ${command}`);
        addOutput("Available commands: about, education, contact, clear, help") // Handle unknown commands
    }
}

function addContact() {
    const outputElement = document.createElement('div');
    outputElement.className = 'output';
    outputElement.innerHTML = "email: <a href='mailto:adityasaroha@protonmail.com'>adityasaroha@protonmail.com</a> <br> instagram: <a href='https://www.instagram.com/aditya_saroha_/' >aditya_saroha_</a>";
    outputContainer.appendChild(outputElement);
    outputContainer.scrollTop = outputContainer.scrollHeight;
}

// Add output to the terminal
function addOutput(text) {
    const outputElement = document.createElement('div');
    outputElement.className = 'output';
    outputElement.textContent = text;
    outputContainer.appendChild(outputElement);
    outputContainer.scrollTop = outputContainer.scrollHeight;
}

// Add prompt line
function addPrompt() {
    const promptLine = document.createElement('div');
    promptLine.className = 'prompt-line';
    promptLine.innerHTML = `<span class="git-shell-prompt">GitShell> </span> <div> <input type="text" id="input" placeholder=" "></div>`;
    outputContainer.appendChild(promptLine);

    // Reattach the input field to the new prompt line
    const newInputField = promptLine.querySelector('input');
    newInputField.focus();

    // Reassign the event listener to the new input field
    newInputField.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const input = newInputField.value;
            // addOutput(`> ${input}`); // Show the entered command
            executeCommand(input); // Execute the command
            disableInput(newInputField); // Disable the input field after command is entered
            addPrompt(); // Add a new prompt for the next command
        }
    });
}

// Disable the input field after the command is entered
function disableInput(inputField) {
    inputField.disabled = true; // Disable the input field
    // inputField.style.backgroundColor = '#555'; // Change background color to indicate it's disabled
    inputField.style.color = '#eee'; // Change text color to a lighter shade when disabled
}

// Initialize the terminal on load
initializeTerminal();
