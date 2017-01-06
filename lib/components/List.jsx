/*jshint esversion: 6 */

const List = ({ contacts, navigator }) => {
  const renderContacts = () {
    return contacts.map((contact) => {
      return (
        <ContactCard key={contact.id} {...contact}/>
      );
    });
  }
};

// do we need this?
//
// navigate(){
//   this.props.navigator.push({
//     title: 'ContactCard',
//   });
// }
