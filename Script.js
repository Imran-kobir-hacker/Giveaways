// Constants and Configurations
const CONFIG = {
    updateInterval: 4000,
    historyCount: 10,
    animationDuration: 500
};

// DOM Elements
const elements = {
    notification: document.getElementById("notification-text"),
    historyBody: document.getElementById("claim-history-body")
};

// Data Templates
const DATA = {
    domains: ["gmail.com", "yahoo.com", "hotmail.com", "aol.com", "outlook.com"],
    letters: "abcdefghijklmnopqrstuvwxyz",
    emojis: {
        approved: "✅",
        pending: "⏳",
        claimed: "🎉"
    }
};

// Utility Functions
const utils = {
    // Generate random number between min and max
    random: (min, max) => Math.floor(min + Math.random() * (max - min)),
    
    // Generate masked ID
    generateID: () => `${utils.random(1000, 9999)}***`,
    
    // Generate random email
    generateEmail: () => {
        const prefix = DATA.letters[utils.random(0, DATA.letters.length)];
        const domain = DATA.domains[utils.random(0, DATA.domains.length)];
        return `${prefix}*******@${domain}`;
    },

    // Add fade animation
    fadeIn: (element) => {
        element.style.opacity = 0;
        element.style.transition = `opacity ${CONFIG.animationDuration}ms`;
        setTimeout(() => element.style.opacity = 1, 50);
    }
};

// Notification System
class NotificationSystem {
    constructor() {
        this.currentIndex = 0;
        this.notifications = [
            `${utils.random(1000, 9999)}**** claimed $1200! ${DATA.emojis.claimed}`,
            `${utils.random(1000, 9999)}**** verification successful ${DATA.emojis.approved}`,
            `${utils.random(1000, 9999)}**** payout processed ${DATA.emojis.approved}`,
            `New claim: ${utils.random(1000, 9999)}**** ${DATA.emojis.pending}`
        ];
    }

    update() {
        elements.notification.style.opacity = 0;
        
        setTimeout(() => {
            const notification = this.notifications[this.currentIndex];
            elements.notification.textContent = notification;
            utils.fadeIn(elements.notification);
            
            // Update index for next notification
            this.currentIndex = (this.currentIndex + 1) % this.notifications.length;
        }, CONFIG.animationDuration);
    }

    start() {
        this.update();
        setInterval(() => this.update(), CONFIG.updateInterval);
    }
}

// History System
class HistorySystem {
    constructor() {
        this.historyData = this.generateInitialHistory();
    }

    generateInitialHistory() {
        return Array.from({ length: CONFIG.historyCount }, (_, index) => ({
            id: utils.generateID(),
            email: utils.generateEmail(),
            status: index < 6 ? 'approved' : 'pending'
        }));
    }

    createHistoryRow(item, animate = false) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.email}</td>
            <td><span class="status ${item.status}">
                ${item.status === 'approved' 
                    ? `${DATA.emojis.approved} Approved` 
                    : `${DATA.emojis.pending} Pending`}
            </span></td>
        `;

        if (animate) {
            row.style.opacity = 0;
            utils.fadeIn(row);
        }

        return row;
    }

    updateHistory() {
        elements.historyBody.innerHTML = '';
        
        this.historyData.forEach((item, index) => {
            const row = this.createHistoryRow(item, true);
            setTimeout(() => {
                elements.historyBody.appendChild(row);
            }, index * 100); // Staggered animation
        });
    }

    updateRandomRow() {
        const randomIndex = utils.random(0, this.historyData.length);
        this.historyData[randomIndex] = {
            id: utils.generateID(),
            email: utils.generateEmail(),
            status: 'approved'
        };
        this.updateHistory();
    }

    start() {
        this.updateHistory();
        // Update a random row every 8 seconds
        setInterval(() => this.updateRandomRow(), 8000);
    }
}

// Initialize Systems
document.addEventListener('DOMContentLoaded', () => {
    const notification = new NotificationSystem();
    const history = new HistorySystem();
    
    notification.start();
    history.start();
});
