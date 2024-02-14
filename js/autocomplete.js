const resultBox = document.querySelector('.result-box');
const inputBox = document.getElementById('input-box');

inputBox.onkeyup = function () {
    const skills = extractSkills();

    let result = [];
    let input = inputBox.value;
    if (input.length) {
        result = skills.filter((keyword) => {
            return keyword.toLowerCase().includes(input.toLowerCase());
        });
    }
    display(result);

    if (skills.length > 0) {
        skills.forEach(skill => {
            const option = document.createElement('option');
            option.value = skill;
            option.textContent = skill;
        });
    }

    if (input.length === 0) {
        resultBox.innerHTML = '';
        displayAll()
    }
}

function displayAll() {
    const projects = document.querySelectorAll('.card_');

    projects.forEach(card => {
        if (card.style.display === "none") {
            card.style.display = "block"; // Display card if it's not currently displayed
            fadeIn(card); // Fade in card
        }
    });
}

function filterProjects(selectedSkill) {
    const projectCards = document.querySelectorAll(".card_");

    projectCards.forEach((card) => {
        const cardSkills = card.querySelector(".card-footer").innerText;
        const displayCard = selectedSkill === "All" || cardSkills.includes(selectedSkill);
        if (!displayCard) {
            fadeOut(card); // Fade out card
        }
    });
}

function fadeIn(element) {
    element.style.opacity = 0;
    element.style.display = "block";

    let opacity = 0;
    const fadeInInterval = setInterval(() => {
        if (opacity < 1) {
            opacity += 0.1;
            element.style.opacity = opacity;
        } else {
            clearInterval(fadeInInterval);
        }
    }, 60); // Adjust the interval as needed for smoother or faster fading
}

function fadeOut(element) {
    let opacity = 1;
    const fadeOutInterval = setInterval(() => {
        if (opacity > 0) {
            opacity -= 0.1;
            element.style.opacity = opacity;
        } else {
            element.style.display = "none";
            clearInterval(fadeOutInterval);
        }
    }, 60); // Adjust the interval as needed for smoother or faster fading
}

function display(result) {
    const content = result.map((list) => {
        return "<li onClick=selectInput(this)>" + list + "</li>";
    });
    resultBox.innerHTML = "<ul>" + content.join('') + "</ul>";
}

function selectInput(list) {
    inputBox.value = list.innerHTML;
    resultBox.innerHTML = '';
    console.log('list.innerHTML:', list.innerHTML)
    filterProjects(list.innerHTML);
}

function extractSkills() {
    const projects = document.querySelectorAll('.card_');
    const skillsSet = new Set();

    projects.forEach(project => {
        const cardFooter = project.querySelector('.card-footer');
        if (cardFooter) {
            const footerChildren = Array.from(cardFooter.childNodes);
            const skillTexts = footerChildren
                .filter(child => child.nodeName !== 'H5') // Exclude skill elements within <h5> tag
                .map(child => child.textContent.trim());

            const skills = skillTexts.join(',').split(',').map(skill => skill.trim());
            skills.forEach(skill => skillsSet.add(skill));
        }
    });

    return Array.from(skillsSet);
}

function displaySkillsDropdown() {
    const skills = extractSkills();
    const skillSelect = document.getElementById('.search-box');

    if (skills.length > 0) {
        skills.forEach(skill => {
            const option = document.createElement('option');
            option.value = skill;
            option.textContent = skill;
            skillSelect.appendChild(option);
        });
    } else {
        skillSelect.textContent = 'No skills found';
    }
}
