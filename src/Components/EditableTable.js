import React from 'react';
import MaterialTable from 'material-table';

const EditableTable = props => {
  const { tableHeader, tableBody, title } = props;
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Surname', field: 'surname' },
      { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
      {
        title: 'Birth Place',
        field: 'birthCity',
        lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' }
      }
    ],
    data: [
      { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
      {
        name: 'Zerya Betül',
        surname: 'Baran',
        birthYear: 2017,
        birthCity: 34
      }
    ]
  });

  return (
    <MaterialTable
      title={title}
      columns={tableHeader}
      data={tableBody}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...tableBody];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data });
            }, 600);
          })
      }}
    />
  );
};

export default EditableTable;
