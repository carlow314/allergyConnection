const firebase = require('firebase');

var config = {
    apiKey: "AIzaSyCQHXrwKvEpZptx4tgDCI1aIXxLMCk9xKQ",
    authDomain: "furbabies-5734e.firebaseapp.com",
    databaseURL: "https://furbabies-5734e.firebaseio.com",
    projectId: "furbabies-5734e",
    storageBucket: "",
    messagingSenderId: "229679653180"
};

const fire = firebase.initializeApp(config);
const database = fire.database();
const dogClickRef = database.ref();
const catClickRef = database.ref();

// because you like async so much i figured id give it a whirl :)
module.exports = {
  async incrementClickCount(animal) {

    try {
      await dogClickRef.once('value')
                              .then(snapshot => {
                                const { dogClickCount } = snapshot.val();

                                dogClickRef.update({ dogClickCount: dogClickCount + 1} )
                              })
    } catch (e) {

    } finally {

    }
  },
  async getClickCountForAnimal(animal) {
    let clickCount;
    try {
      animal === 'dog' ?
         await dogClickRef.once('value')
                  .then((snapshot) => {
                    console.log(' WHAT IS THE SNAPSHOT', snapshot.val().dogClickCount);

                    clickCount = snapshot.val();
                  })
      : await catClickRef.once('value')
                   .then(snapshot => {
                     clickCount = snapshot.val();
                     console.log(' WHAT IS THE CAT SNAP', snapshot);
                   })

    } catch (e) {
      // probably could use some real error handling but ill leave that up to you :)
      return e;
    }
    return clickCount
  },

}
