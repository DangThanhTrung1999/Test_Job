import React, { useEffect } from 'react';
import { nanoid } from 'nanoid';

const JobList = ({ jobListState, jobItemHandler, isLoading }) => {
  return (
    <div className="row align-items-center flex-column">
      {isLoading ? <div className="text-primary ">Loading...</div> : null}
      {!isLoading
        ? jobListState?.map((jobItem) => {
            return (
              <div
                onClick={jobItemHandler.bind(null, jobItem.jobId)}
                key={nanoid()}
                className="card mb-2 col-sm-12 col-md-8 cursor-pointer"
              >
                <div className="card-body">
                  <h5 className="card-title">{jobItem.jobTitle}</h5>
                  <p className="card-text">{jobItem.companyName}</p>
                  <p className="card-text">{jobItem.shortDesc}</p>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default JobList;
