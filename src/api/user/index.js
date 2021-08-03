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
