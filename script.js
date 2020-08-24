const ul = document.querySelector('ul');
const addClassBtn = document.getElementsByClassName("add-class-btn");
const calcBtn = document.getElementsByClassName("calc-btn");

const gradeLetters = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "E", "F"];
const gradeWeights = [4, 4, 3.7, 3.3, 3, 2.7, 2.3, 2, 1.7, 1.3, 1, 0, 0];

const addClass = () => {
    //create a new class information list
    const classInformation = document.createElement("li");
    classInformation.className = "class-information";

    //create an input box for the class name
    const className = document.createElement("input");
    className.className = "class-name box";
    className.placeholder = "Class Name";
    classInformation.appendChild(className);

    //create an input box for the unit amount
    const unitAmt = document.createElement("input");
    unitAmt.className = "unit-amt box";
    unitAmt.placeholder = "How many units?"
    classInformation.appendChild(unitAmt);

    //create a selector bar for the different grades
    const classGrade = document.createElement("select");
    classGrade.className = "box";
    //add the default option
    const defaultOption = document.createElement("option");
    defaultOption.className = "defOpt";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.value = -1;
    defaultOption.innerText = "What grade did you receive?";
    classGrade.appendChild(defaultOption);
    //add the different grades
    for (let i = 0; i < gradeLetters.length; i++) {
        const ithOption = document.createElement("option");
        ithOption.value = gradeWeights[i];
        ithOption.innerText = gradeLetters[i];
        classGrade.appendChild(ithOption);
    }
    classInformation.appendChild(classGrade);

    //create the delete button
    const delBtn = document.createElement("button");
    delBtn.className = " delBtn box";
    delBtn.innerText = "X";
    classInformation.appendChild(delBtn);
    //add functionality to the button
    const removeClass = () => {
        ul.removeChild(classInformation);
    }
    delBtn.addEventListener("click", removeClass);

    //append the list filled with everything
    ul.appendChild(classInformation);
}

const calculateGPA = () => {
    //get an array of the classes
    let valid = true;
    const classes = document.getElementsByClassName("class-information");
    let totalUnits = 0;
    let totalWeight = 0;
    for (let i = 0; i < classes.length; i++) {
        let className = classes[i].children[0].value || `Class #${i}`;
        let unitAmt = parseFloat(classes[i].children[1].value); //amount of units
        let weightAmt = parseFloat(classes[i].children[2].value); //weight of the grade

        //pass a warning if there is no class name
        classes[i].children[0].className = "class-name box";
        if (className === `Class #${i}`) {
            classes[i].children[0].className += " warning"
        }

        //check if the units is a number
        classes[i].children[1].className = "unit-amt box";
        if (isNaN(unitAmt)) {
            valid = false;
            classes[i].children[1].className += " error"
        }

        //check if the selected a grade
        classes[i].children[2].className = "box";
        if (weightAmt === -1) {
            valid = false;
            classes[i].children[2].className += " error";
        }
        if (valid) {
            totalUnits += unitAmt;
            totalWeight += unitAmt * weightAmt;
        }
    }

    if (valid) {
        const gpa = totalWeight / totalUnits;
        document.getElementById("gpa").innerText = 'Your GPA: ' + gpa.toFixed(3);
    }
    else {
        document.getElementById("gpa").innerText = 'Fix your classes first dummy!'
    }
}

//load browser with one classes already
addClass();

//make the buttons functional
for (let i = 0; i < addClassBtn.length; i++) {
    addClassBtn[i].addEventListener("click", addClass);
    calcBtn[i].addEventListener("click", calculateGPA);
}