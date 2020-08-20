import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import DeleteIcon from '@material-ui/icons/Delete';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    maxWidth: 400
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(0),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 'auto',
    width: '100%',
    maxWidth: 400,
    display: 'block',
    overflow: 'hidden',
  },
  container: {
    position: 'relative'
  },
  delButton: {
    position: 'absolute',
    bottom: '5%',
    right: '0%'
  }
}));

function Preview(props) {
  const loadedImages = props.photos;
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = loadedImages.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
          {loadedImages.map((photo, index) => (
            <div key={photo.url}>
              {Math.abs(activeStep - index) <= 2 ? (
                <div className={classes.container}>
                  {props.removeHandler !== undefined && <Button
                    color="secondary"
                    startIcon={<DeleteIcon fontSize="large"/>}
                    onClick={() => props.removeHandler(index)}
                    className={classes.delButton}
                  />}
                  <img 
                    className={classes.img} 
                    src={photo.url}
                  />
                </div>
              ) : null}
            </div>
          ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="dots"
        activeStep={activeStep}
      />
    </div>
  );
}

export default Preview;