import TableInterface from './TableInterface.js';
import PeriodInterface from './PeriodInterface.js';

export default class SchedulingLibrary {
    constructor() {
        this.modal = null;
        this.tableInterface = new TableInterface();
        this.periodInterface = new PeriodInterface();
        this.addStyles();
    }

    init() {
        this.modal = document.createElement('div');
        this.modal.id = 'scheduling-modal';
        document.body.appendChild(this.modal);
    }

    open(selectedInterface) {
        if (selectedInterface === 'table') {
            this.tableInterface.open(this.modal);
        } else if (selectedInterface === 'period') {
            this.periodInterface.open(this.modal);
        } else {
          this.tableInterface.open(this.modal);

          // console.error('Invalid interface type selected');
        }
    }

    addStyles() {
        const styles = `
            #scheduling-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                justify-content: center;
                align-items: center;
            }

            #modal-content {
                background-color: white;
                padding: 20px;
                border-radius: 8px;
                width: 80%;
                max-width: 600px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
            }

            #close-modal {
                float: right;
                cursor: pointer;
            }

            .table-grid {
                display: grid;
                grid-template-columns: repeat(8, 1fr);
            }

            .table-grid > div {
                border: 1px solid #ccc;
                padding: 10px;
                text-align: center;
            }

            .table-grid > div.selected {
                background-color: #8bc34a;
            }

            .day-circle {
                display: inline-block;
                padding: 10px;
                margin: 5px;
                border: 1px solid #ccc;
                border-radius: 50%;
                cursor: pointer;
            }

            .day-circle.selected {
                background-color: #8bc34a;
                color: white;
            }

            .time-period {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
            }

            .time-period input[type="time"] {
                margin: 0 10px;
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
    }
}
