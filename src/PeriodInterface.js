class PeriodInterface {
  constructor() {
      this.selectedDays = new Set();
  }

  open(modal) {
      modal.innerHTML = `
          <div id="modal-content">
              <span id="close-modal">&times;</span>
              <h2>Define Schedule (Period Interface)</h2>
              <div id="day-selector">
                  ${this.createDaySelectors()}
              </div>
              <div id="schedule-options">
                  <label><input type="checkbox" id="open-24h"> Open 24h/24</label>
                  <label><input type="checkbox" id="closed"> Closed</label>
              </div>
              <div id="time-inputs">
                  <div class="time-period">
                      <input type="time" class="start-time">
                      <span>to</span>
                      <input type="time" class="end-time">
                      <button class="remove-period">✖</button>
                  </div>
              </div>
              <button id="add-period">Add Time Period</button>
              <button id="save-schedule">Save</button>
              <p id="error-message" style="color: red; display: none;">Please select at least one day and define at least one time period.</p>
          </div>
      `;

      modal.style.display = 'flex';

      document.getElementById('close-modal').onclick = () => {
          modal.style.display = 'none';
      };

      document.getElementById('add-period').onclick = () => {
          this.addTimePeriod();
      };

      document.getElementById('save-schedule').onclick = () => {
          const schedule = this.getSchedule();
          if (this.validateSchedule(schedule)) {
              console.log(JSON.stringify(schedule));
              modal.style.display = 'none';
              const event = new CustomEvent('scheduleSaved', { detail: schedule });
              document.dispatchEvent(event);
          } else {
              document.getElementById('error-message').style.display = 'block';
          }
      };

      this.addEventListeners();
  }

  createDaySelectors() {
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      return days.map(day => `<span class="day-circle" data-day="${day}">${day.slice(0, 3)}</span>`).join('');
  }

  addEventListeners() {
      document.querySelectorAll('.day-circle').forEach(day => {
          day.onclick = () => {
              day.classList.toggle('selected');
              if (day.classList.contains('selected')) {
                  this.selectedDays.add(day.dataset.day);
              } else {
                  this.selectedDays.delete(day.dataset.day);
              }
          };
      });

      document.querySelectorAll('.remove-period').forEach(button => {
          button.onclick = (event) => {
              event.target.parentElement.remove();
          };
      });
  }

  addTimePeriod() {
      const timeInputs = document.getElementById('time-inputs');
      const newTimePeriod = document.createElement('div');
      newTimePeriod.className = 'time-period';
      newTimePeriod.innerHTML = `
          <input type="time" class="start-time">
          <span>to</span>
          <input type="time" class="end-time">
          <button class="remove-period">✖</button>
      `;
      newTimePeriod.querySelector('.remove-period').onclick = (event) => {
          event.target.parentElement.remove();
      };
      timeInputs.appendChild(newTimePeriod);
  }

  getSchedule() {
      const schedule = {};
      if (document.getElementById('open-24h').checked) {
          this.selectedDays.forEach(day => {
              schedule[day] = 'Open 24h';
          });
      } else if (document.getElementById('closed').checked) {
          this.selectedDays.forEach(day => {
              schedule[day] = 'Closed';
          });
      } else {
          this.selectedDays.forEach(day => {
              schedule[day] = [];
              document.querySelectorAll('.time-period').forEach(period => {
                  const startTime = period.querySelector('.start-time').value;
                  const endTime = period.querySelector('.end-time').value;
                  if (startTime && endTime) {
                      schedule[day].push({ start: startTime, end: endTime });
                  }
              });
          });
      }
      return schedule;
  }

  validateSchedule(schedule) {
      const daysWithPeriods = Object.keys(schedule).filter(day => Array.isArray(schedule[day]) && schedule[day].length > 0);
      return this.selectedDays.size > 0 && daysWithPeriods.length > 0;
  }
}

export default PeriodInterface;
