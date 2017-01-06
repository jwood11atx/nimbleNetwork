/*jshint esversion: 6 */
import {
  Text,
  View,
  TouchableHighlight,
  TextInput,
} from 'react-native';

const AddContact = () => {
  return (
    <View>
      <TextInput style={{height: 40, marginTop: 10, textAlign: 'center', backgroundColor: '#98cb00'}} placeholder='Enter a Name'/>
      <TextInput style={{height: 40, marginTop: 10, textAlign: 'center', backgroundColor: '#98cb00'}} placeholder='Enter Title'/>
      <TextInput style={{height: 40, marginTop: 10, textAlign: 'center', backgroundColor: '#98cb00'}} placeholder='Enter Organization'/>
      <TouchableHighlight style={{marginTop: 20, alignItems: 'center'}}>
        <Text>Add</Text>
      </TouchableHighlight>
    </View>
  )
};

export default AddContact;
