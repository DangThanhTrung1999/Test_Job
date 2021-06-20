import React, { useEffect, useRef, useState } from 'react';

import { nanoid } from 'nanoid';
import JobService from '../services/job.service';

import getTenElementsFromArray from '../utils/arrayUtil';

import { Modal } from 'reactstrap';

import { debounce } from 'lodash';
import JobDetail from '../components/JobDetail';

import JobList from '../components/JobList';
import { toast } from 'react-toastify';

const customStyles = {
  content: {
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%  ',
    transform: 'translate(-50%, -50%)',
  },
};

const GettingJob = ({ jobList }) => {
  //SET UP STATE
  const [jobListState, setJobListState] = useState(jobList);
  const [jobItemDetail, setJobItemDetail] = useState(jobList[0]);
  const [width, setWidth] = useState(0);
  const [modal, setModal] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const toggle = () => setModal((oldModal) => !oldModal);

  const searchRef = useRef();

  const searchHandler = async () => {
    const searchValue = searchRef.current.value;
    try {
      setLoading(true);
      const newJobList = await JobService.getJobByCompanyName(searchValue);
      console.log('job list after search by company name', newJobList);
      setJobListState(newJobList);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error('some thing went wrong');
    }
  };

  //OPTIONAL : i think in order to improve customer UX , we should implement onChange Handler when user enter the input ,
  // but we should delay the handler for after 300 milliseconds since user have not enter the input
  const onChangeSearchHandler = debounce(searchHandler, 1000);

  const jobItemHandler = (jobId) => {
    setModal(true);
    setJobItemDetail(jobListState.find((jobItem) => jobItem.jobId === jobId));
    console.log(jobItemDetail);
  };

  //use to handler when user click filter button to get the last 7 days published post
  const filterHandler = async () => {
    try {
      setLoading(true);
      const jobListRes = await JobService.filterJobPublishedLast7Days();
      console.log('job list after filtering ', jobListRes);
      setJobListState(jobListRes);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error('some thing went wrong');
    }
  };

  const windowResizeHandler = debounce(() => {
    console.log(window.innerWidth);
    setWidth(window.innerWidth);
  }, 1);

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener('resize', windowResizeHandler);
  }, []);
  return (
    <div className="mt-3">
      <div className="header justify-content-center ">
        <h2 className="text-center">Getting job</h2>
        <div className="row d-flex justify-content-center">
          <div className="job-filter col-md-7 col-sm-12">
            <input
              onKeyUp={onChangeSearchHandler}
              ref={searchRef}
              type="text"
              className="form-control"
              placeholder="Company name"
              aria-label="company name"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="col-md-5">
            <button onClick={searchHandler} className="btn btn-primary">
              Search
            </button>
            <button
              style={{ marginLeft: '10px' }}
              onClick={filterHandler}
              className="btn btn-success "
            >
              Filter the last 7 days published job
            </button>
          </div>
        </div>
      </div>

      <div className="container mt-3">
        <div className="row flex-row">
          <div className=" job-list col-sm-12 col-md-5">
            <JobList
              isLoading={isLoading}
              jobItemHandler={jobItemHandler}
              jobListState={jobListState}
            />
          </div>
          <div
            className="job-detail col-sm-12 col-md-7"
            style={{ position: 'fixed', top: '12%', left: '40%' }}
          >
            {width > 768 && <JobDetail jobItemDetail={jobItemDetail} />}
          </div>
          {width <= 768 && (
            <Modal isOpen={modal} toggle={toggle}>
              <JobDetail jobItemDetail={jobItemDetail} toggle={toggle} />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  console.log({ context });

  let data = null;

  try {
    const jobList = await JobService.getJobs();
    return {
      props: {
        something: 'hello something',
        jobList: getTenElementsFromArray(jobList),
      },
    };
  } catch (err) {
    console.log({ err });
    return {
      props: {
        error: true,
      },
    };
  }
}

export default GettingJob;
