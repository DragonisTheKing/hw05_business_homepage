const bowl = {};
const bowlList = document.getElementById('bowl-list');
const finishBtn = document.getElementById('finish-btn');
const cards = document.querySelectorAll('.card[data-item]');

cards.forEach(card => {
    card.addEventListener('click', () => {
        const itemName = card.getAttribute('data-item');
        
        if (bowl[itemName]) {
            bowl[itemName]++;
        } else {
            bowl[itemName] = 1;
        }

        updateBowlUI();
    });
});

function updateBowlUI() {
    bowlList.innerHTML = '';
    const items = Object.keys(bowl);

    if (items.length === 0) {
        bowlList.innerHTML = '<li class="list-group-item text-muted">Your bowl is currently empty. Click on the items above to add them to your bowl.</li>';
        finishBtn.disabled = true;
        return;
    }

    finishBtn.disabled = false;

    items.forEach(item => {
        const count = bowl[item];
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        
        let displayText = item;
        if (count > 1) {
            displayText += ` (x${count})`;
        }

        li.innerHTML = `<span>${displayText}</span>`;
        bowlList.appendChild(li);
    });
}

finishBtn.addEventListener('click', () => {
    alert("Great, you have completed your order. Thank you!");
    
    for (let key in bowl) {
        delete bowl[key];
    }
    updateBowlUI();
});