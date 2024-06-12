export default class TableInterface {
  constructor() {
      this.selectedCells = new Set();
  }

  open(modal) {
      modal.innerHTML = `
          <div id="modal-content">
              <span id="close-modal">&times;</span>
              <h2>Define Schedule (Table Interface)</h2>
              <div class="table-grid">
                  ${this.createGrid()}
              </div>
              <button id="save-schedule">Save</button>
              <p id="error-message" style="color: red; display: none;">Please select at least one time period.</p>
          </div>
      `;

      modal.style.display = 'flex';

      document.getElementById('close-modal').onclick = () => {
          modal.style.display = 'none';
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

  createGrid() {
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      let grid = '<div></div>';
      days.forEach(day => {
          grid += `<div>${day}</div>`;
      });

      for (let i = 0; i < 24; i++) {
          const time = `${String(i).padStart(2, '0')}:00`;
          grid += `<div>${time}</div>`;
          for (let j = 0; j < 7; j++) {
              grid += `<div data-time="${time}" data-day="${days[j]}"></div>`;
          }
      }

      return grid;
  }

  addEventListeners() {
      document.querySelectorAll('.table-grid div[data-time]').forEach(cell => {
          cell.onclick = () => {
              cell.classList.toggle('selected');
              const key = `${cell.dataset.day}-${cell.dataset.time}`;
              if (cell.classList.contains('selected')) {
                  this.selectedCells.add(key);
              } else {
                  this.selectedCells.delete(key);
              }
          };
      });
  }

  getSchedule() {
      const schedule = {};
      this.selectedCells.forEach(key => {
          const [day, time] = key.split('-');
          if (!schedule[day]) {
              schedule[day] = [];
          }
          schedule[day].push(time);
      });
      return schedule;
  }

  validateSchedule(schedule) {
      return Object.keys(schedule).length > 0;
  }
}