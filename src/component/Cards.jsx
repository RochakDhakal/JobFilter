import axios from "axios";
import React, { useEffect, useState } from "react";

function Cards() {
  const [job, setJob] = useState([]);
  const [filteredJob, setFilteredJob] = useState([]); 
  const [searched, setSearched] = useState(""); 
  //API
  const PARAMS = {
    method: "GET",
    url: "https://storage.googleapis.com/programiz-static/hiring/software/job-listing-page-challenge/data.json",
  };

  const getData = async () => {
    try {
      const response = await axios(PARAMS);
      const jobList = response.data;
      setJob(jobList);
      setFilteredJob(jobList);
      console.log("JobList", jobList);
    } catch (e) {
      console.log("Error", e);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  // Handle keyword search
  const handleSearch = (event) => {
    const keyword = event.target.value;
    setSearched(keyword);

    // Filter jobs based on search keyword
    const filtered = job.filter((item) => {
      const keywords = item.keywords || [];
      console.log("Keyword",keyword)
      return keywords.some((val) =>
        val.toLowerCase().includes(keyword.toLowerCase())
      );
    });

    setFilteredJob(filtered);
  };
  return (
    <>
      <input
        type="text"
        value={searched}
        onChange={handleSearch}
        placeholder="Search..."
        className="w-25 display-5"
      />
      {filteredJob.map((items, index) => {
        // Days of job listing
        const timing = new Date(items.posted_on);
        const currTime = new Date();
        const diffTime = currTime.getTime() - timing.getTime();
        console.log("Diff Time",diffTime)
        const getDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        // console.log("GetDays",getDays);
        return (
          <div className="card mb-3" style={{ maxWidth: 540 }} key={index}>
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={items.company_logo}
                  className="img-fluid rounded-start"
                  alt="Logo"
                  style={{ height: "5rem", width: "5rem" }}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h3 className="card-title">{items.company}</h3>
                  <span>{items.timing}</span>
                  <p className="card-text">
                    <h6>{items.position}</h6>
                    {items.keywords?.map((val, ind) => {
                      return (
                        <span
                          href="#"
                          key={val}
                          className="text-light bg-secondary m-2 p-1"
                          onClick={() => console.log(val)}
                        >
                          {val}
                        </span>
                      );
                    })}
                  </p>
                  <p className="card-text">
                    <small className="text-muted">{getDays} days ago</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Cards;
