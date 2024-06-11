import SchedulingLibrary from '../dist/schedulelib.js'


const scheduleLibrary = new SchedulingLibrary();
scheduleLibrary.init();

document.getElementById('open-modal').onclick = () => {
    const selectedInterface = prompt("Enter 'table' for Table Interface or 'period' for Period Interface:");
    scheduleLibrary.open(selectedInterface);
};

document.addEventListener('scheduleSaved', (event) => {
    console.log('Schedule saved:', event.detail);
});
