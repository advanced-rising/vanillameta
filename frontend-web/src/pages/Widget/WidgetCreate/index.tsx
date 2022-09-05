import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Stack, Step, StepLabel, Stepper, Typography } from '@mui/material';
import PageTitleBox from '@/components/PageTitleBox';
import PageContainer from '@/components/PageContainer';
import ConfirmCancelButton from '@/components/button/ConfirmCancelButton';
import TitleBox from '@/components/TitleBox';
import WidgetDataSelect from './WidgetDataSelect';
import WidgetTypeSelect from './WidgetTypeSelect';
import WidgetAttributeSelect from './WidgetAttributeSelect';

const title = '위젯 생성';
const steps = ['데이터 선택', '위젯 타입 선택', '위젯 속성 설정'];

function WidgetCreate(props) {
  const [activeStep, setActiveStep] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedWidgetType, setSelectedWidgetType] = useState(null);
  const [widgetAttrData, setWidgetAttrData] = useState({});

  useEffect(() => {
    console.log(selectedData);
  }, [selectedData]);

  const handleDataUpdate = enteredData => {
    setSelectedData(enteredData);
  };

  const handleWidgetAttrUpdate = enteredData => {
    return setWidgetAttrData(prevState => ({ ...prevState, ...enteredData }));
    console.log(widgetAttrData);
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(prevActiveStep => prevActiveStep - 1);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    setIsFinished(true);
    console.log(widgetAttrData, 'finished');
  };

  return (
    <PageContainer>
      <PageTitleBox
        title={title}
        button={
          <Stack>
            <ConfirmCancelButton
              confirmLabel={activeStep === steps.length - 1 ? '저장' : '다음'}
              cancelLabel="이전"
              confirmProps={{
                form: 'widgetAttribute',
                onClick: activeStep === steps.length - 1 ? handleSubmit : handleNext,
                // disabled: activeStep === steps.length - 1,
              }}
              cancelProps={{
                onClick: handleBack,
                disabled: activeStep === 0,
              }}
            />
          </Stack>
        }
      >
        <Box>
          <Stepper activeStep={activeStep} sx={{ width: { xs: '100%', sm: '70%' }, m: 'auto', mt: 8, mb: 6 }}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Box>

        {activeStep === 0 ? (
          <WidgetDataSelect onUpdate={handleDataUpdate} />
        ) : activeStep === 1 ? (
          <WidgetTypeSelect />
        ) : (
          <TitleBox title="위젯 속성 설정">
            <WidgetAttributeSelect onUpdate={handleWidgetAttrUpdate} />
          </TitleBox>
        )}
      </PageTitleBox>
    </PageContainer>
  );
}

export default WidgetCreate;
