import React, { useEffect, useGlobal } from 'reactn';
import moment from 'moment';
import { MyTable, MyFormDialog } from '../../Components';
import { User, Delivery, Pickup } from '../../utils/http';
import PickupForm from './PickupForm';
import DeliveryForm from './DeliveryForm';

function CustomerView(props) {
  const [user] = useGlobal('user');

  const [
    unacceptedDeliveriesRequest,
    setUnacceptedDeliveriesRequest
  ] = React.useState(undefined);
  const [
    unacceptedPickupsRequest,
    setUnacceptedPickupsRequest
  ] = React.useState(undefined);

  useEffect(() => {
    Delivery.getCurrentDeliveriesRequest(user.ID, 0).then(res => {
      if (res.data.deliveries) {
        setUnacceptedDeliveriesRequest(res.data.deliveries);
      }
    });
    Pickup.getCurrentPickupsRequest(user.ID, 0).then(res => {
      if (res.data.pickups) {
        setUnacceptedPickupsRequest(res.data.pickups);
      }
    });
  }, [user.ID]);

  const [availableDrivers, setAvailableDrivers] = React.useState(undefined);

  const [
    availableDriversFormOpen,
    setAvailableDriversFormOpen
  ] = React.useState(false);

  const tableOnRowClick = id => {
    const thisData = unacceptedPickupsRequest.filter(
      pickup => pickup.ID === id
    )[0];

    const dayOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];
    const availabilityDetails = {
      day: dayOfWeek[moment(thisData.date).day()],
      timeFrom: moment(thisData.time, 'HH:mm').format('HH:mm'),
      timeTo: moment(thisData.timeTo, 'HH:mm').format('HH:mm')
    };
    User.getDriversByAvailability(availabilityDetails).then(res => {
      setAvailableDrivers(res.data.drivers);
    });
    setAvailableDriversFormOpen(true);
  };

  const availableDriversForm = {
    dialogTitle:
      'These Drivers are available for the date and time of this pickup task',
    dialogText: 'List of Drivers',
    handleClose: () => {
      setAvailableDriversFormOpen(false);
    }
  };

  const MyDeliveries = () => {
    if (unacceptedDeliveriesRequest) {
      if (unacceptedDeliveriesRequest.length !== 0) {
        return <MyTable data={unacceptedDeliveriesRequest} />;
      }
    }
    return null;
  };

  const MyPickupRequest = () => {
    if (unacceptedPickupsRequest) {
      if (unacceptedPickupsRequest.length !== 0) {
        return (
          <MyTable
            rowOnClick={tableOnRowClick}
            data={unacceptedPickupsRequest}
          />
        );
      }
    }
    return null;
  };

  return (
    <div>
      <DeliveryForm />
      <MyDeliveries />
      <div style={{ margin: 20 }} />
      <PickupForm />
      <MyPickupRequest />
      <MyFormDialog
        open={availableDriversFormOpen}
        handleClose={availableDriversForm.handleClose}
        dialogTitle={availableDriversForm.dialogTitle}
        dialogText={availableDriversForm.dialogText}
      >
        {availableDrivers && <MyTable data={availableDrivers} />}
      </MyFormDialog>
      <div />
    </div>
  );
}

export default CustomerView;
