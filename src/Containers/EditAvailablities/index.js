import React, { useGlobal } from 'reactn';
import moment from 'moment';
import { MyDropdown, MyTable } from '../../Components';
import { Community } from '../../utils/http';

const EditAvailabilities = props => {
  const { availabilities } = props;

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

  return (
    <div>
      <div>Availability Settings</div>
      <MyTable
        tableHeader={availabilitiesTableHeader}
        tableBody={availabilitiesTableBody}
      />
    </div>
  );
};

export default EditAvailabilities;
