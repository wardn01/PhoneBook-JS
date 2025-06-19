// ורד נגאר 325523017
// מוחמד ריאן 327640835
"use strict";

// Array of contact objects
const contacts = [
  {
    name: "Alhaitham",
    phone: "0525252525",
    email: "alhaitham@gmail.com",
    address: "Sumeru",
    age: 30,
    avatar: "./img/Alhaitham.webp",
  },
  {
    name: "Kinich",
    phone: "0585858585",
    email: "kinich@gmail.com",
    address: "Sumeruro",
    age: 15,
    avatar: "./img/Kinich.webp",
  },
  {
    name: "Eula",
    phone: "0505050505",
    email: "Eula@gmail.com",
    address: "Sume",
    age: 29,
    avatar: "./img/Eula.webp",
  },
  {
    name: "Wriothesley",
    phone: "0545454545",
    email: "wriothesley@gmail.com",
    address: "Sume",
    age: 29,
    avatar: "./img/Wriothesley.webp",
  },
];

// Get the element
const contactList = document.querySelector(".contact-list");
const deleteAllBtn = document.getElementById("delete-all");

// Get index for contact ToEdit
let editingIndex = null;

// Function to create a contact <li> element
function createContactItem(contact) {
  const li = document.createElement("li");
  li.className = "contact-item";

  li.innerHTML = `
    <img class="avatar" src="${contact.avatar}" alt="${contact.name}" />
    <div class="contact-info">
      <h3>${contact.name}</h3>
      <p>${contact.phone}</p>
    </div>
    <div class="contact-actions">
      <button class="info-btn" title="Info">ℹ️</button>
      <button class="edit-btn" title="Edit">✏️</button>
      <button class="remove-btn" title="Remove">🗑️</button>
    </div>
  `;

  // Button -> Delete One
  const deleteOneBtn = li.querySelector(".remove-btn");
  deleteOneBtn.addEventListener("click", () => {
    const index = contacts.indexOf(contact);
    if (index !== -1) {
      contacts.splice(index, 1);
    }
    li.remove();
    updatePersonCount();
  });

  // Button -> Info
  const infoBtn = li.querySelector(".info-btn");
  infoBtn.addEventListener("click", () => {
    document.getElementById("popup-info").style.display = "flex";
    document.getElementById("popup-name").textContent = contact.name;
    document.getElementById("popup-phone").textContent = contact.phone;
    document.getElementById("popup-email").textContent = contact.email || "N/A";
    document.getElementById("popup-address").textContent =
      contact.address || "N/A";
    document.getElementById("popup-age").textContent = contact.age || "N/A";
    document.getElementById("popup-avatar").src = contact.avatar;
    document.getElementById("popup-avatar").alt = contact.name;
  });

  // Button -> Edit
  const editBtn = li.querySelector(".edit-btn");
  editBtn.addEventListener("click", () => {
    const popupEdit = document.getElementById("popup-edit");
    popupEdit.style.display = "flex";

    document.getElementById("edit-name").value = contact.name;
    document.getElementById("edit-phone").value = contact.phone;
    document.getElementById("edit-email").value =
      contact.email !== "N/A" ? contact.email : "";
    document.getElementById("edit-address").value =
      contact.address !== "N/A" ? contact.address : "";
    document.getElementById("edit-age").value =
      contact.age !== "N/A" ? contact.age : "";

    editingIndex = contacts.indexOf(contact);
  });

  return li;
}

// Edit fields for the Contact popup
const formEditContact = document.getElementById("form-edit-contact");
const popupEdit = document.getElementById("popup-edit");

// Button -> Edit
formEditContact.addEventListener("submit", (e) => {
  e.preventDefault();

  if (editingIndex === null) return;

  // Update
  const contact = contacts[editingIndex];

  contact.name = document.getElementById("edit-name").value.trim();
  contact.phone = document.getElementById("edit-phone").value.trim();
  contact.email = document.getElementById("edit-email").value.trim() || "N/A";
  contact.address =
    document.getElementById("edit-address").value.trim() || "N/A";
  contact.age =
    parseInt(document.getElementById("edit-age").value.trim()) || "N/A";

  // Update img
  const avatarInput = document.getElementById("edit-avatar");
  if (avatarInput.files.length > 0) {
    contact.avatar = URL.createObjectURL(avatarInput.files[0]);
  }

  // Render all contacts again
  contactList.innerHTML = "";
  renderContacts();

  // Close popup
  document.getElementById("popup-edit").style.display = "none";
  editingIndex = null;
});

// Input fields for the Add Contact popup
const inputAddName = document.getElementById("add-name");
const inputAddPhone = document.getElementById("add-phone");
const inputAddEmail = document.getElementById("add-email");
const inputAddAddress = document.getElementById("add-address");
const inputAddAge = document.getElementById("add-age");
const inputAddAvatar = document.getElementById("add-avatar");
const addBtn = document.getElementById("add-btn");

// Button -> Add
addBtn.addEventListener("click", () => {
  document.getElementById("popup-add").style.display = "flex";
  inputAddName.value = "";
  inputAddPhone.value = "";
  inputAddEmail.value = "";
  inputAddAddress.value = "";
  inputAddAge.value = "";
  inputAddAvatar.value = "";
});

// Form submission - To Add new contact
const formAddContact = document.getElementById("form-add-contact");

formAddContact.addEventListener("submit", (e) => {
  e.preventDefault();

  // Use default image if none is uploaded
  let avatarURL = "./img/default-avatar.jpg";
  if (inputAddAvatar.files.length > 0) {
    avatarURL = URL.createObjectURL(inputAddAvatar.files[0]);
  }

  const newContact = {
    name: inputAddName.value.trim(),
    phone: inputAddPhone.value.trim(),
    email: inputAddEmail.value.trim() || "N/A",
    address: inputAddAddress.value.trim() || "N/A",
    age: parseInt(inputAddAge.value.trim()) || "N/A",
    avatar: avatarURL,
  };

  // Add to contacts array
  contacts.push(newContact);
  const newItem = createContactItem(newContact);
  contactList.appendChild(newItem);

  // Close popup
  document.getElementById("popup-add").style.display = "none";
  updatePersonCount();
});

//  Button -> Close popup
const closeInfoBtn = document.getElementById("close-popup-info");
const closeAddBtn = document.getElementById("close-popup-add");
const closeEditBtn = document.getElementById("close-popup-edit");

closeInfoBtn.addEventListener("click", () => {
  document.getElementById("popup-info").style.display = "none";
});
closeAddBtn.addEventListener("click", () => {
  document.getElementById("popup-add").style.display = "none";
});
closeEditBtn.addEventListener("click", () => {
  document.getElementById("popup-edit").style.display = "none";
});

// Updates the number of contacts shown.
const personCountEl = document.getElementById("person-count");

function updatePersonCount() {
  const count = contacts.length;
  personCountEl.textContent = `${count} person${count !== 1 ? "s" : ""}`;
}

// Search Input
document.getElementById("searchInput").addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  contactList.innerHTML = "";
  contacts
    .filter((c) => c.name.toLowerCase().includes(searchTerm))
    .forEach((c) => contactList.appendChild(createContactItem(c)));
});

// Render all contacts to the contact list
function renderContacts() {
  contacts.forEach((contact) => {
    const item = createContactItem(contact);
    contactList.appendChild(item);
  });
}

// Button -> Delete all
deleteAllBtn.addEventListener("click", () => {
  contacts.length = 0;
  contactList.innerHTML = "";
  editingIndex = null;
  updatePersonCount();
});

// Initial rendering when the page loads
updatePersonCount();
renderContacts();
