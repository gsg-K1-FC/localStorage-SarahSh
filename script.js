let storedNotes = JSON.parse(localStorage.getItem("notes"));
let notes = storedNotes ? storedNotes : [];
let list = document.getElementById("list");
showNotes();

function isEmptyOrSpaces(str){
  return str === null || str.match(/^ *$/) !== null;
}
document.getElementById("add-btn").addEventListener("click", function () {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;

  if (isEmptyOrSpaces(title)) {
    alert("pleas enter the title of the note");
  } else {
    notes.push({ title: title, description: description });
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";

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
    listItem.setAttribute('id', i);

    let divTitle = document.createElement("DIV");
    divTitle.textContent = note.title;

    let divDescription = document.createElement("DIV");
    divDescription.textContent = note.description;

    let deleteNoteBtn = document.createElement("BUTTON");
    let deleteBtnText = document.createTextNode("Delete");

    let editNoteBtn = document.createElement("button");
    let editBtnText = document.createTextNode("Edit");

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

    editNoteBtn.appendChild(editBtnText);
    editNoteBtn.addEventListener("click",function () {

      listItem.classList.add('selected');

      let editForm = document.createElement("form"); 

      let newTitle = document.createElement("input");
      let placeHolder_title = document.createAttribute("placeholder");
      placeHolder_title.value = "Edit the title";
      newTitle.setAttributeNode(placeHolder_title);

      let newDesc = document.createElement("textarea");
      let placeHolder_desc = document.createAttribute("placeholder");
      placeHolder_desc.value = "Edit the description";
      newDesc.setAttributeNode(placeHolder_desc);

      let Submit = document.createElement("button");
      let submitText = document.createTextNode("Submit");
      Submit.appendChild(submitText);

      editForm.appendChild(newTitle);
      editForm.appendChild(newDesc);
      editForm.appendChild(Submit);
      listItem.appendChild(editForm);

      Submit.addEventListener("click", function Submit (){
        selectedId = document.querySelector("#list li.selected").getAttribute("id");
        
        notes.map(function (note, i){
          if(selectedId==i){
            if (isEmptyOrSpaces(newTitle.value)) {
              alert("pleas enter the title of the note");
        } else {
          note.title= newTitle.value;
          note.description=newDesc.value;
        }
      }
        });
        
        showNotes();
      },{once:true});

           

      

      

    }, {once: true});


    listItem.appendChild(divTitle);
    listItem.appendChild(divDescription);
    listItem.appendChild(deleteNoteBtn);
    listItem.appendChild(editNoteBtn);

    list.appendChild(listItem);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
  
}
