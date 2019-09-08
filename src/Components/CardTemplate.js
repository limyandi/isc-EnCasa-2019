import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

const CardTemplate = props => {
  const classes = useStyles();
  const {
    id,
    driverName,
    phoneNumber,
    ETA,
    deliveryAddress,
    pickupAddress
  } = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          ID: {id}
        </Typography>
        <Typography variant="h5" component="h2">
          {driverName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {phoneNumber}
        </Typography>
        <Typography variant="body2" component="p">
          Estimated Arrival Time: {ETA}
          <br />
          Delivery Address: {deliveryAddress}
          <br />
          Pickup Address: {pickupAddress}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">More Details</Button>
      </CardActions>
    </Card>
  );
};

export default CardTemplate;
