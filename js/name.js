const sequence = [
  "Tanmesh Mishra",
  500,
  "Backend Developer",
  500,
  "Full Stack Developer",
  500,
  "Distributed Systems Enthusiast",
  500,
];

const typedTextElement = document.getElementById("typed-text");
const animationTextElement = document.getElementById("animation-text");
const cursorElement = document.getElementById("cursor");

function typeSequence(index) {
  const sequenceItem = sequence[index % sequence.length]; // To loop through the sequence indefinitely

  if (typeof sequenceItem === "string") {
    // Clear the previously typed text
    typedTextElement.textContent = "";
    typeString(sequenceItem, () => {
      setTimeout(() => {
        deleteString(sequenceItem, () => {
          typeSequence(index + 1);
        });
      }, 500); // Delay between strings
    });
  } else if (typeof sequenceItem === "number") {
    setTimeout(() => {
      typeSequence(index + 1);
    }, sequenceItem);
  }
}

function typeString(str, callback) {
  let index = 0;
  const typingInterval = setInterval(() => {
    if (index === str.length) {
      clearInterval(typingInterval);
      callback();
    } else {
      typedTextElement.textContent += str[index];
      index++;
    }
  }, 150); // Typing speed (milliseconds per character)

  // Cursor blinking effect
  const cursorBlinkInterval = setInterval(() => {
    cursorElement.style.visibility = cursorElement.style.visibility === "hidden" ? "visible" : "hidden";
  }, 500);

  // Clear cursor blink interval when typing animation finishes
  setTimeout(() => {
    clearInterval(cursorBlinkInterval);
    cursorElement.style.visibility = "hidden"; // Hide cursor after typing animation finishes
  }, str.length * 150);
}

function deleteString(str, callback) {
  let index = str.length;
  const deletingInterval = setInterval(() => {
    if (index === 0) {
      clearInterval(deletingInterval);
      callback();
    } else {
      typedTextElement.textContent = typedTextElement.textContent.slice(0, -1);
      index--;
    }
  }, 150); // Deleting speed (milliseconds per character)
}

// Start typing animation
typeSequence(0);