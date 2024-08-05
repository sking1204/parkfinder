import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3001';

class ParkfinderApi {
    // the token for interactive with the API will be stored here.
    static token;
  
    static async request(endpoint, data = {}, method = "get") {
      console.debug("API Call:", endpoint, data, method);
  
    //   //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //   //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
      const url = `${BASE_URL}/${endpoint}`;
      const headers = { Authorization: `Bearer ${ParkfinderApi.token}` };
      const params = (method === "get")
          ? data
          : {};
  
      try {
        return (await axios({ url, method, data, params, headers })).data;
      } catch (err) {
        console.error("API Error:", err.response);
        let message = err.response.data.error.message;
        throw Array.isArray(message) ? message : [message];
      }
    }
  
    // Individual API routes  

    static async getAllParks() {
      let res = await this.request(`parks/`);
      return res;
    }
    static async getAllParksForForm() {
      let res = await this.request(`parks/`);
      return res.parks.parks;
    }

    static async getParksStateList() {
      let res = await ParkfinderApi.request(`parks/stateCodes`);
      return res;
    }

    static async getParkCodesList() {
      let res = await ParkfinderApi.request(`parks/parkCodes`);
      return res;
    }

    static async getParksByNameList() {
      let res = await this.request(`parks/parkNames`);
      return res;
    }


    static async getParksByState(selectedState) {
      let res = await this.request(`parks/stateCode/${selectedState}`);
      return res;
    }

    static async getParksByParkCode(selectedCode) {
      let res = await this.request(`parks/parkCode/${selectedCode}`);
      return res;
    }

    static async getEventsByParkCode(parkCode) {
      let res = await this.request(`parks/events/${parkCode}`);
      return res;
    }

    static async getThingsToDoByParkCode(parkCode) {
      let res = await this.request(`parks/things-to-do/${parkCode}`);
      return res;
    }

   
    static async signUp(data) {
      let res = await this.request("auth/register/", data, "post");
      ParkfinderApi.token = res.token;
      return res.token;
    }

    static async login(credentials) {
      let res = await this.request("auth/token/", credentials, "post");
      ParkfinderApi.token = res.token;
      return res.token;
    }

    static async patchUser(username, data) {
      let res = await this.request(`users/${username}`, data, "patch");
      ParkfinderApi.token = res.token;
      console.log("API RESPONSE", res);
      return res;
    }

    static async getUser(username) {
      let res = await this.request(`users/${username}`);
      return res.user;
    }

    static async leaveReview(username, parkCode, reviewData) { 
      if(!reviewData)    {
        throw new Error("reviewData is undefined");
      }
      const data = {
          review_title: reviewData.review_title,
          review_data: reviewData.review_data,
          rating: reviewData.rating,
      };

      console.log("Data being sent to API:", data);

      let res = await this.request(`users/${username}/reviews/${parkCode}`, data, "post");
      return res;
  }

  static async getAllReviews() {
    let res = await this.request(`users/reviews`);
    return res;
  }

  static async saveActivities(username,parkCode, data) {

    let res = await this.request(`users/${username}/saved-activities/${parkCode}`, data, "post");
    return res;
  }

  static async saveEvents(username,parkCode, data) {

    let res = await this.request(`users/${username}/saved-events/${parkCode}`, data, "post");
    return res;
  }
  static async saveMap(username,parkCode, data) {

    let res = await this.request(`users/${username}/saved-map/${parkCode}`, data, "post");
    return res;
  }

  static async saveThingsToDo(username,parkCode, data) {

    let res = await this.request(`users/${username}/saved-things-to-do/${parkCode}`, data, "post");
    return res;
  }

  static async saveEntranceFees(username,parkCode, data) {

    let res = await this.request(`users/${username}/saved-fees/${parkCode}`, data, "post");
    return res;
  }

  static async getSavedActivities(username,parkCode) {

    let res = await this.request(`users/${username}/saved-activities/${parkCode}`);
    return res;

  }
  static async getSavedFees(username,parkCode) {

    let res = await this.request(`users/${username}/saved-fees/${parkCode}`);
    return res;
  }

  static async getSavedItems(username) {

    let res = await this.request(`users/${username}/saved-items`);
    return res;
  }
  static async getSavedEvents(username) {

    let res = await this.request(`users/${username}/saved-events/${parkCode}`);
    return res;
  }

  static async saveFavorites(username,parkCode, data) {

    let res = await this.request(`users/${username}/saved-favorites/${parkCode}`, data, "post");
    return res;
  }

  static async getSavedFavoritesByParkCode(username,parkCode) {

    let res = await this.request(`users/${username}/saved-favorites/${parkCode}`);
    return res;
  }

  static async getFavoritesByUsername(username) {

    let res = await this.request(`users/${username}/favorites`);
    return res;
  }

  // static async getAllSavedFavorites(username) {

  //   let res = await this.request(`users/${username}/all-saved-favorites`);
  //   return res;
  // }


  //   static async newLeaveReview(username, reviewData) {     
  //     const data = {
  //         review_title: reviewData.review_title,
  //         review_data: reviewData.review_data,
  //         rating: reviewData.rating,
  //     };

  //     let res = await this.request(`users/${username}/leave-review`, data, "post");
  //     return res;
  // }
}

    // static async leaveReview(data) {
    //   let res = await this.request(`users/${username}/reviews/${park_code}`, data, "post");
      
    //   return res;
    // }

  

//      /** Get companies (filtered by name if not undefined) */

//   static async getCompanies(name) {
//     let res = await this.request("companies", { name });
//     return res.companies;
//   }
  
//     /**Search for a company by specific parameters */
//     static async searchCompanies(formData) {
//       let query = []
//       if(formData.term) {
//         query.push(`name=${formData.term}`);
//       }
//       if(formData.minEmployees) {
//         query.push(`minEmployees=${formData.minEmployees}`);
//       }
//       if(formData.maxEmployees) {
//         query.push(`maxEmployees=${formData.maxEmployees}`);
//       }
//       let url = "companies?" + query.join("&");
  
//       let res = await this.request(url);
//       return res.companies;
//     }
  
//     /** Create a new company using an object with relevant data */
//     static async createCompany(company) {
//       let res = await this.request(`companies/`, company, "post");
//       return res.statusCode;
//     }
  
//     /** Get details on a job by id */
//     static async getJob(id) {
//       let res = await this.request(`jobs/${id}`);
//       return res.job;
//     }
  
//     static async getAllJobs() {
//       let res = await this.request(`jobs/`);
//       return res.jobs;
//     }

//      /** Get list of jobs (filtered by title if not undefined) */

//   static async getJobs(title) {
//     let res = await this.request("jobs", { title });
//     return res.jobs;
//   }
  
//     /**Search for a job by specific parameters */
//     static async searchJobs(formData) {
//       let query = []
//       console.log(formData);
//       if(formData.term) {
//         query.push(`title=${formData.term}`);
//       }
//       if(formData.minSalary) {
//         query.push(`minSalary=${formData.minSalary}`);
//       }
//       if(formData.hasEquity) {
//         query.push(`hasEquity=${formData.hasEquity}`);
//       }
//       //let url = "jobs/search?" + query.join("&");
//       let url = "jobs?" + query.join("&");
      
//       let res = await this.request(url);
//       return res.jobs;
//     }
  
//     /** Create a new job using an object with relevant data */
//     static async createJob(job) {
//       let res = await this.request(`jobs/`, job, "post");
//       return res.statusCode;
//     }
  
//     static async login(credentials) {
//       let res = await this.request("auth/token/", credentials, "post");
//       JoblyApi.token = res.token;
//       return res.token;
//     }
  
//     static async signUp(data) {
//       let res = await this.request("auth/register/", data, "post");
//       JoblyApi.token = res.token;
//       return res.token;
//     }
  
//     static async getUser(username) {
//       let res = await this.request(`users/${username}`);
//       return res.user;
//     }
  
//     static async patchUser(username, data) {
//       let res = await this.request(`users/${username}`, data, "patch");
//       console.log("API RESPONSE", res);
//       return res;
//     }
  
//     static async applyToJob(username, jobId) {
//       let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
//       return res;
//     }
  
    // obviously, you'll add a lot here ...
  // }
  
  // for now, put token ("testuser" / "password" on class)
  // JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  //     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  //     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";
  
  export default ParkfinderApi;






