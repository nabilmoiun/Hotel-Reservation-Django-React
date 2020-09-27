import React from 'react';

const TableHead = ({headList}) => {
    const columns = headList.map((head, index) => (
    <th key={index} scope="col">{head}</th>
    ))
    return (
        <thead>
            <tr>
                <th scope="col">#</th>
                {columns}
            </tr>
        </thead>
    )
}

export default TableHead;