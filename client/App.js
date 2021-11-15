/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {
	useState,
	Component
} from 'react';
import type {
	Node
} from 'react';
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
	Button,
	Alert,
	TextInput
} from 'react-native';

import {
	Colors,
	DebugInstructions,
	Header,
	LearnMoreLinks,
	ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
	graphql,Mutation ,useMutation
} from 'react-apollo';
import gql from 'graphql-tag'

import {
	Row,
	Rows,
	Table
} from 'react-native-table-component';

//添加数据事件函数


//const App: () => Node = () => {
export default class App extends Component {
	constructor(client) {
	  super()
	  this.state = {
	    name: '',
		number:''
	  }
	  this.newOnAddData = this.newOnAddData.bind(this)
	  this.render = this.render.bind(this);
	  this.client = client;
	}
	
	newOnAddData(){
		console.log(this.state,"state");
		let addQuery = gql`
		mutation  {
				  waitAdd(wait:{name:"${this.state.name}",number:"${this.state.number}"}) {
				    id
				    name
				    number
				    created
				  }
		}
`;
		this.state.AddQuery = graphql(addQuery,{name:this.state.name,number:this.state.number})(({data})=>{
			console.log(data,"okk");
			return (
				<View></View>
			);
		});
		
		this.client.mutate({
            mutation: addQuery,
            variables: {
                name:this.state.name,number:this.state.number
            },
        }).then(result => {
			Alert.alert("tips","add successfully!")
		  })
		  /*.catch(error => {
			console.log(error);
		  });*/
			
		/*useMutation(addQuery,{variables: {
		name:this.state.name,
		number:this.state.number
	  },
	  onError(err) {
       console.log(err,"herrrr");
     }});*/
		//console.log(this.state.AddQuery)
	}
	render() {
		const [addForm, setAddForm] = useState({
			name: '',
			number: ''
		});

		const isDarkMode = useColorScheme() === 'dark';

		const backgroundStyle = {
			backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
		};

		//获取数据
		const query = gql`
  query {
    waitList {
      id
      name
      number
      created
    }
  }
  `;

		const optionsChange = {
			tableHead: ['Serial No.', 'Name', 'Phone Number', 'TimeStamp'],
			tableData: []
		};
		const President = ({
			data
		}) => {
			if (data.waitList) {
				data.waitList.forEach((item, index) => {
					let aitem = [];
					aitem.push(item.id);
					aitem.push(item.name);
					aitem.push(item.number);
					aitem.push(item.created);
					optionsChange.tableData.push(aitem);
				})

				return ( 
				<View style = {{padding: 20}}>
					<Table borderStyle = {{borderWidth: 1,borderColor: '#f0f'}}>
						<Row data = {optionsChange.tableHead} style = {styles.head}  textStyle = {styles.text} />
						<Rows data = {optionsChange.tableData} textStyle = {styles.text} /> 
					</Table> 
				</View>
				);
			} else {
				return ( <View><Text> no data </Text></View>);
			}
		}

		const MtableView = graphql(query)(President);
		return ( 
			<SafeAreaView style = {backgroundStyle}>
				<StatusBar barStyle = {isDarkMode ? 'light-content' : 'dark-content'}/> 
				<ScrollView contentInsetAdjustmentBehavior = "automatic" style = {backgroundStyle}>
					<Header/>
					<View style = {{padding: 5}}>
						<Text> Name: </Text> 
						<TextInput placeholder = "pls input name" 
							onChangeText = {(text) => {
								//this.setState({name:text});
								this.state.name = text;
							}}	
							style = {{height: 40,borderColor: 'gray',borderWidth: 1}} />
						<Text > Number: </Text> 
						<TextInput placeholder = "pls input number" onChangeText = {(text) => {
								//this.setState({number:text})
								this.state.number = text;
							}}
							style = {{height: 40,borderColor: 'gray',borderWidth: 1}} /> 
					</View>
					<Button onPress = {this.newOnAddData}	title = "Add"	color = "#841584" />
					<View style = {{backgroundColor: isDarkMode ? Colors.black : Colors.white}}>
						<MtableView/>
					</View> 
				</ScrollView> 
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	head: {

	},
	text: {

	},
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: '600',
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: '400',
	},
	highlight: {
		fontWeight: '700',
	},
});

//export default App;
