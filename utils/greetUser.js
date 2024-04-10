export default function greetUser() {
    // Get the current date and time
    var currentDate = new Date();
    var currentHour = currentDate.getHours();

    var greeting = "";
    if (currentHour >= 5 && currentHour < 12) {
        greeting = "Good morning!";
    } else if (currentHour >= 12 && currentHour < 18) {
        greeting = "Good afternoon!";
    } else {
        greeting = "Good evening!";
    }

    return greeting;
}


