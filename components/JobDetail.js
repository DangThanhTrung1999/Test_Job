import React from 'react';
import { nanoid } from 'nanoid';

const JobDetail = ({ jobItemDetail, toggle }) => {
  return (
    <div className="p-3">
      {window?.innerWidth < 768 && (
        <span className="cursor-pointer float-end fw-bolder" onClick={toggle}>
          X
        </span>
      )}

      <h2>Job Detail</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{jobItemDetail.jobTitle}</h5>
          <p className="card-text">{jobItemDetail.shortDesc}</p>
          <p>{jobItemDetail.location}</p>
          {jobItemDetail.skillsets.map((skillset) => (
            <span
              key={nanoid()}
              style={{ marginRight: '5px', background: 'gray' }}
            >
              #{skillset}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
