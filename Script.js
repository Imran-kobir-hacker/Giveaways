// Notification scroll
const notificationText = document.getElementById("notification-text");

function getRandomID() {
  return Math.floor(1000 + Math.random() * 9000) + "**** claim successful";
}

function updateNotification() {
  notificationText.textContent = getRandomID();
}

setInterval(updateNotification, 4000);

// History generation
const historyBody = document.getElementById("claim-history-body");
const domains = ["gmail.com", "yahoo.com", "hotmail.com", "aol.com"];
const letters = "abcdefghijklmnopqrstuvwxyz";

function getMaskedID() {
  return Math.floor(1000 + Math.random() * 9000) + "***";
}

function getRandomEmail() {
  const prefix = letters[Math.floor(Math.random() * letters.length)];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${prefix}*******@${domain}`;
}

function populateHistory() {
  for (let i = 0; i < 10; i++) {
    const row = document.createElement("tr");
    const status = i < 6 ? "approved" : "pending";
    const statusText =
      status === "approved"
        ? '<span class="approved">✅ Approved</span>'
        : '<span class="pending">⏳ Pending</span>';
    row.innerHTML = `
      <td>${getMaskedID()}</td>
      <td>${getRandomEmail()}</td>
      <td>${statusText}</td>
    `;
    historyBody.appendChild(row);
  }
}

populateHistory();