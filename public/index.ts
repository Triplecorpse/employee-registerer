import {getRoute} from "./route-resolver";
import {IVisitor} from "./interfaces/IVisitor";

function getMessage() {
    const route = getRoute();

    switch (route) {
        case 'pi':
            //I am on PI page
            break;
        case 'add':
            //I am on ADD page
            break;
        case 'view':
            renderView();
            break;
        case 'current-session':
            renderCurrentSession();
            break;
        default:
            return;
    }
}

async function renderCurrentSession() {
    const response: Response = await fetch('/current-session');
    const visitors: IVisitor[] = await response.json();

    renderTable(visitors.map((visitor: IVisitor) => {
        const visitorText = {};

        for (let key in visitor) {
            if (!visitor.hasOwnProperty(key)) {
                return;
            } else if (key instanceof Date) {
                visitorText[key] = visitor[key].getHours() + ':' + visitor[key].getMinutes();
            } else {
                visitorText[key] = visitor[key].toString();
            }
        }

        return visitorText;
    }));
}

function getSearchParams(): {[key:string]: string} {
    const query = location.search.replace('?', '').split('&');
    const result = {};

    query.forEach((queryPart: string) => {
        const pair = queryPart.split('=');

        result[pair[0]] = pair[1]
    });

    return result;
}

async function renderView() {
    const params = getSearchParams();
    const response: Response = await fetch(`/period/?month=${params.month}&year=${params.year}`);
    const visitors: IVisitor[] = await response.json();

    renderTable(visitors.map((visitor: IVisitor) => {
        const visitorText = {};

        for (let key in visitor) {
            if (!visitor.hasOwnProperty(key)) {
                return;
            } else if (key instanceof Date) {
                visitorText[key] = visitor[key].getHours() + ':' + visitor[key].getMinutes();
            } else {
                visitorText[key] = visitor[key].toString();
            }
        }

        return visitorText;
    }));
}

interface ITableRow {
    [key: string]: string;
}

function renderTable(tableData: ITableRow[]) {
    if (!tableData.length) {
        throw new Error('No table data!');
    }

    const table = document.getElementById('entries');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const headers = Object.keys(tableData[0]);

    headers.forEach((header: string) => {
        const th = document.createElement('th');

        th.textContent = header;
        thead.appendChild(th);
    });

    tableData.forEach((tableRow: ITableRow) => {
        const tr = document.createElement('tr');
        const values = Object.values(tableRow);

        values.forEach((value: string) => {
            const td = document.createElement('td');

            td.textContent = value;
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });

    table.innerHTML = '';
    table.appendChild(thead);
    table.appendChild(tbody);
}
