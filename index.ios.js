/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
 var React = require('react-native');
 var Main = require('./app/components/Main');


 var {
   AppRegistry,
   StyleSheet,
   Text,
   NavigatorIOS,
   View,
 } = React;

 var styles = StyleSheet.create({
   container:{
     flex: 1,
     backgroundColor: '#111111'
   },
 });

 class GitHubViewer extends React.Component{
   render() {
     return (
       <NavigatorIOS
       style={styles.container}
         initialRoute={{
           title: 'Github Viewer',
           component: Main
         }} />
     );
   }
 };


 AppRegistry.registerComponent('GitHubViewer', () => GitHubViewer);
