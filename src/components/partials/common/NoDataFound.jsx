import React from 'react';

const NoDataFound = ({colSpan}) => {
    return (
        <tr className="text-center">
            <td colSpan={colSpan}>Sorry! No data found.</td>
        </tr>
    );
};

export default NoDataFound;
