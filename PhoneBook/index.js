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

// Create a single contact item element
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

  return li; // Return the <li> element to be added to the list
}

// Render all contacts to the contact list
function renderContacts() {
  contacts.forEach((contact) => {
    const item = createContactItem(contact); // Create the item
    contactList.appendChild(item); // Add it to the list
  });
}

// Initial rendering when the page loads
renderContacts();
