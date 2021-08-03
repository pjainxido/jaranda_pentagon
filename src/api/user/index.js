/**
 * Firebase cloudstore user collection data types
 *  userId : string
 *  role: string
 *  name: string
 *  password: string
 *  age: number
 *  address: string
 *  createdAt: timestamp(firestore 자체 데이터 타입; 유저 생성시 알아서 입력되도록 처리)
 */

import { db, firebaseInstance } from 'firebase.js';

export const createUser = ({ userId, password, role = 'parents', name, age, address }) => {
	db.collection('user')
		.add({
			userId,
			role,
			name,
			password,
			age,
			address,
			createdAt: firebaseInstance.firestore.Timestamp.now(),
		})
		.then((docRef) => {
			console.log('Document written with ID: ', docRef.id);
		})
		.catch((error) => {
			console.error('Error adding document: ', error);
		});
};

export const getAllUsers = () => {
	return db
		.collection('user')
		.get()
		.then((querySnapshot) => {
			const result = [];
			querySnapshot.forEach((doc) => {
				// console.log({ ...doc.data(), id: doc.id });
				result.push({ ...doc.data(), id: doc.id });
			});
			return result;
		})
		.catch((error) => {
			console.error(error);
		});
};

/**
 * WIP(Work In Progress) - 아직 미완성, 제작 중..
 */
// export const findUserByIdAndPassword = (inputId, inputPassword) => {
// 	const usersRef = db.collection('user');

// 	usersRef
// 		.where('id', '==', inputId)
// 		.get()
// 		.then((querySnapshot) => {
// 			console.log({ ...doc.data(), id: doc.id });
// 		})
// 		.catch((error) => {
// 			console.error(error);
// 		});
// };
