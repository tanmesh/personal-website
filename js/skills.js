document.addEventListener("DOMContentLoaded", function () {
    const skillList = [
        { progress: "90%", skill: "C/C++" },
        { progress: "90%", skill: "Java" },
        { progress: "70%", skill: "Python" },
        { progress: "80%", skill: "MySql" },
        { progress: "90%", skill: "MongoDb" },
        { progress: "80%", skill: "Redis" },
        { progress: "90%", skill: "Dropwizard" },
        { progress: "90%", skill: "Git" },
        { progress: "80%", skill: "Intellij" },
        { progress: "80%", skill: "Maven" }
    ];

    const progressContainer = document.getElementById("progressContainer");

    // Iterate over the skill list array and create progress bars dynamically
    skillList.forEach(skillObj => {
        // Create progress wrapper
        const progressWrapper = document.createElement("div");
        progressWrapper.classList.add("progressWrapper");

        // Create progress bar
        const progressDiv = document.createElement("div");
        progressDiv.classList.add("progress");

        const progressBar = document.createElement("div");
        progressBar.classList.add("progress-bar");
        progressBar.setAttribute("role", "progressbar");
        progressBar.style.width = skillObj.progress;
        progressBar.setAttribute("aria-valuenow", skillObj.progress);
        progressBar.setAttribute("aria-valuemin", "0");
        progressBar.setAttribute("aria-valuemax", "100");
        progressBar.textContent = skillObj.progress;

        progressDiv.appendChild(progressBar);

        // Create progress text
        const progressText = document.createElement("div");
        progressText.classList.add("progressP");
        progressText.textContent = skillObj.skill;

        // Append progress bar and text to wrapper
        progressWrapper.appendChild(progressDiv);
        progressWrapper.appendChild(progressText);

        // Append progress wrapper to container
        progressContainer.appendChild(progressWrapper);
    });
});

