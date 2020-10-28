// Original Code written by LOUIS LAZARIS (impressivewebs.com/textarea-auto-resize/)

let textareas = document.querySelectorAll(".txta"),
  hiddenDiv = document.createElement("div"),
  content = null;

// Adds a class to all textareas
for (let j of textareas) {
  j.classList.add("txtstuff");
}

// Build the hidden div's attributes

// The line below is needed if you move the style lines to CSS
// hiddenDiv.classList.add('hiddendiv');

// Add the "txta" styles, which are common to both textarea and hiddendiv
// If you want, you can remove those from CSS and add them via JS
hiddenDiv.classList.add("txta");

// Add the styles for the hidden div
// These can be in the CSS, just remove these three lines and uncomment the CSS
hiddenDiv.style.display = "none";
hiddenDiv.style.whiteSpace = "pre-wrap";
hiddenDiv.style.wordWrap = "break-word";

// Loop through all the textareas and add the event listener
for (let i of textareas) {
  (function (i) {
    // Note: Use 'keyup' instead of 'input'
    // if you want older IE support
    i.addEventListener("input", function () {
      // Append hiddendiv to parent of textarea, so the size is correct
      i.parentNode.appendChild(hiddenDiv);

      // Remove this if you want the user to be able to resize it in modern browsers
      i.style.resize = "none";

      // This removes scrollbars
      i.style.overflow = "hidden";

      // Every input/change, grab the content
      content = i.value;

      // Add the same content to the hidden div

      // This is for old IE
      content = content.replace(/\n/g, "<br>");

      // The <br ..> part is for old IE
      // This also fixes the jumpy way the textarea grows if line-height isn't included
      hiddenDiv.innerHTML = content + '<br style="line-height: 3px;">';

      // Briefly make the hidden div block but invisible
      // This is in order to read the height
      hiddenDiv.style.visibility = "hidden";
      hiddenDiv.style.display = "block";
      i.style.height = hiddenDiv.offsetHeight + "px";

      // Make the hidden div display:none again
      hiddenDiv.style.visibility = "visible";
      hiddenDiv.style.display = "none";
    });
  })(i);
}
