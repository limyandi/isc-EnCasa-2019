import React, { useGlobal } from 'reactn';
import moment from 'moment';
import { MyDropdown, MyTable } from '../../Components';
import { Community } from '../../utils/http';
import EditableTable from '../../Components/EditableTable';

const EditAvailabilities = props => {
  const { availabilities } = props;

  // const availabilitiesTableHeader = [
  //   { title: 'Monday', field: 'Monday' },
  //   { title: 'Tuesday', field: 'Tuesday' },
  //   { title: 'Wednesday', field: 'Wednesday' },
  //   { title: 'Thursday', field: 'Thursday' },
  //   { title: 'Friday', field: 'Friday' },
  //   { title: 'Saturday', field: 'Saturday' },
  //   { title: 'Sunday', field: 'Sunday' }
  // ];

  const availabilitiesTableHeader = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  const availabilitiesTableBody = Object.keys(availabilities).map(day => {
    const timeFrom = moment(`"${availabilities[day].from}"`, 'HH:mm').format(
      'HH:mm'
    );
    const timeTo = moment(`"${availabilities[day].to}"`, 'HH:mm').format(
      'HH:mm'
    );
    return {
      [day]: `${timeFrom}-${timeTo}`
    };
  });

  // console.log(availabilitiesTableBody);

  // const availabilitiesTableBody = [
  //   {
  //     Monday: 'haha',
  //     Tuesday: 'haha',
  //     Wednesday: 'haha',
  //     Thursday: 'haha',
  //     Friday: 'haha',
  //     Saturday: 'haha',
  //     Sunday: 'haha'
  //   }
  // ];
  return (
    <div>
      <div>Availability Settings</div>
      <MyTable
        tableHeader={availabilitiesTableHeader}
        tableBody={availabilitiesTableBody}
      />
      {/* <EditableTable
        title="Availabilities"
        tableHeader={availabilitiesTableHeader}
        tableBody={availabilitiesTableBody}
      /> */}
    </div>
  );
};

export default EditAvailabilities;
