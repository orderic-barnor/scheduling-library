import TableInterface from './TableInterface';
import PeriodInterface from './PeriodInterface';

class SchedulingLibrary {
    constructor() {
        this.init();
    }

    init() {
        // Initial setup for interface selection modal
        const selectionModal = document.createElement('div');
        selectionModal.id = 'interface-selection-modal';
        selectionModal.innerHTML = `
            <div id="interface-selection-content">
                <span id="close-selection-modal">&times;</span>
                <h2>Select Schedule Interface</h2>
                <button id="select-table-interface">Table Interface</button>
                <button id="select-period-interface">Period Interface</button>
            </div>
        `;
        document.body.appendChild(selectionModal);

        document.getElementById('open-modal').onclick = () => {
            selectionModal.style.display = 'flex';
        };

        document.getElementById('close-selection-modal').onclick = () => {
            selectionModal.style.display = 'none';
        };

        document.getElementById('select-table-interface').onclick = () => {
            this.openTableInterface();
        };

        document.getElementById('select-period-interface').onclick = () => {
            this.openPeriodInterface();
        };
    }

    openTableInterface() {
        document.getElementById('interface-selection-modal').style.display = 'none';
        const tableInterface = new TableInterface();
        tableInterface.open();
    }

    openPeriodInterface() {
        document.getElementById('interface-selection-modal').style.display = 'none';
        const periodInterface = new PeriodInterface();
        periodInterface.open();
    }
}

export default SchedulingLibrary;
