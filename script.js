let storedNotes = JSON.parse(localStorage.getItem("notes"));
console.log(storedNotes);
let notes = storedNotes ? storedNotes : [];
let list = document.getElementById("list");
console.log(notes);
showNotes();

document.getElementById("add-btn").addEventListener("click", function () {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  console.log(description, "des");

  if (title === "") {
    alert("pleas enter the title of the note");
  } else {
    notes.push({ title: title, description: description });
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";

    console.log(notes, "notes");
    showNotes();
  }
});

function compare(a, b) {
    
    const titleA = a.title.toUpperCase();
    const titleB = b.title.toUpperCase();
  
    let comparison = 0;
    if (titleA > titleB) {
      comparison = 1;
    } else if (titleA < titleB) {
      comparison = -1;
    }
    return comparison;
  }
  
function showNotes() {

  notes.sort(compare);

  list.innerHTML = "";

  notes.map(function (note, i) {
    let listItem = document.createElement("LI");

    let divTitle = document.createElement("DIV");
    divTitle.textContent = note.title;

    let divDescription = document.createElement("DIV");
    divDescription.textContent = note.description;

    let deleteNoteBtn = document.createElement("BUTTON");
    let deleteBtnText = document.createTextNode("Delete");

    let editNoteBtn_title = document.createElement("button");
    let editBtnText_title = document.createTextNode("Edit title");

    let editNoteBtn_desc = document.createElement("button");
    let editBtnText_desc = document.createTextNode("Edit desc");

    deleteNoteBtn.appendChild(deleteBtnText);
    deleteNoteBtn.addEventListener("click", function () {
      let confirmationResults = confirm(
        "Are you sure you want to delete this note"
      );

      if (confirmationResults) {
        notes.splice(i, 1);
        showNotes();
      }
    });

    editNoteBtn_title.appendChild(editBtnText_title);
    editNoteBtn_title.addEventListener("click",function editTitle() {

      var newTitle = prompt("Edit the Title: ",notes[i].title); 

      if (newTitle === "") {
        alert("pleas enter the title of the note");
        editTitle();
      } else if (newTitle != null) {
      notes[i].title =newTitle;
      }  

      showNotes();
    });

    editNoteBtn_desc.appendChild(editBtnText_desc);
    editNoteBtn_desc.addEventListener("click",function () {
      var newDescription = prompt("Edit the Description: ",notes[i].description); 
      if (newDescription != null)
        notes[i].description =newDescription; 
        showNotes();
    });

    listItem.appendChild(divTitle);
    listItem.appendChild(divDescription);
    listItem.appendChild(deleteNoteBtn);
    listItem.appendChild(editNoteBtn_title);
    listItem.appendChild(editNoteBtn_desc);

    list.appendChild(listItem);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
  
}
