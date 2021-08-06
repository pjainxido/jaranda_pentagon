/**
 * Firebase cloudstore menu collection data types
 *  name : string
 */

import { db } from 'firebase.js';

export const getAllMenus = () => {
  return db
    .collection('menu')
    .get()
    .then((querySnapshot) => {
      const result = [];
      querySnapshot.forEach((doc) => {
        result.push({ ...doc.data(), id: doc.id });
      });
      return result;
    })
    .catch((error) => {
      console.error(error);
    });
};
