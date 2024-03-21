// Importerar moduler
import { getCourses } from './storage';
import { newCourseCode } from './variables';

// Funktion för att kontrollera om kurskod är unik bland de sparade kurserna
export function isUnique(code: string): boolean {
    // Hämtar en lista av alla befintliga kurser från localStorage
    const courses = getCourses();
    // Loopar igenom varje kurs i listan för att kontrollera om koden existerar
    for (let i = 0; i < courses.length; i++) {
        // Kontrollerar om kursen redigeras och har samma kurskod som en befintlig kurs
        if (newCourseCode.editCode == courses[i].code) {
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
export function isValid(progression: string): boolean {
    // Kontrollerar om den angivna progressionen matchar något av de giltiga värdena
    if (progression == "A" || progression == "B" || progression == "C") {
        // Returnerar true isåfall
        return true;
    } else {
        // Annars returneras false
        return false;
    }
}