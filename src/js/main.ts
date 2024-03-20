// Hämtar elementet genom ID
const formEl = document.getElementById("form-container") as HTMLFormElement; // som formulär
const codeInput = document.getElementById("code") as HTMLInputElement; // som input
const nameInput = document.getElementById("name") as HTMLInputElement; // som input
const progressionSelect = document.getElementById("progression") as HTMLSelectElement; // som select-element
const syllabusInput = document.getElementById("syllabus") as HTMLInputElement; // som input
const tableEl = document.getElementById("courses") as HTMLTableSectionElement; // som table-section
const coursesEl = document.getElementById("course-section") as HTMLElement;
// Lagrar variabel för kurskod för att som hålla reda på vilken kurs som redigeras, tom sträng = ingen kurs redigeras
let editCode: string = "";

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

// Funktion för att kontrollera om kurskod är unik bland de sparade kurserna
function isUnique(code: string): boolean {
    // Hämtar en lista av alla befintliga kurser från localStorage
    const courses = getCourses();
    // Loopar igenom varje kurs i listan för att kontrollera om koden existerar
    for (let i = 0; i < courses.length; i++) {
        // Kontrollerar om kursen redigeras och har samma kurskod som en befintlig kurs
        if (editCode == courses[i].code) {
            continue; // Hoppar över den aktuella iterationen och fortsätter med nästa kurs i loopen
        }

        // Kontrollerar om den aktuella kursen i listan har samma kod som den angivna kurskoden
        if (courses[i].code == code) {
            // Returnerar false om en match finns
            return false;
        }
    }
    // Om ingen kurs med samma kod hittades eller om koden tillhör den kurs som redigeras, returneras true
    return true;
}

// Funktion för att kontrollera om progressionen är giltig
function isValid(progression: string): boolean {
    // Kontrollerar om den angivna progressionen matchar något av de giltiga värdena
    if (progression == "A" || progression == "B" || progression == "C") {
        // Returnerar true isåfall
        return true;
    } else {
        // Annars returneras false
        return false;
    }
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

    // Kontrollerar att den angivna kurskoden är unik
    if (!isUnique(course.code)) {
        alert("Kurskoden måste vara unik."); // Om den inte är unik avbryts funktionen och felmeddelande visas
        return;
    }

    // Kontrollerar att progression är giltig
    if (!isValid(course.progression)) {
        alert("Ogiltig progression. Välj A, B, eller C."); // Om inte så avbryts funktionen och ett felmeddelande visas.
        return;
    }

    // Hämtar befintliga kurser från localStorage
    const courses = getCourses();
    // Kontrollerar om en kurs redigeras (om editcode är inte tom textsträng)
    if (editCode !== "") {
        // Söker efter kursens index genom att loopa över alla kurser och jämföra om editCode är samma som kurskoden
        const index = courses.findIndex(course => course.code === editCode);
        // Uppdaterar befintlig kurs med ny information.
        courses[index] = course;
    } else {
        // Lägger till ny kurs i listan om den inte redigeras
        courses.push(course);
    }

    saveCourses(courses); // Sparar den uppdaterade kurslistan i localStorage
    displayCourses(); // Uppdaterar visningen av kurser på webbsidan
    formEl.reset(); // Återställer formuläret
    editCode = ""; // Rensar editCode inför nästa redigering
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
    // Kontrollerar om det finns sparade kurser
    if (courses.length > 0) {
        coursesEl.style.display = "block"; // Visar container för kurslistan/tabellen
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
            editButton.addEventListener("click", () => editCourse(course.code)); // Skapar en händelselyssnare som vid klick anropar funktion för att redigera kurs, skickar med kurskod som argument
            editButton.className = "edit-btn"; // Lägger till en klass för knappen
            editEl.appendChild(editButton); // Lägger till knappen i cellen
            rowEl.appendChild(editEl); // Lägger till cellen i raden

            // Skapar en cell för ta-bort knappen
            const deleteEl: HTMLTableCellElement = document.createElement("td");
            const deleteButton: HTMLButtonElement = document.createElement("button"); // Skapar en ny knapp
            deleteButton.innerHTML = "Ta bort"; // Sätter knappens innehåll
            deleteButton.addEventListener("click", () => deleteCourse(course.code)); // Skapar en händelselyssnare som vid klick anropar funktion för att radera kurs, skickar med kurskod som argument
            deleteButton.className = "delete-btn"; // Lägger till en klass för knappen
            deleteEl.appendChild(deleteButton); // Lägger till knappen i cellen
            rowEl.appendChild(deleteEl); // Lägger till cellen i raden
        });
    } else {
        coursesEl.style.display = "none"; // Döljer container för kurslistan/tabellen om inga kurser finns
    }
}

// Funktion för att radera kurs baserat på kurskod
function deleteCourse(courseCode: string): void {
    const courses = getCourses(); // Hämtar kurserna som finns sparade i localStorage
    let remainingCourses = courses.filter(course => course.code !== courseCode); // Filtrerar ut alla kurser som inte matchar den aktuella kurskoden och skapar en ny lista
    saveCourses(remainingCourses); // Sparar den uppdaterade listan av kurser till localStorage
    displayCourses(); // Anropar funktion för att uppdatera kurserna som visas på webbsidan
}

// Funktion för att redigera kurs baserat på kurskod
function editCourse(courseCode: string): void {
    const course = getCourses().find(course => course.code === courseCode); // Hämtar den aktuella kursen från localStorage baserat på kurskoden
    // Kontrollerar om en kurs hittades
    if (course) {
        // Fyller isåfall i formuläret med kursinformation
        codeInput.value = course.code;
        nameInput.value = course.name;
        progressionSelect.value = course.progression;
        syllabusInput.value = course.syllabus;

        // Uppdaterar editcode till den aktuella kursens kod för att inte få fel i unikhet vid submit i formuläret
        editCode = courseCode;
    }
}