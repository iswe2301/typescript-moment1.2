const formEl = document.getElementById("form-container") as HTMLFormElement; // som formulär
const codeInput = document.getElementById("code") as HTMLInputElement; // som input
const nameInput = document.getElementById("name") as HTMLInputElement; // som input
const progressionSelect = document.getElementById("progression") as HTMLSelectElement; // som select-element
const syllabusInput = document.getElementById("syllabus") as HTMLInputElement; // som input
const tableEl = document.getElementById("courses") as HTMLTableSectionElement; // som table-section

// Interface som definierar strukturen på en kurs, tar emot strängar
interface CourseInfo {
    code: string;
    name: string;
    progression: string;
    syllabus: string;
}

// Initieringsfunktion som körs när webbsidan laddats
window.onload = init;
function init(): void {
    displayCourses(); // Anropar funktion för att visa befintliga kurser hämtade från localStorage
    formEl.addEventListener("submit", submitForm); // Lägger till händelselyssnare på submit-knappen i formuläret, anropar funktion
}

// Funktion för att skicka formulär
function submitForm(event: Event) {
    event.preventDefault(); // Förhindrar standardbeteende för formulär

    // Skapar ett objekt med den nya/uppdaterade kursinformationen från formulärets värden enligt interface-struktur
    const course: CourseInfo = {
        code: codeInput.value,
        name: nameInput.value,
        progression: progressionSelect.value,
        syllabus: syllabusInput.value
    };

    // Hämtar befintliga kurser från localStorage
    const courses = getCourses();
    // Lägger till kurs i listan med sparade kurser
    courses.push(course);

    saveCourses(courses); // Sparar den uppdaterade kurslistan i localStorage
    displayCourses(); // Uppdaterar visningen av kurser på webbsidan
    formEl.reset(); // Återställer formuläret
}

// Funktion för att spara kurser i localStorage, tar en array av CourseInfo-objekt som argument
function saveCourses(courses: CourseInfo[]): void {
    // Konverterar arrayen till en sträng och lagrar under "courses" i localStorage
    localStorage.setItem("courses", JSON.stringify(courses));
}

// Funktion för att hämta kurser från localStorage
function getCourses(): CourseInfo[] {
    // Hämtar kurser från localStorage
    const savedCourses = localStorage.getItem("courses");
    // Returnerar sparade kurser och omvandlar tillbaka till array av objekt eller en tom array om inga sparade kurser finns
    return savedCourses ? JSON.parse(savedCourses) : [];
}

// Funktion för att visa sparade kurser på webbsidan
function displayCourses(): void {
    const courses = getCourses(); // Hämtar befintliga kurser från localStorage
    tableEl.innerHTML = ""; // Rensar innehållet i tabellen

    // Loopar genom varje kurs
    courses.forEach(course => {

        // Skapar en ny tabellrad för varje kurs
        const rowEl: HTMLTableRowElement = document.createElement("tr");
        tableEl.appendChild(rowEl); // Lägger till den nya raden i tabellens body

        // Skapar en ny cell för kurskod
        const courseCodeEl: HTMLTableCellElement = document.createElement("td");
        courseCodeEl.innerHTML = course.code; // Sätter cellens innehåll till kursens kod
        rowEl.appendChild(courseCodeEl); // Lägger till cellen i raden

        // Skapar en ny cell för kursnamn
        const courseNameEl: HTMLTableCellElement = document.createElement("td");
        courseNameEl.innerHTML = course.name; // Sätter cellens innehåll till kursens namn
        rowEl.appendChild(courseNameEl); // Lägger till cellen i raden

        // Skapar en ny cell för progression
        const progressionEl: HTMLTableCellElement = document.createElement("td");
        progressionEl.innerHTML = course.progression; // Sätter cellens innehåll till kursens progression
        rowEl.appendChild(progressionEl); // Lägger till cellen i raden

        // Skapar en cell för kursplanlänken
        const syllabusEl: HTMLTableCellElement = document.createElement("td");
        const link: HTMLAnchorElement = document.createElement("a"); // Skapar ett nytt a-element
        link.href = course.syllabus; // Sätter länkens url till kursens syllabus
        link.innerHTML = "Kursplan"; // Sätter länkens text
        link.target = "_blank"; // Sätter target till öppnas i ny flik
        syllabusEl.appendChild(link); // Lägger till länken i cellen
        rowEl.appendChild(syllabusEl); // Lägger till cellen i raden

        // Skapar en cell för redigeringsknappen
        const editEl: HTMLTableCellElement = document.createElement("td")
        const editButton: HTMLButtonElement = document.createElement("button"); // Skapar en ny knapp
        editButton.innerHTML = "Redigera"; // Sätter knappens innehåll
        editEl.appendChild(editButton); // Lägger till knappen i cellen
        rowEl.appendChild(editEl); // Lägger till cellen i raden

        // Skapa en cell för ta-bort knappen
        const deleteEl: HTMLTableCellElement = document.createElement("td");
        const deleteButton: HTMLButtonElement = document.createElement("button"); // Skapar en ny knapp
        deleteButton.innerHTML = "Ta bort"; // Sätter knappens innehåll
        deleteEl.appendChild(deleteButton); // Lägger till knappen i cellen
        rowEl.appendChild(deleteEl); // Lägger till cellen i raden
    });
}