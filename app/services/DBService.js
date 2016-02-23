var DBService = {
  getNotes(username){
    username = username.toLowerCase().trim();
    var url = "https://jpgithubviewer.firebaseio.com/${username}.json";
    return fetch(url)
      .then((res) => res.json());
  },
  addNote(username, note){
    username = username.toLowerCase().trim();
    var url = "https://jpgithubviewer.firebaseio.com/${username}.json";
    return fetch(url, {
      method: 'post',
      body: JSON.stringify(note)
    }).then((res) => {return(res.json)})
  }
}

module.exports = DBService;
