import { IVisitor, TVisitor } from './interfaces/IVisitor';
import { ITableRow } from './interfaces/ITableRow';
// import 'socket.io';

function getMessage() {
  const route = location.pathname.substring(1);

  switch (route) {
    case 'pi':
      // I am on PI page
      break;
    case 'add':
      // I am on ADD page
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

  renderTable(visitorsToTableRows(visitors));
}

function getSearchParams(): { [key: string]: string } {
  const query = location.search.replace('?', '').split('&');
  const result = {};

  query.forEach((queryPart: string) => {
    const pair: string[] = queryPart.split('=');

    Object.defineProperty(result, pair[0], {
      value: pair[1],
    });
  });

  return result;
}

async function renderView() {
  const params = getSearchParams();
  const response: Response = await fetch(`/period/?month=${params.month}&year=${params.year}`);
  const visitors: IVisitor[] = await response.json();

  renderTable(visitorsToTableRows(visitors));
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

function visitorsToTableRows(visitors: IVisitor[]): ITableRow[] {
  return visitors.map((visitor: IVisitor) => {
    const visitorText: ITableRow = {};
    let key: TVisitor;

    for (key in visitor) {
      if (!visitor.hasOwnProperty(key)) {
        return;
      }

      if (key === 'isoDate') {
        const date = new Date(visitor[key]);

        visitorText.isoDate = `${date.getHours()}:${date.getMinutes()}`;
      } else {
        visitorText[key] = visitor[key] as string;
      }
    }

    return visitorText;
  });
}

function socketConnect() {
  // @ts-ignore
  const socket = io('http://localhost:3000');

  socket.on('test', (data: any) => {
    console.log(data);
  });
}

socketConnect();
