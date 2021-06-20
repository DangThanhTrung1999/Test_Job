import JobService from '../../services/job.service';

import { sub, isAfter } from 'date-fns';

import getTenElementsFromArray from '../../utils/arrayUtil.js';

const listJobHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      if (req.query.type === 'company_name') {
        const listJob = await JobService.getJobs();
        const companyName = req.query.companyName;
        const jobListAfterFilteringByCompanyName = listJob.filter((job) => {
          return job.companyName
            .toLowerCase()
            .includes(companyName.toLowerCase());
        });
        return res.status(200).json({
          jobListAfterFilteringByCompanyName: getTenElementsFromArray(
            jobListAfterFilteringByCompanyName
          ),
        });
      }
      if (req.query.type === 'day') {
        const listJob = await JobService.getJobs();

        //--------------- using date-fns library to handler the date time problem ----------------------

        // get the present date
        const presentDate = new Date();

        // get the date of 7 days before
        const dateOf7DaysBefore = sub(presentDate, {
          days: 7,
        });

        //compare and filter the published date of post with dateOf7DaysBefore using isAfter function of date-fns
        const listJobAfterFilteringByBefore7Days = listJob.filter((jobItem) =>
          isAfter(new Date(jobItem.OBJpostingDate), dateOf7DaysBefore)
        );
        return res.status(200).json({
          listJobAfterFilteringByBefore7Days: getTenElementsFromArray(
            listJobAfterFilteringByBefore7Days
          ),
        });
      }
  }
};

export default listJobHandler;
