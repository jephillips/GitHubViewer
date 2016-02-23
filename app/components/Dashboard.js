var React = require('react-native');
var Profile = require('./Profile');
var Repositories = require ('./Repositories');
var Notes = require('./Notes');
var GitHubService = require('../services/GitHubService');
var DBService = require('../services/DBService')

var {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight
} = React;

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1
  },
  image: {
    height: 350
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
})

class Dashboard extends React.Component{
  makeBackground(btn){
    var obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1
    }

    if (btn === 0){
      obj.backgroundColor = "#48BBEC"
    } else if (btn === 1) {
      obj.backgroundColor = "#E77AAE"
    } else {
      obj.backgroundColor = "#758BF4"
    }

    return obj;
  }
  goToProfile(){
    this.props.navigator.push({
      title: "Profile",
      component: Profile,
      passProps: {userInfo: this.props.userInfo}
    });
  }
  goToRepos(){
    GitHubService.getRepos(this.props.userInfo.login)
      .then((res) =>{
        this.props.navigator.push({
          title: "Repos",
          component: Repositories,
          passProps: {userInfo: this.props.userInfo, repos: res}
        })
      })
  }
  goToNotes(){
    DBService.getNotes(this.props.userInfo.login)
      .then((res) => {
        res = res || {};
        this.props.navigator.push({
          title: "User Notes",
          component: Notes,
          passProps: {userInfo: this.props.userInfo, notes: res}
        })
      }).catch((error) =>{
        console.log("Error retrieving notes: " + error);
      })
  }
  render(){
    return(
      <View style={styles.container}>
        <Image source={{uri: this.props.userInfo.avatar_url}} style={styles.image}/>
        <TouchableHighlight
          style={this.makeBackground(0)}
          onPress={this.goToProfile.bind(this)}
          underLayColor="#88D4FS">
          <Text style={styles.buttonText}> View Profile </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={this.makeBackground(1)}
          onPress={this.goToRepos.bind(this)}
          underLayColor="#88D4FS">
          <Text style={styles.buttonText}> View Repos </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={this.makeBackground(2)}
          onPress={this.goToNotes.bind(this)}
          underLayColor="#88D4FS">
          <Text style={styles.buttonText}> User Notes </Text>
        </TouchableHighlight>
      </View>
    )
  }
};

module.exports = Dashboard;
