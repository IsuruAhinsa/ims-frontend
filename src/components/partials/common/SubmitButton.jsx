import React from 'react';

const SubmitButton = (props) => {
    return (
        <button
            {...props}
            disabled={props.isLoading}
            className="btn btn-primary btn-user btn-block"
            dangerouslySetInnerHTML={{__html: props.isLoading ? '<div class="spinner-border spinner-border-sm" role="status"></div>' : props.value}}
        />
    );
};

export default SubmitButton;
