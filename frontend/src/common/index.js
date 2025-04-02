
const backendDomain = "http://localhost:8080"

const SummaryApi = {
    signUp : {
      url : `${backendDomain}/api/signup`,
      method : "post"
    },
    signIn : {
        url : `${backendDomain}/api/signin`,
        method : "post"
      },
    current_user : {
    url : `${backendDomain}/api/user-details`,
    method : "get"
    },
    logout_user : {
      url : `${backendDomain}/api/userLogout`,
    method : "get"
    },
    allUser : {
      url :  `${backendDomain}/api/all-user`,
      method : "get"
    },
    updateUser : {
       url :  `${backendDomain}/api/update-user`,
      method : "post"
    },
    addHistory : {
      url :  `${backendDomain}/api/add-history`,
     method : "post"
   },
   allHistory : {
    url :  `${backendDomain}/api/all-history`,
   method : "get"
 },
 userHistory : {
  url :  `${backendDomain}/api/user-history`,
 method : "get"
},
deleteHistory : {
   url :  `${backendDomain}/api/delete-history`,
 method : "delete"
},
searchHistory : {
   url :  `${backendDomain}/api/search-history`,
 method : "post"
},
historyDetails : {
  url :  `${backendDomain}/api/history-details`,
method : "post"
} 
}

export default SummaryApi