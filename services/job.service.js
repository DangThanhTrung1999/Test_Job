import axios from 'axios';

const body = {
  companySkills: true,
  dismissedListingHashes: [],
  fetchJobDesc: true,
  jobTitle: 'Business Analyst',
  locations: [],
  numJobs: 20,
  previousListingHashes: [],
  companyName: 'The Judge Group',
};

export default class JobService {
  static getJobs = async () => {
    const data = await axios.post('https://www.zippia.com/api/jobs', body);
    return data.data.jobs;
  };

  static getJobByCompanyName = async (searchValue) => {
    const newJobListRes = await axios.get(
      `/api/jobs?type=company_name&companyName=${searchValue}`
    );
    console.log(newJobListRes);
    return newJobListRes.data.jobListAfterFilteringByCompanyName;
  };

  static filterJobPublishedLast7Days = async () => {
    const newJobListRes = await axios.get(`/api/jobs?type=day`);
    return newJobListRes.data.listJobAfterFilteringByBefore7Days;
  };
}
