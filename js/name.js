const sequence = [
    "Tanmesh Mishra",
    1000,
    "Backend Developer",
    1000,
    "Full Stack Developer",
    1000,
    "Distributed Systems Enthusiast",
    1000,
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
          typeSequence(index + 1);
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
  
  // Start typing animation
  typeSequence(0);
  