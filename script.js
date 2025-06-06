document.addEventListener("DOMContentLoaded", function () {

    const searchButton = document.getElementById('search-button');
    const userInput = document.getElementById('user-label');
    const statContainer = document.querySelector('.stat-container');
    const easyDiv = document.querySelector('.easy');
    const mediumDiv = document.querySelector('.medium');
    const hardDiv = document.querySelector('.hard');
    const easySpan = document.getElementById('easy-span');
    const mediumSpan = document.getElementById('medium-span');
    const hardSpan = document.getElementById('hard-span');
    const statCards = document.querySelector('.stat-cards');

    function validateuser(username) {
        if (username.trim() === "") {
            alert("username should not be empty");
            return false;
        }

        const regx = /^[a-zA-Z][a-zA-Z0-9._]{2,19}$/;
        const isMatching = regx.test(username);

        if (!isMatching) {
            alert("invalid username");
            return false;
        }
        return isMatching;

    }

    async function fetchUserDetails(username) {

        searchButton.textContent = "searching";
        searchButton.disabled = true;

        const url = `https://leetcode-stats-api.herokuapp.com/${username}`
        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.status === "error") {
                throw new Error("unable to load user data");

            }
            console.log("logging data:", data);

            displaydata(data);
        }
        catch (error) {
            console.error("Error fetching data:", error);
            statContainer.innerHTML = '<p>No data found</p>';
            statCards.style.display = 'none';

        }
        finally {
            searchButton.textContent = "search";
            searchButton.disabled = false;
        }
    }

    function displaydata(data) {
        const TotalQ = data.totalQuestions;
        const EasyQ = data.totalEasy;
        const MediumQ = data.totalMedium;
        const HardQ = data.totalHard;

        const TotalSQ = data.totalSolved;
        const EasySQ = data.easySolved;
        const MediumSQ = data.mediumSolved;
        const HardSQ = data.hardSolved;

        updateProgress(EasySQ, EasyQ, easyDiv, easySpan)
        updateProgress(MediumSQ, MediumQ, mediumDiv, mediumSpan)
        updateProgress(HardSQ, HardQ, hardDiv, hardSpan)

            const CardsData = [
                { label: "Total Questions", value: data.totalQuestions },
                { label: "Total Submitted", value: data.totalSolved },
                { label: "Rank", value: data.ranking },
                { label: "Acceptance Rate", value: data.acceptanceRate },

            ];
            console.log(CardsData);

            statCards.innerHTML = CardsData.map(
                data =>
                    `<div class="cards">
                <h4>${data.label}</h4>
                <p>${data.value}</p>
            </div>`
            ).join("");


        }

    function updateProgress(solved, total, circle, label) {
        const progressDegree = (solved / total) * 100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        label.textContent = `${solved}/${total}`;
    }

    searchButton.addEventListener('click', function () {

        const username = userInput.value;
        console.log("user:", username);

        if (validateuser(username)) {
            fetchUserDetails(username);
        }
    })
    userInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevents page refresh
            searchButton.click();   // Triggers search
        }
    }); a


})