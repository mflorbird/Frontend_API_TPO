import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Stepper = ({ steps, currentStep }) => {
    return (
        <div className="stepper-container">
            <div className="stepper d-flex justify-content-between">
                {steps.map((step, index) => (
                    <div key={index} className="step-item text-center">
                        <div
                            className={`step-circle ${
                                index <= currentStep ? "bg-primary text-white" : "bg-light text-muted"
                            }`}
                        >
                            {index + 1}
                        </div>
                        <small className={`step-label ${index === currentStep ? "fw-bold" : ""}`}>
                            {step}
                        </small>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Stepper;
