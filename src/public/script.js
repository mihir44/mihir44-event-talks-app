document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('category-search');
    const scheduleContainer = document.getElementById('schedule');
    
    // In the final single-file version, 'talksData' will be globally available
    // For development, we'll use an empty array if not defined
    const talks = window.talksData || [];

    function renderSchedule(filter = '') {
        const query = filter.toLowerCase().trim();
        scheduleContainer.innerHTML = '';

        const filteredTalks = talks.filter(talk => 
            talk.categories.some(cat => cat.toLowerCase().includes(query)) ||
            talk.title.toLowerCase().includes(query) ||
            talk.speakers.some(speaker => speaker.toLowerCase().includes(query))
        );

        if (filteredTalks.length === 0) {
            scheduleContainer.innerHTML = '<div class="no-results">No talks found matching your search.</div>';
            return;
        }

        // Logic to insert Lunch Break
        // Lunch is after the 3rd talk (id: 3)
        filteredTalks.forEach((talk, index) => {
            const talkElement = document.createElement('div');
            talkElement.className = 'timeline-item';
            talkElement.innerHTML = `
                <span class="time-slot">${talk.startTime} - ${talk.endTime}</span>
                <div class="talk-card" onclick="this.classList.toggle('expanded')">
                    <h2 class="talk-title">${talk.title}</h2>
                    <div class="speakers">
                        <span>👤</span> ${talk.speakers.join(', ')}
                    </div>
                    <div class="categories">
                        ${talk.categories.map(cat => `<span class="category-tag">${cat}</span>`).join('')}
                    </div>
                    <div class="description">${talk.description}</div>
                </div>
            `;
            scheduleContainer.appendChild(talkElement);

            // If this was Talk 3 (or the closest thing to it in filtered view), add lunch
            // Note: In a filtered view, identifying "after talk 3" is tricky.
            // We'll stick to the actual IDs from the data.
            if (talk.id === 3) {
                const lunchElement = document.createElement('div');
                lunchElement.className = 'lunch-break';
                lunchElement.innerHTML = `
                    <span class="time-slot">01:20 PM - 02:20 PM</span>
                    <strong>Lunch Break</strong>
                `;
                scheduleContainer.appendChild(lunchElement);
            }
        });
    }

    searchInput.addEventListener('input', (e) => {
        renderSchedule(e.target.value);
    });

    // Initial render
    renderSchedule();
});
