import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TextInput, TouchableHighlight, Switch, Alert, Picker, ScrollView, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PhoneInput from 'react-native-phone-input';

export default class RegisterScreen extends React.Component {

	constructor(){
		super();
		this.state = {
			fullname: '',
			email: '',
			phonenumber: '',
			password: '',
			isstudent: false,
			universityvalue: '',
			universityemail: '',
			fullnameerrormessage: '',
			emailerrormessage: '',
			phonenumbererrormessage: '',
			passworderrormessage: '',
			universityemailerrormessage: '',
			universityvalueerrormessage: '',
		}
	}

	
	emptyfields(){

		let fullnameregex=/^[a-zA-Z ]+$/;
		let emailregex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

		if(this.state.fullname == ''){
			this.setState({fullnameerrormessage: 'Enter your name'})
		} else {
			if(!fullnameregex.test(this.state.fullname)){
				this.setState({fullnameerrormessage: 'cannot contain anything otherthan letters'})
			} else{
				this.setState({fullnameerrormessage: ''})
			}
		}

		if(this.state.email == ''){
			this.setState({emailerrormessage: 'Enter your e-mail id'})
		} else {
			if(!emailregex.test(this.state.email)){
				this.setState({emailerrormessage: 'Enter valid email address'})
			} else{
				this.setState({emailerrormessage: ''})
			}
		}

		if(this.state.phonenumber == ''){
			this.setState({phonenumbererrormessage: 'Enter your contact no.'})
		}	else {
			if(!this.phone.isValidNumber())
				this.setState({phonenumbererrormessage: 'Enter valid contact number'});
			else
				this.setState({phonenumbererrormessage: ''});
		}

		if(this.state.password == ''){
			this.setState({passworderrormessage: 'Enter your password'})
		} else {
			if( this.state.password.length > 12 || this.state.password.length < 8)
				this.setState({passworderrormessage: 'length must be between 8 to 12'});
			else
				this.setState({passworderrormessage: ''})
		}

		if(this.state.isstudent){
			if(this.state.universityvalue == '')
				this.setState({universityvalueerrormessage: 'Select your university'})
			else 
				this.setState({universityvalueerrormessage: ''})
		} else {
			this.setState({universityvalueerrormessage: ''})
		}

		if(this.state.isstudent){
			if(this.state.universityemail == '') {
				this.setState({universityemailerrormessage: 'Enter your university e-mail id'})
			} else {
				if(!emailregex.test(this.state.universityemail))
					this.setState({universityemailerrormessage: 'Enter valid email address'})
				else
					this.setState({universityemailerrormessage: ''})
			}
		} else {
			this.setState({universityemailerrormessage: ''})
		}
	}

	showscreen=()=>{
		this.props.navigation.navigate('food', {data: this.state.fullname});
	}

	render(){

		return(
			<ScrollView style={styles.scrollViewmain} showsVerticalScrollIndicator={false}>					
					<View style={styles.subcontainer1}>
						<ImageBackground 
							source={require('./images/foodimg1.jpg')} 
							style={styles.subcontainer1img}
							imageStyle={styles.foodimagestyle}>

							<TouchableHighlight style={styles.skipbutton}
								onPress={() => this.showscreen()}
								underlayColor='#ff7f50'>
								<Text style={[styles.whitetext, {fontSize: hp('2%')}]}>Skip</Text>
							</TouchableHighlight>

							<View style={{alignItems: 'center'}}>
								<Text style={styles.signuptext}>Sign Up</Text>
								<Text style={styles.whitetext}>Please create a new account</Text>
							</View>
						</ImageBackground>
					</View>

					<View style={styles.subcontainer2}>
						<ImageBackground 
							source={require('./images/user1.png')} 
							imageStyle={styles.userimgstyles}
							style={styles.userimg}>
							<TouchableHighlight style={styles.usersubimg} onPress={() => Alert.alert('cannot select photo')}>
								<Image source={require('./images/photo.png')}
									style={styles.usersubimgcamera} />
							</TouchableHighlight>
						</ImageBackground>

						<TextInput 
							value={this.state.fullname}
							onChangeText={(fullname) => this.setState({fullname})}
							placeholder='Full Name'
							style={styles.textinputdesign}
						/>

						{this.state.fullnameerrormessage==''?null:<Text style={styles.validateerrorstyle}>{this.state.fullnameerrormessage}</Text>}

						<TextInput 
							value={this.state.email}
							onChangeText={(email) => this.setState({email})}
							placeholder='E-mail'
							style={styles.textinputdesign}
						/>

						{this.state.emailerrormessage==''?null:<Text style={styles.validateerrorstyle}>{this.state.emailerrormessage}</Text>}

						<View style={[ styles.textinputdesign, {flexDirection: 'row', alignItems: 'center'}]}>
							<PhoneInput ref={ref => {
								this.phone = ref}}
								textProps={{placeholder: 'Phone Number'}}
								onChangePhoneNumber={(phonenumber) => this.setState({phonenumber})}
							/>
						</View>

						{this.state.phonenumbererrormessage==''?null:<Text style={styles.validateerrorstyle}>{this.state.phonenumbererrormessage}</Text>}

						<TextInput 
							secureTextEntry
							value={this.state.password}
							onChangeText={(password) => this.setState({password})}
							placeholder='Password'
							style={styles.textinputdesign}
						/>

						{this.state.passworderrormessage==''?null:<Text style={styles.validateerrorstyle}>{this.state.passworderrormessage}</Text>}

						<View style={styles.switchview}>
							<Text>Are you a student?</Text>
							<Switch value={this.state.isstudent}
								thumbColor='#ff8c00'
								trackColor='#faebd8'
								onValueChange={(isstudent) => this.setState({isstudent, universityemail: ''})} />
						</View>

						<View style={styles.pickerview}>
						<Picker enabled={this.state.isstudent}
							selectedValue={this.state.universityvalue}
							onValueChange={(universityvalue) => this.setState({universityvalue})}
							mode='dropdown'
						>
							<Picker.Item label='Select University' value='' />
							<Picker.Item label='NC State University' value='NC State University' />
							<Picker.Item label='Harward University' value='Harward University' />
						</Picker>
						</View>

						{this.state.universityvalueerrormessage==''?null:<Text style={styles.validateerrorstyle}>{this.state.universityvalueerrormessage}</Text>}

						<TextInput
							editable={this.state.isstudent} 
							value={this.state.universityemail}
							onChangeText={(universityemail) => this.setState({universityemail})}
							placeholder='University Email'
							style={styles.textinputdesign}
						/>

						{this.state.universityemailerrormessage==''?null:<Text style={styles.validateerrorstyle}>{this.state.universityemailerrormessage}</Text>}

						<TouchableHighlight
							style={styles.signupbutton}
							onPress={() => this.emptyfields()}
							underlayColor='#ff7f50'>
							<Text style={styles.subcontainer2signuptext}>Sign Up</Text>
						</TouchableHighlight>

						<Text style={[styles.centeritems, {color: '#888888'}]}>OR</Text>

						<Text style={styles.centeritems}>Enter via social networks</Text>

						<View style={styles.fbgooglesymbolcontainer}>
							<TouchableOpacity onPress={() => Alert.alert('Google symbol.')}>
							<Image source={require('./images/googlelogo.png')} 
								style={styles.googlefbimg}
							/>
							</TouchableOpacity>
							
							<TouchableOpacity onPress={() => Alert.alert('Facebook symbol.')}>
							<Image source={require('./images/fblogo.png')} 
								style={styles.googlefbimg}/>
							</TouchableOpacity>
						</View>

						<Text style={styles.centeritems}>Already have an account? <Text style={styles.orangetext} onPress={() => Alert.alert('sign in button.')}>Sign in</Text></Text>

						<Text style={styles.centeritems}>By creating account you agree with our <Text style={styles.orangetext} onPress={() => Alert.alert('terms of use.')}>Terms of Use</Text></Text>
					</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	subcontainer1:{
		borderBottomLeftRadius: 25,
		borderBottomRightRadius: 25,
	},
	subcontainer1img:{
		height: hp('25%'),
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 15
	},
	subcontainer2:{
		padding: 20,
	},
	userimg:{
		height: hp('12%'),
		width: hp('12%'),
		alignSelf: 'center',
		justifyContent: 'flex-end',
		alignItems: 'flex-end', 
	},
	userimgstyles:{
		borderRadius: hp('6%'), 
		borderWidth: 1,
		backgroundColor: '#f0f1f5',
		borderColor: '#cccccc',
		opacity:.4
	},
	textinputdesign:{
		borderWidth: 1,
		borderRadius: 5,
		paddingLeft: 15,
		borderColor: '#aaaaaa',
		marginTop: hp('2.5%'),
		height: hp('6%'),
		paddingVertical: 0
	},
	signupbutton:{
		marginTop: hp('2.5%'),
		height: hp('6%'),
		borderRadius: 5,
		backgroundColor: '#ff8c00',
		alignItems: 'center',
		justifyContent: 'center'
	},
	switchview:{
		paddingHorizontal: 5,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: hp('1.5%'),
	},
	skipbutton:{
		backgroundColor:'#ff8c00', 
		height: hp('4%'), 
		width: hp('8%'), 
		alignItems: 'center', 
		justifyContent: 'center', 
		borderRadius: 5, 
		alignSelf: 'flex-end'
	},
	pickerview:{
		height: hp('6%'),
		borderWidth: 1, 
		borderColor: '#aaaaaa', 
		justifyContent: 'center', 
		borderRadius: 5,
		marginTop: 10
	},
	foodimagestyle:{
		borderBottomLeftRadius: 20, 
		borderBottomRightRadius: 20
	},
	scrollViewmain:{
		flex: 1
	},
	signuptext:{
		color: '#ffffff', 
		fontSize: 30, 
		fontWeight: 'bold'
	},
	usersubimg:{
		height: hp('4%'),
		width: hp('4%'),
		borderRadius: hp('2%'),
		backgroundColor: '#ff7f50',
		alignItems: 'center',
		justifyContent: 'center'
	},
	flagsimg:{
		height: hp('3%'), 
		width: hp('5%'), 
	},
	subcontainer2signuptext:{
		color: '#ffffff', 
		fontWeight: 'bold',
		fontSize: hp('2.5%'),
	},
	validateerrorstyle:{
		color: '#ff0000',
	},
	googlefbimg:{
		height: hp('7%'),
		width: hp('7%'),
		borderRadius: hp('3.5%')
	},
	fbgooglesymbolcontainer:{
		marginTop: hp('1.5%'),
		alignSelf: 'center', 
		flexDirection: 'row', 
		justifyContent: 'space-evenly', 
		width: hp('20%')
	},
	centeritems:{
		textAlign: 'center',
		marginTop: hp('1.5%'),
	},
	phonenumbertextinput:{
		padding: 0,
		paddingLeft: 10
	},
	usersubimgcamera:{
		width: hp('2.1%'), 
		height: hp('2.1%')
	},
	whitetext:{
		color: '#ffffff'
	},
	orangetext:{
		color:'#ff8c00'
	},
})