// Importerar moduler
import { courseInfo } from './interface';
import { displayCourses, deleteCourse, editCourse } from './courses';
import { submitForm } from './form';
import { saveCourses, getCourses } from './storage';
import { isUnique, isValid } from './validation';
import { formEl } from './variables';


// Initieringsfunktion som körs när webbsidan laddats
window.onload = init;
function init(): void {
    displayCourses(); // Anropar funktion för att visa befintliga kurser hämtade från localStorage
    formEl.addEventListener("submit", submitForm); // Lägger till händelselyssnare på submit-knappen i formuläret, anropar funktion
}