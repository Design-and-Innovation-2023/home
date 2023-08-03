//create an instance of NesSmartController, optionally specify a peer ID for the PC browser peer
//firstconnected is true by default, only the first player to connect to a specific player ID will be allowed to keep it, the rest of the connections to the same ID won't be allowed
const simplePeer = new smartcontroller.NesSmartController();
const container = document.querySelector('.container');
let inVideo = false;
let previousSelectedDiv; // Variable to keep track of the selected div
let newSelectedDiv;
let newAHrefTag;
let selectedCard = 1;
let selectedRow = 1;
let selectedCol = 1;
let carousel1Midpoint = 2;
let carousel2Midpoint = 2;
let carousel3Midpoint = 2;
let carousel4Midpoint = 2;
const temp = window.location.pathname;


//create and display a QR code for the smartphones, specify url for the controller, div element for the code to be displayed,
//optionally size and a player ID, in this case the player ID is set to 1
//the url is an official Nes Controller compatible with the NesSmartController class
simplePeer.createQrCode(
  "https://smartcontrollerjs.github.io/Controllers/nesController.html",
  "qrcode",
  150,
  150,
  "1"
);

//listen for new connections and log them in the console
simplePeer.on("connection", function (data) {
  console.log(data);
});

processData();



function findFirstItemInRow(selectedRow, divArray, direction) {
  let rowStep = 1; // Default to moving downward
  if (direction === "up") {
    rowStep = -1; // Set to moving upward
  }

  let row = selectedRow;
  while (row >= 0 && row < divArray.length) {
    if (!divArray[row]) {
      row += rowStep; // Move to the next row based on direction
      continue; // Skip if the row doesn't exist in the 2D matrix
    }

    for (const element of divArray[row]) {
      const item = element;
      if (item) {
        // If the item in the column is not null, return it
        return item;
      }
    }

    row += rowStep; // Move to the next row based on direction
  }

  return null; // Return null if no item with a value is found in the rows in the specified direction
}



function findClassNameOfDivElement(divElement) {
  if (divElement instanceof HTMLDivElement) {
    return divElement.className;
  } else {
    return null; // Return null if the provided element is not an HTMLDivElement
  }
}

function findAHrefTag(divElement) {
  // Check if there is an 'a' tag inside the 'myDiv'
  const myLink = divElement.querySelector("a");

  if (myLink) {
    console.log(myLink)
    // If 'myLink' is found, get its 'id' attribute
    const linkId = myLink.id;
    if (linkId) {
      return linkId;
    } else {
      // If 'id' attribute is not found, get the 'href' attribute
      const href = myLink.getAttribute('href');
      return href;
    }
  } else {
    return null;
  }
}

function mapClickableDivs() {
  const divArray = [];
  const clickableDivs = document.querySelectorAll('[class^="clickableDiv-"]');
  clickableDivs.forEach((div) => {
    const className = div.className;
    const card = parseInt(className.split("-")[1]);
    const row = parseInt(className.split("-")[2]);
    const col = parseInt(className.split("-")[3]);
    if (!divArray[row]) {
      divArray[row] = [];
    }
    divArray[row][col] = div;
  });

  // Fill in any missing columns with null
  for (let row = 1; row < divArray.length; row++) {
    if (!divArray[row]) {
      divArray[row] = [];
    }
  }
  return divArray;
}




function simulateClick(elementId) {
  // Simulate click on the element with ID 'myButton'
  const elementToClick = document.getElementById(elementId);
  elementToClick.click();
}

function simulateButtonClick(buttonTitleToClick) {
  // Find the button element based on its title
  const buttons = document.querySelectorAll('button'); // Or use any other attribute to select the button
  let buttonToClick;

  buttons.forEach(button => {
    if (button.title === buttonTitleToClick) {
      buttonToClick = button;
    }
  });

  // If the button is found, simulate the click event
  if (buttonToClick) {
    buttonToClick.click();
  }
}

function recalculateSelection(scrollLink) {
  if (scrollLink === "#team") {
    selectedRow = 9
  } else if (scrollLink === "#call-action") {
    selectedRow = 19
  } else if (scrollLink === "#pricing"){
    selectedRow = 8
  } else if (scrollLink === "#services"){
    selectedRow = 3
  } else if (scrollLink === "#portfolio"){
    selectedRow = 7
  }
  selectedCol = 1
}

function smoothScrollToMiddle(element) {
  console.log('smooth scrolling')
  const elementRect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const additionalScroll = (viewportHeight - elementRect.height) / 2;

  // Use requestAnimationFrame to scroll smoothly to the middle of the element
  requestAnimationFrame(() => {
    element.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });
}

// A function that checks if player 1 is connected, if yes then check the arrow keys to highlight the buttons
function processData() {
  const divArray = mapClickableDivs();
  const container = document.querySelector(".container");
  const emptyBorder = "none"; // Original border size
  const originalBorderSize = "2px solid red"; // Original border size
  const enlargedBorderSize = "4px solid red"; // Enlarged border size
  const currentPage = window.location.pathname; // Check the current HTML page

  if (!previousSelectedDiv) {
    previousSelectedDiv = divArray[1][1];
    setTimeout(processData, 300)
    return
  }

  if (simplePeer.controllerList[1]) {
    // Store the controller to access its fields, the dictionary key is 1 because a player ID has been specified, otherwise the peer ID from smartphone will be used
    var controller = simplePeer.controllerList[1];
    var button_id = ["up", "down", "left", "right", "a", "b"];

    for (var id of button_id) {
      if (controller.buttons[id]) {
        // Restore the border of the previously selected div
        if (
          (id === "up" && selectedRow === 1) ||
          (id === "down" && selectedRow === divArray.length - 1)
        ) {
          return;
        } else if (id === "up") {
          console.log("Up arrow key pressed.");
          selectedRow -= 1;
          selectedCol = 1;
        } else if (id === "down") {
          console.log("Down arrow key pressed.");
          selectedRow += 1;
          selectedCol = 1;
        } else if (id === "left") {
          console.log("Left arrow key pressed.");
          selectedCol -= 1;
        } else if (id === "right") {
          console.log("Right arrow key pressed.");
          selectedCol += 1;
        } else if (id === "a" && newAHrefTag) {
          console.log("Entering..." + newAHrefTag);
          // Trigger a click event on the targeted a element
          // Check if href starts with './'
          if (newAHrefTag.startsWith('./')) {
            inVideo = false
            window.location.assign(newAHrefTag);
          } else if (newAHrefTag.startsWith('#')) {
            const scrollLink = document.querySelector(`a.page-scroll[href="${newAHrefTag}"]`);
            if (scrollLink) {
              recalculateSelection(newAHrefTag);
              console.log("new row: " + selectedRow + " selectedCol: " + selectedCol)
              scrollLink.click();
            }
          } else {
            const linkObject = document.getElementById(newAHrefTag);
            inVideo = true;
            linkObject.click();
          }
        } else if (id === "a" && !newAHrefTag) {
          console.log("No ahref tag to enter")
          console.log(newSelectedDiv)
          console.log(newSelectedDiv.getAttribute('id'))
          const temp = newSelectedDiv.getAttribute('id')
          const tempDiv = document.getElementById(temp);
          tempDiv.click();
          console.log(tempDiv)
        } else if (id === "b" && newAHrefTag && inVideo) {
          simulateButtonClick("Close (Esc)");
          inVideo = false;
        } else if (id === "b" && !inVideo) {
          console.log("backing")
          history.back();
        }
        // Attempt to get the new selected div
        newSelectedDiv = divArray[selectedRow][selectedCol];
        if (!newSelectedDiv) {
          if (id === "up") {
            newSelectedDiv = findFirstItemInRow(selectedRow, divArray, "up");
          } else {
            newSelectedDiv = findFirstItemInRow(selectedRow, divArray, "down");
          }
          const className = findClassNameOfDivElement(newSelectedDiv);
          selectedRow = parseInt(className.split("-")[2]);
          selectedCol = parseInt(className.split("-")[3]);
        }
        console.log(selectedRow + " " + selectedCol);

        // Enlarge the border for a short duration when navigating out of bounds
        if (
          !newSelectedDiv ||
          typeof newSelectedDiv === "undefined" ||
          newSelectedDiv === null
        ) {
          // If the new selected div doesn't exist, restore the border of the previously selected div
          if (previousSelectedDiv) {
            previousSelectedDiv.classList.add("selected");
            previousSelectedDiv.style.border = enlargedBorderSize;
          }
          if (id === "up") {
            console.log("Up arrow key pressed.");
            selectedRow += 1;
          } else if (id === "down") {
            console.log("Down arrow key pressed.");
            selectedRow -= 1;
          } else if (id === "left") {
            console.log("Left arrow key pressed.");
            selectedCol += 1;
          } else if (id === "right") {
            console.log("Right arrow key pressed.");
            selectedCol -= 1;
          }
          console.log("doing nothing");
          setTimeout(processData, 300)
          return
        }

        if (selectedCard === 1 && (id === "up" || id === "down")) {
          carousel1Midpoint,
          carousel2Midpoint,
          carousel3Midpoint,
          carousel4Midpoint = 2,
          2,
          2,
          2;
        }
        previousSelectedDiv.classList.remove("selected");
        previousSelectedDiv.style.border = emptyBorder;
        // Set the new selected div as the current selected div
        newSelectedDiv.classList.add("selected");
        newSelectedDiv.style.border = enlargedBorderSize;

        previousSelectedDiv.classList.remove("selected");
        // Store the current selected div as the previously selected div
        previousSelectedDiv = newSelectedDiv;
        newAHrefTag = findAHrefTag(newSelectedDiv)

        // check what is the current midpoint
        // check what is the new selected div
        // if selected div is <> +-1 of the current midpoint
        let midpoint, leftbtn, rightbtn;
        if (selectedRow === 3) {
          midpoint = carousel1Midpoint;
          leftbtn = "left-1";
          rightbtn = "right-1";
        }
        else if (selectedRow === 4) {
          midpoint = carousel2Midpoint;
          leftbtn = "left-2";
          rightbtn = "right-2";
        }
        else if (selectedRow === 5) {
          midpoint = carousel3Midpoint;
          leftbtn = "left-3";
          rightbtn = "right-3";
        }
        else if (selectedRow === 6) {
          midpoint = carousel4Midpoint;
          leftbtn = "left-4";
          rightbtn = "right-4";
        }
        else if (selectedRow === 7) {
          leftbtn = "left-5";
          rightbtn = "right-5";
        }

        if (selectedRow === 7 && id === "left"){ 
          console.log("going left for 7")
          simulateClick(leftbtn); 
        }
        else if (selectedRow === 7 && id === "right"){ 
          console.log("going right for 7")
          simulateClick(rightbtn); 
        }
        else if (selectedCol > midpoint + 1) {
          simulateClick(rightbtn)
          console.log("simulating right click")
          if (selectedRow === 3) {
            carousel1Midpoint += 1
          } else if (selectedRow === 4) {
            carousel2Midpoint += 1
          } else if (selectedRow === 5) {
            carousel3Midpoint += 1
          } else if (selectedRow === 6) {
            carousel4Midpoint += 1
          }
        } else if (selectedCol < midpoint - 1) {
          simulateClick(leftbtn)
          console.log("simulating left click")
          if (selectedRow === 3) {
            carousel1Midpoint -= 1
          } else if (selectedRow === 4) {
            carousel2Midpoint -= 1
          } else if (selectedRow === 5) {
            carousel3Midpoint -= 1
          } else if (selectedRow === 6) {
            carousel4Midpoint -= 1
          }
        }

        // Use requestAnimationFrame to scroll smoothly to the new selected div
        smoothScrollToMiddle(newSelectedDiv)

        setTimeout(() => {
          // After a short delay, reset the border to its original size
          newSelectedDiv.style.border = originalBorderSize;
        }, 50); // Adjust the delay duration (in milliseconds) as needed
      }
    }
  }
  setTimeout(processData, 300); // 1000 milliseconds = 1 second
}

























document.addEventListener("keydown", function (event) {
  const divArray = mapClickableDivs();
  console.log(divArray);
  const container = document.querySelector(".container");
  const emptyBorder = "none"; // Original border size
  const originalBorderSize = "2px solid red"; // Original border size
  const enlargedBorderSize = "4px solid red"; // Enlarged border size
  const currentPage = window.location.pathname; // Check the current HTML page

  if (!previousSelectedDiv) {
    previousSelectedDiv = divArray[1][1];
    return;
  }

  if (
    (event.key === "ArrowUp" && selectedRow === 1) ||
    (event.key === "ArrowDown" && selectedRow === divArray.length - 1)
  ) {
    return;
  } else if (event.key === "ArrowUp") {
    console.log("Up arrow key pressed.");
    selectedRow -= 1;
    selectedCol = 1;
  } else if (event.key === "ArrowDown") {
    console.log("Down arrow key pressed.");
    selectedRow += 1;
    selectedCol = 1;
  } else if (event.key === "ArrowLeft") {
    console.log("Left arrow key pressed.");
    selectedCol -= 1;
  } else if (event.key === "ArrowRight") {
    console.log("Right arrow key pressed.");
    selectedCol += 1;
  } else if (event.key === "Enter" && newAHrefTag) {
    console.log("Entering..." + newAHrefTag);
    event.preventDefault(); // Prevent default Enter behavior (e.g., form submission)
    // Trigger a click event on the targeted a element
    // Check if href starts with './'
    if (newAHrefTag.startsWith('./')) {
      inVideo = false
      window.location.assign(newAHrefTag);
    } else if (newAHrefTag.startsWith('#')) {
      const scrollLink = document.querySelector(`a.page-scroll[href="${newAHrefTag}"]`);
      if (scrollLink) {
        recalculateSelection(newAHrefTag);
        console.log("new row: " + selectedRow + " selectedCol: " + selectedCol)
        scrollLink.click();
      }
    } else {
      const linkObject = document.getElementById(newAHrefTag);
      inVideo = true;
      linkObject.click();
    }
  } else if (event.key === "Enter" && !newAHrefTag) {
    console.log("No ahref tag to enter")
    console.log(newSelectedDiv)
    console.log(newSelectedDiv.getAttribute('id'))
    const temp = newSelectedDiv.getAttribute('id')
    const tempDiv = document.getElementById(temp);
    tempDiv.click();
    console.log(tempDiv)
  }
  // Attempt to get the new selected div
  newSelectedDiv = divArray[selectedRow][selectedCol];
  if (
    !newSelectedDiv &&
    (event.key === "ArrowUp" || event.key === "ArrowDown")
  ) {
    if (event.key === "ArrowUp") {
      newSelectedDiv = findFirstItemInRow(selectedRow, divArray, "up");
    } else {
      newSelectedDiv = findFirstItemInRow(selectedRow, divArray, "down");
    }
    const className = findClassNameOfDivElement(newSelectedDiv);
    selectedRow = parseInt(className.split("-")[2]);
    selectedCol = parseInt(className.split("-")[3]);
  }

  // Enlarge the border for a short duration when navigating out of bounds
  if (
    !newSelectedDiv ||
    typeof newSelectedDiv === "undefined" ||
    newSelectedDiv === null
  ) {
    // If the new selected div doesn't exist, restore the border of the previously selected div
    if (previousSelectedDiv) {
      previousSelectedDiv.classList.add("selected");
      previousSelectedDiv.style.border = enlargedBorderSize;
    }
    if (event.key === "ArrowUp") {
      console.log("Up arrow key pressed.");
      selectedRow += 1;
    } else if (event.key === "ArrowDown") {
      console.log("Down arrow key pressed.");
      selectedRow -= 1;
    } else if (event.key === "ArrowLeft") {
      console.log("Left arrow key pressed.");
      selectedCol += 1;
    } else if (event.key === "ArrowRight") {
      console.log("Right arrow key pressed.");
      selectedCol -= 1;
    }
    console.log("doing nothing");
    return; // Do nothing if the selectedDiv is undefined (out of bounds)
  }

  if (selectedCard === 1 && (event.key === "ArrowUp" || event.key === "ArrowDown")) {
    carousel1Midpoint,
    carousel2Midpoint,
    carousel3Midpoint,
    carousel4Midpoint = 2,
    2,
    2,
    2;
  }
  previousSelectedDiv.classList.remove("selected");
  previousSelectedDiv.style.border = emptyBorder;
  // Set the new selected div as the current selected div
  newSelectedDiv.classList.add("selected");
  newSelectedDiv.style.border = enlargedBorderSize;

  previousSelectedDiv.classList.remove("selected");
  // Store the current selected div as the previously selected div
  previousSelectedDiv = newSelectedDiv;
  newAHrefTag = findAHrefTag(newSelectedDiv)
  console.log(selectedRow + " " + selectedCol + " " + newAHrefTag)

  // check what is the current midpoint
  // check what is the new selected div
  // if selected div is <> +-1 of the current midpoint
  let midpoint, leftbtn, rightbtn;
  if (selectedRow === 3) {
    midpoint = carousel1Midpoint;
    leftbtn = "left-1";
    rightbtn = "right-1";
  }
  else if (selectedRow === 4) {
    midpoint = carousel2Midpoint;
    leftbtn = "left-2";
    rightbtn = "right-2";
  }
  else if (selectedRow === 5) {
    midpoint = carousel3Midpoint;
    leftbtn = "left-3";
    rightbtn = "right-3";
  }
  else if (selectedRow === 6) {
    midpoint = carousel4Midpoint;
    leftbtn = "left-4";
    rightbtn = "right-4";
  }
  else if (selectedRow === 7) {
    leftbtn = "left-5";
    rightbtn = "right-5";
  }

  if (selectedRow === 7 && event.key === "ArrowLeft"){ 
    console.log("going left for 7")
    simulateClick(leftbtn); 
  }
  else if (selectedRow === 7 && event.key === "ArrowRight"){ 
    console.log("going right for 7")
    simulateClick(rightbtn); 
  }
  else if (selectedRow !== 7 && selectedCol > midpoint + 1) {
    simulateClick(rightbtn)
    console.log("simulating right click")
    if (selectedRow === 3) {
      carousel1Midpoint += 1
    } else if (selectedRow === 4) {
      carousel2Midpoint += 1
    } else if (selectedRow === 5) {
      carousel3Midpoint += 1
    } else if (selectedRow === 6) {
      carousel4Midpoint += 1
    }
  } else if (selectedRow !== 7 && selectedCol < midpoint - 1) {
    simulateClick(leftbtn)
    console.log("simulating left click")
    if (selectedRow === 3) {
      carousel1Midpoint -= 1
    } else if (selectedRow === 4) {
      carousel2Midpoint -= 1
    } else if (selectedRow === 5) {
      carousel3Midpoint -= 1
    } else if (selectedRow === 6) {
      carousel4Midpoint -= 1
    }
  }

  // Use requestAnimationFrame to scroll smoothly to the new selected div
  smoothScrollToMiddle(newSelectedDiv)

  setTimeout(() => {
    // After a short delay, reset the border to its original size
    newSelectedDiv.style.border = originalBorderSize;
  }, 200); // Adjust the delay duration (in milliseconds) as needed
});